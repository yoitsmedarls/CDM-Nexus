import { boolean, pgTable } from 'drizzle-orm/pg-core';

export const features = pgTable('features', {
  coursesPlatform: boolean('courses_platform').default(true).notNull(),
  tutorApplications: boolean('tutor_applications').default(true).notNull(),
  tutorRequests: boolean('tutor_requests').default(true).notNull(),
});

export type SelectFeature = typeof features.$inferSelect;
export type InsertFeature = typeof features.$inferInsert;
