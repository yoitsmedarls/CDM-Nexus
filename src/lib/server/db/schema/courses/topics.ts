import {
  pgTable,
  text,
  varchar,
  timestamp,
  check,
  boolean,
  primaryKey,
  foreignKey,
  uuid,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { lessons } from './lessons';
import { lectureMaterials } from './lectureMaterials';
import { quizzes } from './quizzes';

export const topics = pgTable(
  'topics',
  {
    id: uuid('id').defaultRandom(),
    courseId: varchar('course_id', { length: 8 }).notNull(),
    lessonTitle: varchar('lesson_title', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
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
      name: 'topics_primary_key',
      columns: [table.courseId, table.lessonTitle, table.title],
    }),
    foreignKey({
      name: 'topics_foreign_key_from_lessons',
      columns: [table.courseId, table.lessonTitle],
      foreignColumns: [lessons.courseId, lessons.title],
    }),
    check(
      'check_course_id_format',
      sql`${table.courseId} ~ '^[A-Z]{4}[0-9]{4}$'`
    ),
    check('check_slug_format', sql`${table.slug} ~ '^([a-z0-9-]+)$'`),
  ]
);

export type SelectTopic = typeof topics.$inferSelect;
export type InsertTopic = typeof topics.$inferInsert;

export const topicRelations = relations(topics, ({ one }) => ({
  lesson: one(lessons, {
    fields: [topics.courseId, topics.lessonTitle],
    references: [lessons.courseId, lessons.title],
  }),
  lectureMaterial: one(lectureMaterials),
  quiz: one(quizzes),
}));
