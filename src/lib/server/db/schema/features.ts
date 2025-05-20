import { boolean, pgTable } from 'drizzle-orm/pg-core';

export const features = pgTable('features', {
  browseCourses: boolean('browse_courses').default(true).notNull(),
  browseFormulas: boolean('browse_formulas').default(true).notNull(),
  browseExams: boolean('browse_exams').default(true).notNull(),
  tutorApplications: boolean('tutor_applications').default(true).notNull(),
});

export type SelectFeature = typeof features.$inferSelect;
export type InsertFeature = typeof features.$inferInsert;
