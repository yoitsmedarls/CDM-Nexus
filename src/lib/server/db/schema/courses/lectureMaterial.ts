import {
  pgTable,
  text,
  varchar,
  uuid,
  check,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { topic } from './topic';

export const lectureMaterial = pgTable(
  'lecture_material',
  {
    id: uuid('id').unique().notNull().defaultRandom(),
    topicId: uuid('topic_id')
      .notNull()
      .references(() => topic.id, { onDelete: 'cascade' }),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
    ytVideoId: text('yt_video_id').notNull(),
  },
  (table) => [
    primaryKey({
      name: 'lecture_material_pk',
      columns: [table.topicId, table.title],
    }),
    check('check_yt_video_id', sql`${table.ytVideoId} ~ '^[a-zA-Z0-9-_]{11}$'`),
  ]
);

export type SelectLectureMaterial = typeof lectureMaterial.$inferSelect;
export type InsertLectureMaterial = typeof lectureMaterial.$inferInsert;
