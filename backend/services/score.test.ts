import { describe, it, expect } from "bun:test";
import { getScoreBoard } from "./score.ts";
import { getTestDb } from "../database/getTestDb.ts";
import { Game, User } from "../schema.ts";

describe("Score", () => {
  it("should return the score board", async () => {
    const db = getTestDb();
    await db.insert(User).values({
      name: "TestUser",
      password: "test",
    });
    await db.insert(Game).values({
      user: "TestUser",
      uuid: crypto.randomUUID(),
      stage: 1,
      gameState: "ANY",
      finished: 1,
      timestamp: Date.now(),
    });
    await db.insert(Game).values({
      user: "TestUser",
      uuid: crypto.randomUUID(),
      stage: 10,
      gameState: "ANY",
      finished: 1,
      timestamp: Date.now(),
    });
    await db.insert(Game).values({
      user: "TestUser",
      uuid: crypto.randomUUID(),
      stage: 20,
      gameState: "ANY",
      finished: 0,
      timestamp: Date.now(),
    });
    const result = await getScoreBoard(db);
    expect(result).toEqual([{ stage: 10, user: "TestUser" }]);
  });
});
