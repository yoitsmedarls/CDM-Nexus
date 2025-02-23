import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { user } from './user';

export const session = pgTable('session', {
  id: uuid('id').primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
});

export type SelectSession = typeof session.$inferSelect;
export type InsertSession = typeof session.$inferInsert;
