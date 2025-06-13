import { drizzle } from "drizzle-orm/bun-sqlite";
import * as schema from "../schema";
import { Database } from "bun:sqlite";

export const getDb = (filename: string = "sqlite.db") => {
  const sqlite = new Database(filename);
  const db = drizzle(sqlite, { schema });
  return db;
};
