import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  schema: "./backend/schema.ts",
  out: "./backend/drizzle",
  dbCredentials: {
    url: "file:./sqlite.db",
  },
});
