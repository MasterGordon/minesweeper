import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const User = sqliteTable("users", {
  name: text("name").primaryKey().notNull(),
  password: text("password").notNull(),
});

export const Game = sqliteTable("games", {
  uuid: text("uuid").primaryKey().notNull(),
  user: text("user")
    .notNull()
    .references(() => User.name),
  gameState: text("gameState").notNull(),
  stage: integer("stage").notNull(),
  finished: integer("finished").notNull().default(0),
  timestamp: integer("timestamp").notNull(),
});

export type UserType = Omit<typeof User.$inferSelect, "password"> & {
  password?: undefined;
};
export type GameType = typeof Game.$inferSelect;
