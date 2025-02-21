import { sql } from 'drizzle-orm';
import { check, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().notNull(),
    username: varchar('username', { length: 30 }).primaryKey(),
    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50 }).notNull(),
    email: varchar('email', { length: 320 }).unique().notNull(),
    passwordHash: text('password_hash').notNull(),
  },
  (table) => [
    check(
      'check_username_format',
      sql`${table.username} ~ '^[A-Za-z][A-Za-z0-9_]{5,30}$'`
    ),
  ]
);

export type SelectUsers = typeof users.$inferSelect;
export type InsertUsers = typeof users.$inferInsert;
