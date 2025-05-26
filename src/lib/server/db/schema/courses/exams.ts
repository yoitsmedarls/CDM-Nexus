import {
  pgTable,
  integer,
  text,
  varchar,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { termEnum } from './termEnum';
import { courses } from './courses';

export const exams = pgTable(
  'exams',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    courseId: varchar('course_id', {
      length: 8,
    })
      .notNull()
      .references(() => courses.id, {
        onDelete: 'cascade',
      }),
    term: termEnum('term').notNull(),
    title: varchar('title', {
      length: 255,
    }).notNull(),
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
