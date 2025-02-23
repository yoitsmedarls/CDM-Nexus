import { pgTable, text, varchar, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

import { quiz } from './quiz';
import { check } from 'drizzle-orm/mysql-core';

export const question = pgTable(
  'question',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    quizId: uuid('quiz_id')
      .notNull()
      .references(() => quiz.id, { onDelete: 'cascade' }),
    content: text('content').notNull(),
    optionA: text('option_a').notNull(),
    optionB: text('option_b').notNull(),
    optionC: text('option_c').notNull(),
    optionD: text('option_d').notNull(),
    correctAnswer: varchar('correct_answer', {
      length: 1,
    }).notNull(),
  },
  (table) => [
    primaryKey({ name: 'question_pk', columns: [table.id] }),
    check('check_correct_answer', sql`${table.correctAnswer} ~ '^[a-dA-D]$'`),
  ]
);

export type SelectQuestion = typeof question.$inferSelect;
export type InsertQuestion = typeof question.$inferInsert;
