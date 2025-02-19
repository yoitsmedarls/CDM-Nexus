import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { topics } from './topics';
import { questions } from './questions';

export const quizzes = pgTable(
  'quizzes',
  {
    id: uuid('id').primaryKey(),
    courseId: varchar('courses_id', { length: 8 }).notNull(),
    lessonTitle: varchar('lesson_title', { length: 255 }).notNull(),
    topicTitle: varchar('topic_title', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    length: integer('length').notNull(),
  },
  (table) => [
    foreignKey({
      name: 'lecture_materials_foreign_key_from_topics',
      columns: [table.courseId, table.lessonTitle, table.topicTitle],
      foreignColumns: [topics.courseId, topics.lessonTitle, topics.title],
    }),
  ]
);

export type SelectQuiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

export const quizRelations = relations(quizzes, ({ one, many }) => ({
  topic: one(topics, {
    fields: [quizzes.courseId, quizzes.lessonTitle, quizzes.topicTitle],
    references: [topics.courseId, topics.lessonTitle, topics.title],
  }),
  questions: many(questions),
}));
