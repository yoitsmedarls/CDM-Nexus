import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { topics } from './topics';

export const quizzes = pgTable(
  'quizzes',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topics.id, {
        onDelete: 'cascade',
      }),
    title: varchar('title', {
      length: 255,
    }).notNull(),
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
