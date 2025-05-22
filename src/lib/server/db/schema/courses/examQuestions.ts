import { sql } from 'drizzle-orm';
import { pgTable, text, varchar, uuid, check } from 'drizzle-orm/pg-core';
import { exams } from './exams';

export const examQuestions = pgTable(
  'exam_questions',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    examId: uuid('exam_id')
      .notNull()
      .references(() => exams.id, {
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

export type SelectExamQuestion = typeof examQuestions.$inferSelect;
export type InsertExamQuestion = typeof examQuestions.$inferInsert;
