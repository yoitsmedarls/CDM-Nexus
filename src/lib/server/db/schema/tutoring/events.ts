import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { eventCategoryEnum } from './eventCategoryEnum';

export const events = pgTable('events', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  title: varchar('title', {
    length: 255,
  }).notNull(),
  description: text('description').notNull(),
  timestamp: timestamp('timestamp', {
    withTimezone: true,
  }).notNull(),
  category: eventCategoryEnum('category').notNull().default('default'),
});

export type SelectEvent = typeof events.$inferSelect;
export type InsertEvent = typeof events.$inferInsert;
