import { describe, it, expect } from "bun:test";
import { getTestDb } from "../database/getTestDb";
import { Game } from "../schema";
import {
  getCurrentGame,
  getGame,
  getGames,
  getGamesCount,
  getTotalGamesPlayed,
  parseGameState,
  upsertGame,
  upsertGameState,
} from "./gameRepository";
import { encode } from "@msgpack/msgpack";

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

  it("should get finished games for user", async () => {
    const db = getTestDb();
    const started = Date.now();
    await db.insert(Game).values({
      uuid: "TestUuid1",
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
      finished: 0,
      started: started + 1,
    });
    await db.insert(Game).values({
      uuid: "TestUuid3",
      user: "OtherUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: started + 2,
    });
    const games = await getGames(db, "TestUser");
    expect(games).toHaveLength(1);
    expect(games[0].uuid).toBe("TestUuid1");
  });

  it("should get total games played for user", async () => {
    const db = getTestDb();
    const started = Date.now();
    await db.insert(Game).values({
      uuid: "TestUuid1",
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
      finished: 0,
      started: started + 1,
    });
    const totalGames = await getTotalGamesPlayed(db, "TestUser");
    expect(totalGames).toBe(1);
  });

  it("should get total games played for all users", async () => {
    const db = getTestDb();
    const started = Date.now();
    await db.insert(Game).values({
      uuid: "TestUuid1",
      user: "TestUser",
      stage: 1,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started,
    });
    await db.insert(Game).values({
      uuid: "TestUuid2",
      user: "OtherUser",
      stage: 2,
      gameState: Buffer.from("ANY"),
      finished: 1,
      started: started + 1,
    });
    const totalGames = await getTotalGamesPlayed(db);
    expect(totalGames).toBe(2);
  });

  it("should parse game state", () => {
    const gameData = {
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      finished: 1,
      started: Date.now(),
      // Other ServerGame properties don't matter for this test
      mines: [[false]],
      width: 1,
      height: 1,
      isRevealed: [[false]],
      isFlagged: [[false]],
      isQuestionMark: [[false]],
      minesCount: 0,
      lastClick: [0, 0] as [number, number],
      theme: "default" as const,
    };
    const buffer = Buffer.from(encode(gameData));
    const parsed = parseGameState(buffer);
    expect(parsed).toEqual(gameData);
  });

  it("should upsert game state", async () => {
    const db = getTestDb();
    const serverGame = {
      uuid: "TestUuid",
      user: "TestUser",
      stage: 1,
      finished: 1,
      started: Date.now(),
      // Other ServerGame properties don't matter for this test
      mines: [[false]],
      width: 1,
      height: 1,
      isRevealed: [[false]],
      isFlagged: [[false]],
      isQuestionMark: [[false]],
      minesCount: 0,
      lastClick: [0, 0] as [number, number],
      theme: "default" as const,
    };
    await upsertGameState(db, serverGame);
    const game = await getGame(db, "TestUuid");
    expect(game?.uuid).toBe("TestUuid");
    expect(game?.user).toBe("TestUser");
    expect(game?.stage).toBe(1);
  });
});
