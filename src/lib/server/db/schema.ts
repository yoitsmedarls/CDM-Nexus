import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
// Exports for courses-related tables
export * from './schema/courses/stateEnum';
export * from './schema/courses/termEnum';
export * from './schema/courses/course';
export * from './schema/courses/lesson';
export * from './schema/courses/topic';
export * from './schema/courses/lectureMaterial';
export * from './schema/courses/quiz';
export * from './schema/courses/question';

// Exports for admin-related tables
export * from './schema/admin/user';
export * from './schema/admin/session';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
