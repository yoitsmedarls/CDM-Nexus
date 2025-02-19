import {
  pgTable,
  text,
  varchar,
  uuid,
  check,
  foreignKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { topics } from './topics';

export const lectureMaterials = pgTable(
  'lecture_materials',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    courseId: varchar('id', { length: 8 }).notNull(),
    lessonTitle: varchar('title', { length: 255 }).notNull(),
    topicTitle: varchar('title', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    ytVideoId: text('ytVideoId').notNull(),
  },
  (table) => [
    check('check-yt-video-id', sql`${table.ytVideoId} ~ '^[a-zA-Z0-9-_]{11}$'`),
    foreignKey({
      name: 'lecture_materials_foreign_key_from_topics',
      columns: [table.courseId, table.lessonTitle, table.topicTitle],
      foreignColumns: [topics.courseId, topics.lessonTitle, topics.title],
    }),
  ]
);

export type SelectLectureMaterial = typeof lectureMaterials.$inferSelect;
export type InsertLectureMaterial = typeof lectureMaterials.$inferInsert;

export const lectureMaterialRelations = relations(
  lectureMaterials,
  ({ one }) => ({
    topic: one(topics, {
      fields: [
        lectureMaterials.courseId,
        lectureMaterials.lessonTitle,
        lectureMaterials.topicTitle,
      ],
      references: [topics.courseId, topics.lessonTitle, topics.title],
    }),
  })
);
