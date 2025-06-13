import { eq } from "drizzle-orm";
import { Collection, type CollectionType } from "../schema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { decode, encode } from "@msgpack/msgpack";
import type { UserCollection } from "../../shared/gameType";
import * as schema from "../schema";

export const getCollection = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
): Promise<UserCollection> => {
  const res = (
    await db.select().from(Collection).where(eq(Collection.user, user))
  )[0];
  if (res) return parseCollection(res);
  return {
    entries: [
      {
        id: "default",
        aquired: Date.now(),
        selected: true,
      },
    ],
  };
};

export const upsertCollection = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
  collection: UserCollection,
) => {
  const dbCollection = await db
    .select()
    .from(Collection)
    .where(eq(Collection.user, user));
  if (dbCollection.length > 0) {
    await db
      .update(Collection)
      .set({
        collection: Buffer.from(encode(collection)),
      })
      .where(eq(Collection.user, user));
  } else {
    await db.insert(Collection).values({
      user,
      collection: Buffer.from(encode(collection)),
    });
  }
};

export const parseCollection = (collection: CollectionType) => {
  return decode(collection.collection) as UserCollection;
};
