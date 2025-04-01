import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';

import { topic } from './topic';
import { relations } from 'drizzle-orm';
import { question } from './question';

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
  (table) => [
    primaryKey({ name: 'quiz_pk', columns: [table.topicId, table.title] }),
  ]
);

export type SelectQuiz = typeof quiz.$inferSelect;
export type InsertQuiz = typeof quiz.$inferInsert;

export const quizRelations = relations(quiz, ({ one, many }) => ({
  questions: many(question),
  topic: one(topic, {
    fields: [quiz.topicId],
    references: [topic.id],
  }),
}));
