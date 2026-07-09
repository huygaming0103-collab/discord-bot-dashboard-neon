import { pgTable, text, timestamp, json } from "drizzle-orm/pg-core";

export const sessionsTable = pgTable("session", {
  sid: text("sid").primaryKey(),
  sess: json("sess").notNull(),
  expire: timestamp("expire", { precision: 6 }).notNull(),
});

export const discordUsersTable = pgTable("discord_users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  discriminator: text("discriminator").notNull().default("0"),
  avatar: text("avatar"),
  email: text("email"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
