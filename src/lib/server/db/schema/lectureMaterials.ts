import {
  pgTable,
  text,
  varchar,
  uuid,
  check,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { topics } from './topics';

export const lectureMaterials = pgTable(
  'lecture_materials',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topics.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    ytVideoId: text('yt_video_id').notNull(),
  },
  (table) => [
    primaryKey({
      name: 'lecture_materials_pk',
      columns: [table.topicId, table.title],
    }),
    check('check_yt_video_id', sql`${table.ytVideoId} ~ '^[_a-zA-Z0-9-]{11}$'`),
  ]
);

export type SelectLectureMaterial = typeof lectureMaterials.$inferSelect;
export type InsertLectureMaterial = typeof lectureMaterials.$inferInsert;

export const lectureMaterialsRelations = relations(
  lectureMaterials,
  ({ one }) => ({
    topic: one(topics, {
      fields: [lectureMaterials.topicId],
      references: [topics.id],
    }),
  })
);
