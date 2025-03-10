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
import { lessons } from './lessons';
import { lectureMaterials } from './lectureMaterials';
import { quizzes } from './quizzes';

export const topics = pgTable(
  'topics',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    lessonId: uuid('lesson_id')
      .notNull()
      .references(() => lessons.id, { onDelete: 'cascade' }),
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
      name: 'topics_pk',
      columns: [table.lessonId, table.title],
    }),
    check('check_slug_format', sql`${table.slug} ~ '^([a-z0-9-]+)$'`),
  ]
);

export type SelectTopic = typeof topics.$inferSelect;
export type InsertTopic = typeof topics.$inferInsert;

export const topicsRelations = relations(topics, ({ one, many }) => ({
  lectureMaterials: many(lectureMaterials),
  quizzes: many(quizzes),
  lesson: one(lessons, {
    fields: [topics.lessonId],
    references: [lessons.id],
  }),
}));
