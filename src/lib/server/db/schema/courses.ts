import { sql } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp, check } from 'drizzle-orm/pg-core';

export const courses = pgTable(
  'courses',
  {
    id: varchar('id', { length: 8 }).primaryKey(),
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
  (table) => [
    check('check_id_format', sql`${table.id} ~ '^[A-Z]{4}[0-9]{4}$'`),
    check('check_slug_format', sql`${table.id} ~ '^[a-z]{4}[0-9]{4}$'`),
  ]
);

export type SelectCourse = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

// export const courseRelations = relations(courses, ({ many }) => ({
//   lessons: many(lessons),
// }));
