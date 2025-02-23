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
import { sql } from 'drizzle-orm';
import { termEnum } from './termEnum';
import { course } from './course';

export const lesson = pgTable(
  'lesson',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    courseId: varchar('course_id')
      .notNull()
      .references(() => course.id, { onDelete: 'cascade' }),
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
    primaryKey({
      name: 'lesson_pk',
      columns: [table.courseId, table.title],
    }),
    check('check_slug_format', sql`${table.slug} ~ '^([a-z0-9-]+)$'`),
  ]
);

export type SelectLesson = typeof lesson.$inferSelect;
export type InsertLesson = typeof lesson.$inferInsert;
