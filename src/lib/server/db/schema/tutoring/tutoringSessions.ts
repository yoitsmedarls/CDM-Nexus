import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from '../auth';
import { tutoringSessionStatusEnum } from './tutoringSessionStatusEnum';

export const tutoringSessions = pgTable('tutoring_sessions', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  tutorId: text('tutor_id')
    .unique()
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  status: tutoringSessionStatusEnum('status').default('upcoming').notNull(),
  capacity: integer('capacity').notNull().default(1),
  notes: text('notes'),
  startTime: timestamp('start_time', {
    withTimezone: true,
  }).notNull(),
  endTime: timestamp('end_time', {
    withTimezone: true,
  }).notNull(),
});

export type SelectTutoringSession = typeof tutoringSessions.$inferSelect;
export type InsertTutoringSession = typeof tutoringSessions.$inferInsert;
