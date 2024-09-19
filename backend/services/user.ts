import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { User, type UserType } from "../schema";
import { eq, sql } from "drizzle-orm";

export const registerUser = async (
  db: BunSQLiteDatabase,
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
  const hash = await Bun.password.hash(password + Bun.env.SALT ?? "");
  await db.insert(User).values({ name, password: hash });
};

export const loginUser = async (
  db: BunSQLiteDatabase,
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
  if (
    !(await Bun.password.verify(
      password + Bun.env.SALT ?? "",
      user[0].password,
    ))
  ) {
    throw new Error("Incorrect password");
  }
  return { ...user[0], password: undefined };
};

export const getUser = async (
  db: BunSQLiteDatabase,
  name: string,
): Promise<UserType | undefined> => {
  const user = await db
    .select()
    .from(User)
    .where(eq(sql`lower(${User.name})`, name.toLowerCase()));
  return { ...user[0], password: undefined };
};
