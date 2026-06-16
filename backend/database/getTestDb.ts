import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { getDb } from "./getDb";

export const getTestDb = () => {
  const db = getDb(":memory:");
  migrate(db, { migrationsFolder: "./backend/drizzle" });
  return db;
};
