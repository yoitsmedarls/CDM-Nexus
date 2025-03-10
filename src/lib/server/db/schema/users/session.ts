import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { user } from './user';

export const session = pgTable('session', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export type SelectSession = typeof session.$inferSelect;
export type InsertSession = typeof session.$inferInsert;
