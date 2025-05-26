import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from '../auth';
import { tutoringSessions } from './tutoringSessions';

export const tutoringSessionAttendees = pgTable(
  'tutoring_session_attendees',
  {
    id: uuid('id').defaultRandom(),
    tutoringSessionId: uuid('tutoring_session_id')
      .notNull()
      .references(() => tutoringSessions.id, {
        onDelete: 'cascade',
      }),
    studentId: text('student_id')
      .unique()
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    bookedAt: timestamp('booked_at', {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    primaryKey({
      name: 'tutoring_session_attendees_pk',
      columns: [table.tutoringSessionId, table.studentId],
    }),
  ]
);

export type SelectTutoringSessionAttendee =
  typeof tutoringSessionAttendees.$inferSelect;
export type InsertTutoringSessionAttendee =
  typeof tutoringSessionAttendees.$inferInsert;
