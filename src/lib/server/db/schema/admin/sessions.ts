import { pgTable } from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {});

export type SelectSessions = typeof sessions.$inferSelect;
export type InsertSessions = typeof sessions.$inferInsert;
