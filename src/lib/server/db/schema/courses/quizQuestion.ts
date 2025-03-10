import { pgTable, text, varchar, uuid, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { quiz } from './quiz';

export const quizQuestion = pgTable(
  'quiz_question',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    quizId: uuid('quiz_id')
      .notNull()
      .references(() => quiz.id, {
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
    check('check_correct_answer', sql`${table.correctAnswer} ~ '^[a-dA-D]$'`),
  ]
);

export type SelectQuizQuestion = typeof quizQuestion.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestion.$inferInsert;

export const quizQuestionRelations = relations(quizQuestion, ({ one }) => ({
  quiz: one(quiz, {
    fields: [quizQuestion.quizId],
    references: [quiz.id],
  }),
}));
