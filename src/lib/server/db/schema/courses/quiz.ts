import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';

import { topic } from './topic';

export const quiz = pgTable(
  'quiz',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topic.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    length: integer('length').notNull(),
  },
  (table) => [primaryKey({ name: 'quiz_pk', columns: [table.topicId] })]
);

export type SelectQuiz = typeof quiz.$inferSelect;
export type InsertQuiz = typeof quiz.$inferInsert;
