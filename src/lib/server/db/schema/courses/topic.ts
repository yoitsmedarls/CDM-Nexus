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
import { lesson } from './lesson';
import { lectureMaterial } from './lectureMaterial';
import { quiz } from './quiz';

export const topic = pgTable(
  'topic',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    lessonId: uuid('lesson_id')
      .notNull()
      .references(() => lesson.id, { onDelete: 'cascade' }),
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
      name: 'topic_pk',
      columns: [table.lessonId, table.title],
    }),
    check('check_slug_format', sql`${table.slug} ~ '^([a-z0-9-]+)$'`),
  ]
);

export type SelectTopic = typeof topic.$inferSelect;
export type InsertTopic = typeof topic.$inferInsert;

export const topicRelations = relations(topic, ({ one, many }) => ({
  lectureMaterials: many(lectureMaterial),
  quizzes: many(quiz),
  lesson: one(lesson, {
    fields: [topic.lessonId],
    references: [lesson.id],
  }),
}));
