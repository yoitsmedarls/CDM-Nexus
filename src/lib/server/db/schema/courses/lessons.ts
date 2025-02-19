import {
  pgTable,
  text,
  varchar,
  timestamp,
  check,
  boolean,
  primaryKey,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { termEnum } from './enums';

import { courses } from './courses';
import { topics } from './topics';

export const lessons = pgTable(
  'lessons',
  {
    id: uuid('id').defaultRandom(),
    courseId: varchar('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    term: termEnum('term').notNull(),
    slug: text('slug').notNull(),
    published: boolean('published').notNull().default(false),
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
  (table) => [
    check('check_slug_format', sql`${table.slug} ~ '^([a-z0-9-]+)$'`),
    primaryKey({
      name: 'lessons_primary_key',
      columns: [table.courseId, table.title],
    }),
  ]
);

export type SelectLesson = typeof lessons.$inferSelect;
export type InsertLesson = typeof lessons.$inferInsert;

export const lessonRelations = relations(lessons, ({ one, many }) => ({
  course: one(courses, {
    fields: [lessons.courseId],
    references: [courses.id],
  }),
  topics: many(topics),
}));
