import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  check,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { stateEnum, termEnum } from './enums';

import { courses } from './courses';
import { topics } from './topics';

export const lessons = pgTable(
  'lessons',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    courseId: varchar('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    term: termEnum('term').notNull(),
    slug: text('slug').unique().notNull(),
    published: boolean('published').notNull(),
    state: stateEnum('status').notNull().default('ongoing'),
    dateCreated: timestamp('date_created', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
    dateModified: timestamp('date_modified', {
      withTimezone: true,
    })
      .$onUpdate(() => new Date())
      .defaultNow()
      .notNull(),
  },
  (table) => [check('check_slug_format', sql`${table.slug} ~ '^([a-z-]+)$'`)]
);

export type SelectLesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  topics: many(topics),
  // lectureMaterial: one(lectureMaterials),
  // quiz: one(quizzes),
}));
