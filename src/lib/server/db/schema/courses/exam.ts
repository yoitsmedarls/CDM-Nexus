import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';

import { course } from './course';
import { relations } from 'drizzle-orm';
import { question } from './question';
import { termEnum } from './termEnum';

export const exam = pgTable(
  'exam',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    courseId: varchar('course_id')
      .notNull()
      .references(() => course.id, { onDelete: 'cascade' }),
    term: termEnum('term').notNull(),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    length: integer('length').notNull(),
  },
  (table) => [
    primaryKey({
      name: 'exam_pk',
      columns: [table.courseId, table.term, table.title],
    }),
  ]
);

export type SelectExam = typeof exam.$inferSelect;
export type InsertExam = typeof exam.$inferInsert;

export const examRelations = relations(exam, ({ one, many }) => ({
  questions: many(question),
  course: one(course, {
    fields: [exam.courseId],
    references: [course.id],
  }),
}));
