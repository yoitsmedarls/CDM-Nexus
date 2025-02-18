import { pgTable, text, varchar, uuid, check } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

import { topics } from './topics';

export const lectureMaterials = pgTable(
  'lecture_materials',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    topicId: uuid('topic_id')
      .references(() => topics.id, { onDelete: 'cascade' })
      .notNull(),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    ytVideoId: text('ytVideoId').notNull(),
  },
  (table) => [
    check('check-yt-video-id', sql`${table.ytVideoId} ~ '^[a-zA-Z0-9-_]{11}$'`),
  ]
);

export type SelectLectureMaterial = typeof lectureMaterials.$inferSelect;
export type InsertLectureMaterial = typeof lectureMaterials.$inferInsert;

export const lectureMaterialRelations = relations(
  lectureMaterials,
  ({ one }) => ({
    topic: one(topics, {
      fields: [lectureMaterials.topicId],
      references: [topics.id],
    }),
  })
);
