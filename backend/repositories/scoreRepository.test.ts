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

  it("should return empty array when no finished games exist", async () => {
    const db = getTestDb();
    await db.insert(User).values({
      name: "TestUser2",
      password: "test",
    });
    await db.insert(Game).values({
      user: "TestUser2",
      uuid: crypto.randomUUID(),
      stage: 5,
      gameState: Buffer.from("ANY"),
      finished: 0,
      started: Date.now(),
    });
    const result = await getScoreBoard(db);
    expect(result).toEqual([]);
  });

  it("should handle multiple users and sort by highest stage", async () => {
    const db = getTestDb();
    await db.insert(User).values({
      name: "User1",
      password: "test",
    });
    await db.insert(User).values({
      name: "User2",
      password: "test",
    });
    await db.insert(Game).values({
      user: "User1",
      uuid: crypto.randomUUID(),
      stage: 15,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: Date.now(),
    });
    await db.insert(Game).values({
      user: "User2",
      uuid: crypto.randomUUID(),
      stage: 25,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: Date.now(),
    });
    const result = await getScoreBoard(db);
    expect(result).toEqual([
      { stage: 25, user: "User2" },
      { stage: 15, user: "User1" }
    ]);
  });
});
