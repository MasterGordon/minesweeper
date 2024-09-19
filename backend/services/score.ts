import { eq, sql } from "drizzle-orm";
import { Game } from "../schema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

export const getScoreBoard = async (db: BunSQLiteDatabase) => {
  return await db
    .select({ stage: sql<number>`max(${Game.stage})`, user: Game.user })
    .from(Game)
    .where(eq(Game.finished, 1))
    .groupBy(Game.user);
};
