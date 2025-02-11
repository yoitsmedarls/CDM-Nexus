// import { relations, sql } from 'drizzle-orm';
// import {
//   pgTable,
//   serial,
//   integer,
//   text,
//   varchar,
//   timestamp,
//   pgEnum,
//   uuid,
//   check,
// } from 'drizzle-orm/pg-core';

// /* Enums, etc. */

// export const termEnum = pgEnum('term', ['midterm', 'finals']);

// /* Tables */

// export const courses = pgTable(
//   'courses',
//   {
//     id: varchar('id', { length: 8 }).primaryKey(),
//     title: varchar('title', { length: 255 }).unique().notNull(),
//     description: text('description').notNull(),
//     slug: text('slug').unique().notNull(),
//     dateCreated: timestamp('date_created', {
//       withTimezone: true,
//     })
//       .defaultNow()
//       .notNull(),
//     dateModified: timestamp('date_modified', {
//       withTimezone: true,
//     })
//       .defaultNow()
//       .$onUpdate(() => new Date())
//       .notNull(),
//   },
//   (table) => [
//     check('check_id_format', sql`${table.id} regexp '^[A-Z]{4}[0-9]{4}$'`),
//   ]
// );

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

// export const topics = pgTable('topics', {
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

// export const lectureMaterials = pgTable('lecture_materials', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   lessonId: integer('lesson_id')
//     .references(() => lessons.id, { onDelete: 'cascade' })
//     .notNull(),
//   pdfFilePath: text('pdf_file_path').notNull(),
//   title: varchar('title', { length: 255 }).unique().notNull(),
//   description: text('description').notNull(),
// });

// export const comments = pgTable('comments', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   lectureMaterialId: uuid('lecture_material_id')
//     .references(() => lectureMaterials.id, { onDelete: 'cascade' })
//     .notNull(),
//   studentNumber: varchar('studentNumber', { length: 11 }).notNull(),
//   content: text('content'),
// });

// export const replies = pgTable('replies', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   commentId: uuid('id')
//     .references(() => comments.id, { onDelete: 'cascade' })
//     .notNull(),
//   studentNumber: varchar('studentNumber', { length: 11 }).notNull(),
//   content: text('content'),
// });

// export const quizzes = pgTable('quizzes', {
//   id: serial('id').primaryKey(),
//   lessonId: integer('lesson_id')
//     .references(() => lessons.id, { onDelete: 'cascade' })
//     .notNull(),
//   title: varchar('title', { length: 255 }).unique().notNull(),
//   description: text('description').notNull(),
//   length: integer('length').notNull(),
// });

// export const questions = pgTable('questions', {
//   id: serial('id').primaryKey(),
//   quizId: integer('quiz_id')
//     .references(() => quizzes.id, { onDelete: 'cascade' })
//     .notNull(),
//   markdownFilePath: text('markdown_file_path').notNull().unique(),
//   optionA: text('option_a').notNull(),
//   optionB: text('option_b').notNull(),
//   optionC: text('option_c').notNull(),
//   optionD: text('option_d').notNull(),
//   correctAnswer: varchar('correct_answer', {
//     length: 1,
//   }).notNull(),
// });

// /* Exported types (SELECT and INSERT) */

// export type SelectCourse = typeof courses.$inferSelect;
// export type InsertCourse = typeof courses.$inferInsert;

// export type SelectLesson = typeof lessons.$inferSelect;
// export type InsertLesson = typeof lessons.$inferInsert;

// export type SelectTopic = typeof topics.$inferSelect;
// export type InsertTopic = typeof topics.$inferInsert;

// export type SelectLectureMaterial = typeof lectureMaterials.$inferSelect;
// export type InsertLectureMaterial = typeof lectureMaterials.$inferInsert;

// export type SelectComment = typeof comments.$inferSelect;
// export type InsertComment = typeof comments.$inferInsert;

// export type SelectReply = typeof replies.$inferSelect;
// export type InsertReply = typeof replies.$inferInsert;

// export type SelectQuiz = typeof quizzes.$inferSelect;
// export type InsertQuiz = typeof quizzes.$inferInsert;

// export type SelectQuestion = typeof questions.$inferSelect;
// export type InsertQuestion = typeof questions.$inferInsert;

// /* Entity Relations */

// export const courseRelations = relations(courses, ({ many }) => ({
//   lessons: many(lessons),
// }));

// export const lessonRelations = relations(lessons, ({ one }) => ({
//   course: one(courses, {
//     fields: [lessons.courseId],
//     references: [courses.id],
//   }),
//   lectureMaterial: one(lectureMaterials),
//   quiz: one(quizzes),
// }));

// export const topicRelations = relations(topics, ({ one }) => ({
//   course: one(courses, {
//     fields: [topics.courseId],
//     references: [courses.id],
//   }),
//   lectureMaterial: one(lectureMaterials),
//   quiz: one(quizzes),
// }));

// export const lectureMaterialRelations = relations(
//   lectureMaterials,
//   ({ one, many }) => ({
//     lesson: one(lessons, {
//       fields: [lectureMaterials.lessonId],
//       references: [lessons.id],
//     }),
//     comments: many(comments),
//   })
// );

// export const commentRelations = relations(comments, ({ one, many }) => ({
//   lectureMaterial: one(lectureMaterials, {
//     fields: [comments.id],
//     references: [lectureMaterials.id],
//   }),
//   replies: many(replies),
// }));

// export const replyRelations = relations(replies, ({ one }) => ({
//   lectureMaterial: one(comments, {
//     fields: [replies.id],
//     references: [comments.id],
//   }),
// }));

// export const quizRelations = relations(quizzes, ({ one, many }) => ({
//   lesson: one(lessons, {
//     fields: [quizzes.lessonId],
//     references: [lessons.id],
//   }),
//   questions: many(questions),
// }));

// export const questionRelations = relations(questions, ({ one }) => ({
//   quiz: one(quizzes, {
//     fields: [questions.quizId],
//     references: [quizzes.id],
//   }),
// }));
