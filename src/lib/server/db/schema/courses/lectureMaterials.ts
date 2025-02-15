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
    pdfFilePath: text('pdf_file_path').notNull(),
    markdownFilePath: text('markdown_file_path').notNull(),
    title: varchar('title', { length: 255 }).unique().notNull(),
    description: text('description').notNull(),
  },
  (table) => [
    check(
      'check_pdf_file_path',
      sql`${table.pdfFilePath} ~ '^([a-zA-Z0-9-_]+)(.pdf)$'`
    ),
    check(
      'check_markdown_file_path',
      sql`${table.markdownFilePath} ~ '^([a-zA-Z0-9-_]+)(.pdf)$'`
    ),
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
    // comments: many(comments),
  })
);
