import { pgTable, text, varchar, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { quiz } from './quiz';
import { check } from 'drizzle-orm/mysql-core';
import { exam } from './exam';

export const question = pgTable(
  'question',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    quizId: uuid('quiz_id').references(() => quiz.id, {
      onDelete: 'cascade',
    }),
    examId: uuid('exam_id').references(() => exam.id, {
      onDelete: 'cascade',
    }),
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
    primaryKey({
      name: 'question_pk',
      columns: [table.quizId, table.examId, table.id],
    }),
    check('check_correct_answer', sql`${table.correctAnswer} ~ '^[a-dA-D]$'`),
  ]
);

export type SelectQuestion = typeof question.$inferSelect;
export type InsertQuestion = typeof question.$inferInsert;

export const questionRelations = relations(question, ({ one }) => ({
  quiz: one(quiz, {
    fields: [question.quizId],
    references: [quiz.id],
  }),
  exam: one(exam, {
    fields: [question.examId],
    references: [exam.id],
  }),
}));
