import { sql } from 'drizzle-orm';
import { boolean, check, integer, pgTable } from 'drizzle-orm/pg-core';

export const features = pgTable(
  'features',
  {
    version: integer('version').primaryKey().default(1).notNull(),
    coursesPlatform: boolean('courses_platform').default(true).notNull(),
    tutorApplications: boolean('tutor_applications').default(true).notNull(),
    tutorRequests: boolean('tutor_requests').default(true).notNull(),
  },
  (table) => [check('check_singleton_version', sql`${table.version} = 1`)]
);

export type SelectFeature = typeof features.$inferSelect;
export type InsertFeature = typeof features.$inferInsert;
