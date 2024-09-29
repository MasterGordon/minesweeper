import {
  sqliteTable,
  text,
  integer,
  index,
  blob,
} from "drizzle-orm/sqlite-core";

export const User = sqliteTable("users", {
  name: text("name").primaryKey().notNull(),
  password: text("password").notNull(),
});

export const Game = sqliteTable(
  "games",
  {
    uuid: text("uuid").primaryKey().notNull(),
    user: text("user")
      .notNull()
      .references(() => User.name),
    gameState: blob("gameState", { mode: "buffer" }).notNull(),
    stage: integer("stage").notNull(),
    finished: integer("finished").notNull().default(0),
    started: integer("timestamp").notNull(),
  },
  (table) => {
    return {
      userIdx: index("user_idx").on(table.user),
      startedIdx: index("started_idx").on(table.started),
      userStartedIdx: index("user_started_idx").on(table.user, table.started),
      fullIdx: index("full_idx").on(table.user, table.started, table.uuid),
    };
  },
);

export const UserSettings = sqliteTable("userSettings", {
  user: text("user").primaryKey().notNull(),
  settings: text("settings").notNull(),
});

export type UserType = Omit<typeof User.$inferSelect, "password"> & {
  password?: undefined;
};
export type GameType = typeof Game.$inferSelect;
export type UserSettingsType = typeof UserSettings.$inferSelect;
