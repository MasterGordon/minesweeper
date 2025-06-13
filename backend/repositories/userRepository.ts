import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { User, UserSettings, type UserType } from "../schema";
import { eq, sql } from "drizzle-orm";
import {
  userSettings as userSettingsSchema,
  type UserSettings as UserSettingsType,
} from "../../shared/user-settings";
import * as schema from "../schema";

export const registerUser = async (
  db: BunSQLiteDatabase<typeof schema>,
  name: string,
  password: string,
) => {
  const user = await db
    .select()
    .from(User)
    .where(eq(sql`lower(${User.name})`, name.toLowerCase()));
  if (user.length > 0) {
    throw new Error("User already exists");
  }
  const hash = await Bun.password.hash(password + Bun.env.SALT);
  await db.insert(User).values({ name, password: hash });
};

export const loginUser = async (
  db: BunSQLiteDatabase<typeof schema>,
  name: string,
  password: string,
) => {
  const user = await db
    .select()
    .from(User)
    .where(eq(sql`lower(${User.name})`, name.toLowerCase()));
  if (user.length === 0) {
    throw new Error("User does not exist");
  }
  if (!(await Bun.password.verify(password + Bun.env.SALT, user[0].password))) {
    throw new Error("Incorrect password");
  }
  return { ...user[0], password: undefined };
};

export const getUser = async (
  db: BunSQLiteDatabase<typeof schema>,
  name: string,
): Promise<UserType | undefined> => {
  const user = await db
    .select()
    .from(User)
    .where(eq(sql`lower(${User.name})`, name.toLowerCase()));
  return { ...user[0], password: undefined };
};

export const getUserSettings = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
): Promise<UserSettingsType> => {
  const userSettings = await db
    .select()
    .from(UserSettings)
    .where(eq(UserSettings.user, user));
  const settings = userSettings[0]?.settings || "{}";
  return userSettingsSchema.parse(JSON.parse(settings));
};

export const upsertUserSettings = async (
  db: BunSQLiteDatabase<typeof schema>,
  user: string,
  settings: UserSettingsType,
) => {
  const dbSettings = await db
    .select()
    .from(UserSettings)
    .where(eq(UserSettings.user, user));
  if (dbSettings.length > 0) {
    await db
      .update(UserSettings)
      .set({
        settings: JSON.stringify(settings),
      })
      .where(eq(UserSettings.user, user));
  } else {
    await db.insert(UserSettings).values({
      user,
      settings: JSON.stringify(settings),
    });
  }
};

export const getUserCount = async (db: BunSQLiteDatabase<typeof schema>) => {
  return (await db.select({ count: sql<number>`count(*)` }).from(User))[0]
    .count;
};
