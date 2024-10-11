import { describe, it, expect } from "bun:test";
import { getScoreBoard } from "./scoreRepository.ts";
import { getTestDb } from "../database/getTestDb.ts";
import { Game, User } from "../schema.ts";

describe("ScoreRepository", () => {
  it("should return the scoreboard", async () => {
    const db = getTestDb();
    await db.insert(User).values({
      name: "TestUser",
      password: "test",
    });
    await db.insert(Game).values({
      user: "TestUser",
      uuid: crypto.randomUUID(),
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: Date.now(),
    });
    await db.insert(Game).values({
      user: "TestUser",
      uuid: crypto.randomUUID(),
      stage: 10,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: Date.now(),
    });
    await db.insert(Game).values({
      user: "TestUser",
      uuid: crypto.randomUUID(),
      stage: 20,
      gameState: Buffer.from("ANY"),
      finished: 0,
      started: Date.now(),
    });
    const result = await getScoreBoard(db);
    expect(result).toEqual([{ stage: 10, user: "TestUser" }]);
  });
});
