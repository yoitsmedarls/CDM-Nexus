import { pgTable, text, varchar, uuid, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { exam } from './exam';

export const examQuestion = pgTable(
  'exam_question',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    examId: uuid('exam_id')
      .notNull()
      .references(() => exam.id, {
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

export type SelectExamQuestion = typeof examQuestion.$inferSelect;
export type InsertExamQuestion = typeof examQuestion.$inferInsert;

export const examQuestionRelations = relations(examQuestion, ({ one }) => ({
  exam: one(exam, {
    fields: [examQuestion.examId],
    references: [exam.id],
  }),
}));
