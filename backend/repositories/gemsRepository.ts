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
  const { count, totalCount } = await getGems(db, user);
  if ((await db.select().from(Gems).where(eq(Gems.user, user))).length === 0) {
    await db
      .insert(Gems)
      .values({ user, count: count + gems, totalCount: totalCount + gems });
    return;
  }
  await db
    .update(Gems)
    .set({ count: count + gems, totalCount: totalCount + gems })
    .where(eq(Gems.user, user));
};

export const removeGems = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
  gems: number,
) => {
  const { count, totalCount } = await getGems(db, user);
  if (count - gems < 0) throw new Error("Not enough gems");
  await db
    .update(Gems)
    .set({ count: count - gems, totalCount: totalCount })
    .where(eq(Gems.user, user));
};
