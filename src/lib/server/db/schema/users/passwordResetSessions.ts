import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { users } from './users';

export const passwordResetSessions = pgTable('password_reset_sessions', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  cdmEmail: varchar('cdm_email', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export type SelectPasswordResetSession =
  typeof passwordResetSessions.$inferSelect;
export type InsertPasswordResetSession =
  typeof passwordResetSessions.$inferInsert;
