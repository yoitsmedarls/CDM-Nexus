import { sql } from 'drizzle-orm';
import { check, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { userRoleEnum } from './userRoleEnum';

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey().notNull(),
    username: varchar('username', {
      length: 30,
    })
      .unique()
      .notNull(),
    fullName: varchar('full_name', {
      length: 255,
    }).notNull(),
    cdmEmail: varchar('cdm_email', {
      length: 255,
    })
      .unique()
      .notNull(),
    role: userRoleEnum('role').notNull().default('student'),
    passwordHash: text('password_hash').notNull(),
    recoveryCode: text('recovery_code').notNull(),
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
      sql`${table.cdmEmail} ~ '^[A-Za-z0-9.]+(@cdm.edu.ph)$'`
    ),
  ]
);

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
