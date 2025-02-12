import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  check,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { lessons } from './lessons';
import { lectureMaterials } from './lectureMaterials';

export const topics = pgTable(
  'topics',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    lessonId: uuid('lesson_id')
      .references(() => lessons.id, { onDelete: 'cascade' })
      .notNull(),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    slug: text('slug').unique().notNull(),
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

export type SelectTopic = typeof topics.$inferSelect;
export type InsertTopic = typeof topics.$inferInsert;

export const topicRelations = relations(topics, ({ one }) => ({
  lesson: one(lessons, {
    fields: [topics.lessonId],
    references: [lessons.id],
  }),
  lectureMaterial: one(lectureMaterials),
  // quiz: one(quizzes),
}));
