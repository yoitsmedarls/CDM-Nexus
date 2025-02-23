import { sql } from 'drizzle-orm';
import {
  check,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'tutor']);

export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().notNull(),
    username: varchar('username', { length: 30 }).unique().notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    cdm_email: varchar('cdm_email', { length: 320 }).unique().notNull(),
    role: roleEnum('role').default('tutor').notNull(),
    passwordHash: text('password_hash').notNull(),
    dateJoined: timestamp('date_joined', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      'check_username_format',
      sql`${table.username} ~ '^[A-Za-z][A-Za-z0-9_]{5,30}$'`
    ),
    check(
      'check_cdm_email_format',
      sql`${table.cdm_email} ~ '^[A-za-z0-9.]+(@cdm.edu.ph)$'`
    ),
  ]
);

export type SelectUsers = typeof users.$inferSelect;
export type InsertUsers = typeof users.$inferInsert;
