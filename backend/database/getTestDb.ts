import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import crypto from "crypto";
import { getDb } from "./getDb";
import fs from "fs";

const dbs: string[] = [];

export const getTestDb = () => {
  const randomId = crypto.randomUUID();
  dbs.push(randomId);
  if (!fs.existsSync("temp_dbs")) fs.mkdirSync("temp_dbs");
  const db = getDb(`temp_dbs/${randomId}.db`);
  migrate(db, { migrationsFolder: "./backend/drizzle" });
  return db;
};

export const clearTestDbs = () => {
  dbs.forEach((db) => {
    const dbPath = `temp_dbs/${db}.db`;
    if (fs.existsSync(dbPath)) {
      fs.rmSync(dbPath);
    }
  });
  dbs.length = 0;
};
