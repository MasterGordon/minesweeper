import { eq, sql, not } from "drizzle-orm";
import { Game } from "../schema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import * as schema from "../schema";

export const getScoreBoard = async (db: BunSQLiteDatabase<typeof schema>) => {
  return (
    await db
      .select({ stage: sql<number>`max(${Game.stage})`, user: Game.user })
      .from(Game)
      .where(not(eq(Game.finished, 0)))
      .groupBy(Game.user)
  ).sort((a, b) => b.stage - a.stage);
};
