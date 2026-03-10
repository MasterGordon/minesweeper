import { eq } from "drizzle-orm";
import { Gems } from "../schema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import * as schema from "../schema";

export const getGems = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
) => {
  const res = (await db.select().from(Gems).where(eq(Gems.user, user)))[0];
  const count = res?.count ?? 0;
  const totalCount = res?.totalCount ?? 0;
  return { count, totalCount };
};

export const addGems = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
  gems: number,
) => {
  await db.transaction(async (tx) => {
    const res = (await tx.select().from(Gems).where(eq(Gems.user, user)))[0];
    const count = res?.count ?? 0;
    const totalCount = res?.totalCount ?? 0;
    if (!res) {
      await tx
        .insert(Gems)
        .values({ user, count: count + gems, totalCount: totalCount + gems });
      return;
    }
    await tx
      .update(Gems)
      .set({ count: count + gems, totalCount: totalCount + gems })
      .where(eq(Gems.user, user));
  });
};

export const removeGems = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
  gems: number,
) => {
  await db.transaction(async (tx) => {
    const res = (await tx.select().from(Gems).where(eq(Gems.user, user)))[0];
    const count = res?.count ?? 0;
    const totalCount = res?.totalCount ?? 0;
    if (count - gems < 0) throw new Error("Not enough gems");
    await tx
      .update(Gems)
      .set({ count: count - gems, totalCount: totalCount })
      .where(eq(Gems.user, user));
  });
};
