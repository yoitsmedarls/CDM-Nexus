import {
  pgTable,
  text,
  varchar,
  timestamp,
  check,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { stateEnum } from './stateEnum';
import { lessons } from './lessons';
import { exams } from './exams';

export const courses = pgTable(
  'courses',
  {
    id: varchar('id', { length: 8 }).primaryKey().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    slug: text('slug').unique().notNull(),
    published: boolean('published').notNull().default(false),
    state: stateEnum('status').notNull().default('ongoing'),
    visits: integer('visits').notNull().default(0),
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
    check('check_id_format', sql`${table.id} ~ '^[A-Z]{4}[0-9]{4}$'`),
    check('check_slug_format', sql`${table.slug} ~ '^[a-z]{4}[0-9]{4}$'`),
    check('check_id_and_slug_match', sql`${table.id} ~* ${table.slug}`),
  ]
);

export type SelectCourse = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

export const coursesRelations = relations(courses, ({ many }) => ({
  lessons: many(lessons),
  exams: many(exams),
}));
