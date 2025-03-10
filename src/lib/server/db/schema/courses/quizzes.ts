import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { topics } from './topics';
import { quizQuestions } from './quizQuestions';

export const quizzes = pgTable(
  'quizzes',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topics.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    length: integer('length').notNull(),
  },
  (table) => [
    primaryKey({
      name: 'quizzes_pk',
      columns: [table.topicId, table.title],
    }),
  ]
);

export type SelectQuiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
  quizQuestions: many(quizQuestions),
  topic: one(topics, {
    fields: [quizzes.topicId],
    references: [topics.id],
  }),
}));
