import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { termEnum } from './termEnum';
import { courses } from './courses';
import { examQuestions } from './examQuestions';

export const exams = pgTable(
  'exams',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    courseId: varchar('course_id', { length: 8 })
      .notNull()
      .references(() => courses.id, { onDelete: 'cascade' }),
    term: termEnum('term').notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    length: integer('length').notNull(),
  },
  (table) => [
    primaryKey({
      name: 'exams_pk',
      columns: [table.courseId, table.term, table.title],
    }),
  ]
);

export type SelectExam = typeof exams.$inferSelect;
export type InsertExam = typeof exams.$inferInsert;

export const examsRelations = relations(exams, ({ one, many }) => ({
  examQuestions: many(examQuestions),
  course: one(courses, {
    fields: [exams.courseId],
    references: [courses.id],
  }),
}));
