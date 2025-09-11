import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { Game, type GameType } from "../schema";
import { eq, sql, desc, and, not } from "drizzle-orm";
import type { ServerGame } from "../../shared/game";
import { decode, encode } from "@msgpack/msgpack";
import * as schema from "../schema";

export const getGame = async (
  db: BunSQLiteDatabase<typeof schema>,
  uuid: string,
) => {
  return (await db.select().from(Game).where(eq(Game.uuid, uuid)))[0];
};

export const getGames = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
) => {
  return await db
    .select()
    .from(Game)
    .where(and(eq(Game.user, user), not(eq(Game.finished, 0))))
    .orderBy(desc(Game.started));
};

export const getCurrentGame = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
) => {
  return (
    await db
      .select()
      .from(Game)
      .where(eq(Game.user, user))
      .orderBy(desc(Game.started))
      .limit(1)
  )[0];
};

export const getGamesCount = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
) => {
  return (
    await db
      .select({ count: sql<number>`count(*)` })
      .from(Game)
      .where(eq(Game.user, user))
  )[0].count;
};

export const upsertGame = async (
  db: BunSQLiteDatabase<typeof schema>,
  game: GameType,
) => {
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
  db: BunSQLiteDatabase<typeof schema>,
  game: ServerGame,
) => {
  const { uuid, user, stage, finished, started } = game;
  await upsertGame(db, {
    uuid,
    user,
    stage,
    gameState: Buffer.from(encode(game)),
    finished,
    started,
  });
};

export const getTotalGamesPlayed = async (
  db: BunSQLiteDatabase<typeof schema>,
  user?: string,
) => {
  if (user)
    return (
      await db
        .select({ count: sql<number>`count(*)` })
        .from(Game)
        .where(and(eq(Game.user, user), not(eq(Game.finished, 0))))
    )[0].count;
  return (
    await db
      .select({ count: sql<number>`count(*)` })
      .from(Game)
      .where(not(eq(Game.finished, 0)))
  )[0].count;
};

export const parseGameState = (gameState: Buffer) => {
  return decode(gameState) as ServerGame;
};
