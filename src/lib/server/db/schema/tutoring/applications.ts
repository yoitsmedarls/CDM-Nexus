import { check, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '../auth/users';
import { userRoleEnum } from '../auth/userRoleEnum';
import { sql } from 'drizzle-orm';
import { applicationStatusEnum } from './applicationStatusEnum';

export const applications = pgTable(
  'applications',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: text('user_id')
      .unique()
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    currentRole: userRoleEnum('current_role').notNull(),
    desiredRole: userRoleEnum('desired_role').notNull(),
    message: text('message').notNull(),
    status: applicationStatusEnum('status').default('pending').notNull(),
    createdAt: timestamp('created_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    check(
      'check_current_role_neq_desired_role',
      sql`${table.currentRole} <> ${table.desiredRole}`
    ),
  ]
);

export type SelectApplication = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;
