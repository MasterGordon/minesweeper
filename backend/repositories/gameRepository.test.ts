import { describe, it, expect } from "bun:test";
import { getTestDb } from "../database/getTestDb";
import { Game } from "../schema";
import {
  getCurrentGame,
  getGame,
  getGamesCount,
  upsertGame,
} from "./gameRepository";

describe("GameRepository", () => {
  it("should get game by uuid", async () => {
    const db = getTestDb();
    const started = Date.now();
    await db.insert(Game).values({
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started,
    });
    const game = await getGame(db, "TestUuid");
    expect(game).toEqual({
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started,
    });
  });

  it("should return undefined if game does not exist", async () => {
    const db = getTestDb();
    const game = await getGame(db, "TestUuid");
    expect(game).toBeUndefined();
  });

  it("should return latest game", async () => {
    const db = getTestDb();
    const started = Date.now();
    await db.insert(Game).values({
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started,
    });
    await db.insert(Game).values({
      uuid: "TestUuid2",
      user: "TestUser",
      stage: 2,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: started + 1,
    });
    const game = await getCurrentGame(db, "TestUser");
    expect(game).toEqual({
      uuid: "TestUuid2",
      user: "TestUser",
      stage: 2,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: started + 1,
    });
  });

  it("should return game count", async () => {
    const db = getTestDb();
    const started = Date.now();
    const uuids = ["TestUuid", "TestUuid2", "TestUuid3"];
    for (const uuid of uuids) {
      await db.insert(Game).values({
        uuid,
        user: "TestUser",
        stage: 1,
        gameState: Buffer.from("ANY"),
        finished: 1,
        started,
      });
    }
    const count = await getGamesCount(db, "TestUser");
    expect(count).toEqual(3);
  });

  it("should insert game", async () => {
    const db = getTestDb();
    const started = Date.now();
    await upsertGame(db, {
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started,
    });
    const game = await getGame(db, "TestUuid");
    expect(game).toEqual({
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started,
    });
  });

  it("should update game", async () => {
    const db = getTestDb();
    const started = Date.now();
    await db.insert(Game).values({
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started,
    });
    await upsertGame(db, {
      uuid: "TestUuid",
      user: "TestUser",
      stage: 2,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: started + 1,
    });
    const game = await getGame(db, "TestUuid");
    expect(game).toEqual({
      uuid: "TestUuid",
      user: "TestUser",
      stage: 2,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: started + 1,
    });
  });
});
