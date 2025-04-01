import { sql } from 'drizzle-orm';
import {
  check,
  customType,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { userRoleEnum } from './userRoleEnum';

const Uint8Array = customType<{ data: Uint8Array }>({
  dataType() {
    return 'Uint8Array';
  },
});

export const users = pgTable(
  'users',
  {
    id: text('id').primaryKey().notNull(),
    username: varchar('username', { length: 30 }).unique().notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    cdmEmail: varchar('cdm_email', { length: 255 }).unique().notNull(),
    role: userRoleEnum('role').notNull(),
    passwordHash: text('password_hash').notNull(),
    totp_key: Uint8Array('totp_key'),
    recoveryCode: Uint8Array('recovery_code').notNull(),
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
      sql`${table.cdmEmail} ~ '^[A-za-z0-9.]+(@cdm.edu.ph)$'`
    ),
  ]
);

export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
