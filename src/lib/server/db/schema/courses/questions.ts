import { pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { quizzes } from './quizzes';
import { check } from 'drizzle-orm/mysql-core';

export const questions = pgTable(
  'questions',
  {
    id: uuid('id').primaryKey(),
    quizId: uuid('quiz_id')
      .references(() => quizzes.id, { onDelete: 'cascade' })
      .notNull(),
    markdownFilePath: text('markdown_file_path').notNull().unique(),
    optionA: text('option_a').notNull(),
    optionB: text('option_b').notNull(),
    optionC: text('option_c').notNull(),
    optionD: text('option_d').notNull(),
    correctAnswer: varchar('correct_answer', {
      length: 1,
    }).notNull(),
  },
  (table) => [
    check(
      'check_markdown_file_path',
      sql`${table.markdownFilePath} ~ '^([a-zA-Z0-9-_]+)(.pdf)$'`
    ),
    check('check_correct_answer', sql`${table.correctAnswer} ~ '^[a-dA-D]$'`),
  ]
);

export type SelectQuestion = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

export const questionRelations = relations(questions, ({ one }) => ({
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
}));
