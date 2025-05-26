import { sql } from 'drizzle-orm';
import { pgTable, text, varchar, uuid, check } from 'drizzle-orm/pg-core';
import { quizzes } from './quizzes';

export const quizQuestions = pgTable(
  'quiz_questions',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    quizId: uuid('quiz_id')
      .notNull()
      .references(() => quizzes.id, {
        onDelete: 'cascade',
      }),
    content: text('content').notNull(),
    optionA: text('option_a').notNull(),
    optionB: text('option_b').notNull(),
    optionC: text('option_c').notNull(),
    optionD: text('option_d').notNull(),
    answer: varchar('answer', {
      length: 1,
    }).notNull(),
  },
  (table) => [check('check_answer', sql`${table.answer} ~ '^[A-D]$'`)]
);

export type SelectQuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestions.$inferInsert;
