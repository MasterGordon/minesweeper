import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Game, type GameType } from "../schema";
import { eq, sql, desc, and, not } from "drizzle-orm";
import type { ServerGame } from "../../shared/game";
import { decode, encode } from "@msgpack/msgpack";

export const getGame = async (db: BunSQLiteDatabase, uuid: string) => {
  return (await db.select().from(Game).where(eq(Game.uuid, uuid)))[0];
};

export const getGames = async (db: BunSQLiteDatabase, user: string) => {
  return await db
    .select()
    .from(Game)
    .where(and(eq(Game.user, user), not(eq(Game.finished, 0))))
    .orderBy(Game.started, sql`desc`);
};

export const getCurrentGame = async (db: BunSQLiteDatabase, user: string) => {
  return (
    await db
      .select()
      .from(Game)
      .where(eq(Game.user, user))
      .orderBy(desc(Game.started))
      .limit(1)
  )[0];
};

export const getGamesCount = async (db: BunSQLiteDatabase, user: string) => {
  return (
    await db
      .select({ count: sql<number>`count(*)` })
      .from(Game)
      .where(eq(Game.user, user))
  )[0].count;
};

export const upsertGame = async (db: BunSQLiteDatabase, game: GameType) => {
  const { uuid, user, stage, gameState, finished, started } = game;
  const games = await db.select().from(Game).where(eq(Game.uuid, uuid));
  if (games.length > 0) {
    await db
      .update(Game)
      .set({
        stage,
        gameState,
        finished,
        started,
      })
      .where(eq(Game.uuid, uuid));
  } else {
    await db.insert(Game).values({
      uuid,
      user,
      stage,
      gameState,
      finished,
      started,
    });
  }
};

export const upsertGameState = async (
  db: BunSQLiteDatabase,
  game: ServerGame,
) => {
  const { uuid, user, stage, finished, started } = game;
  upsertGame(db, {
    uuid,
    user,
    stage,
    gameState: Buffer.from(encode(game)),
    finished,
    started,
  });
};

export const parseGameState = (gameState: Buffer) => {
  return decode(gameState) as ServerGame;
};
