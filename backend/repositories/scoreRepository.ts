import { eq, sql, not } from "drizzle-orm";
import { Game } from "../schema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

export const getScoreBoard = async (db: BunSQLiteDatabase) => {
  return await db
    .select({ stage: sql<number>`max(${Game.stage})`, user: Game.user })
    .from(Game)
    .where(not(eq(Game.finished, 0)))
    .groupBy(Game.user);
};
