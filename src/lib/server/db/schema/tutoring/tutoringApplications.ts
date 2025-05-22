import { sql } from 'drizzle-orm';
import { check, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { userRoleEnum, users } from '../auth';
import { tutoringApplicationStatusEnum } from './tutoringApplicationStatusEnum';

export const tutoringApplications = pgTable(
  'tutoring_applications',
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
    status: tutoringApplicationStatusEnum('status')
      .default('pending')
      .notNull(),
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

export type SelectTutoringApplication =
  typeof tutoringApplications.$inferSelect;
export type InsertTutoringApplication =
  typeof tutoringApplications.$inferInsert;
