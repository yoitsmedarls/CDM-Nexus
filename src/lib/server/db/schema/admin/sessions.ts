import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export type SelectSessions = typeof sessions.$inferSelect;
export type InsertSessions = typeof sessions.$inferInsert;

export const sessionRelations = relations(sessions, ({ many }) => ({
  users: many(users),
}));
