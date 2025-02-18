import { pgTable, integer, text, varchar, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { topics } from './topics';
import { questions } from './questions';

export const quizzes = pgTable('quizzes', {
  id: uuid('id').primaryKey(),
  topicId: uuid('topic_id')
    .references(() => topics.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 255 }).unique().notNull(),
  description: text('description').notNull(),
  length: integer('length').notNull(),
});

export type SelectQuiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

export const quizRelations = relations(quizzes, ({ one, many }) => ({
  topic: one(topics, {
    fields: [quizzes.topicId],
    references: [topics.id],
  }),
  questions: many(questions),
}));
