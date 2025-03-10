import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { topic } from './topic';
import { quizQuestion } from './quizQuestion';

export const quiz = pgTable(
  'quiz',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topic.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    length: integer('length').notNull(),
  },
  (table) => [
    primaryKey({
      name: 'quiz_pk',
      columns: [table.topicId, table.title],
    }),
  ]
);

export type SelectQuiz = typeof quiz.$inferSelect;
export type InsertQuiz = typeof quiz.$inferInsert;

export const quizRelations = relations(quiz, ({ one, many }) => ({
  quizQuestions: many(quizQuestion),
  topic: one(topic, {
    fields: [quiz.topicId],
    references: [topic.id],
  }),
}));
