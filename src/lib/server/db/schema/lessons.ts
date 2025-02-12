// import {
//   pgTable,
//   serial,
//   text,
//   varchar,
//   timestamp,
//   pgEnum,
// } from 'drizzle-orm/pg-core';
// import { courses } from './courses';

// export const termEnum = pgEnum('term', ['midterm', 'finals']);

// export const lessons = pgTable('lessons', {
//   id: serial('id').primaryKey(),
//   courseId: varchar('course_id')
//     .references(() => courses.id, { onDelete: 'cascade' })
//     .notNull(),
//   title: varchar('title', { length: 255 }).unique().notNull(),
//   description: text('description').notNull(),
//   term: termEnum('term').notNull(),
//   slug: text('slug').unique().notNull(),
//   dateCreated: timestamp('date_created', {
//     withTimezone: true,
//   })
//     .defaultNow()
//     .notNull(),
//   dateModified: timestamp('date_modified', {
//     withTimezone: true,
//   })
//     .defaultNow()
//     .$onUpdate(() => new Date())
//     .notNull(),
// });

// export type SelectLesson = typeof lessons.$inferSelect;
// export type InsertLesson = typeof lessons.$inferInsert;

// // export const lessonRelations = relations(lessons, ({ one }) => ({
// //   course: one(courses, {
// //     fields: [lessons.courseId],
// //     references: [courses.id],
// //   }),
// //   lectureMaterial: one(lectureMaterials),
// //   quiz: one(quizzes),
// // }));
