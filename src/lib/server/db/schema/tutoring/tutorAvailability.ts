import {
  pgTable,
  primaryKey,
  smallint,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from '../auth';

export const tutorAvailability = pgTable(
  'tutor_availability',
  {
    id: uuid('id').defaultRandom().notNull(),
    tutorId: text('tutor_id')
      .unique()
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    dayOfWeek: smallint('day_of_week').notNull(),
    startTime: timestamp('start_time', {
      withTimezone: true,
    }).notNull(),
    endTime: timestamp('end_time', {
      withTimezone: true,
    }).notNull(),
  },
  (table) => [
    primaryKey({
      name: 'tutor_availability_pk',
      columns: [table.tutorId, table.dayOfWeek, table.startTime],
    }),
  ]
);

export type SelectTutorAvailability = typeof tutorAvailability.$inferSelect;
export type InsertTutorAvailability = typeof tutorAvailability.$inferInsert;
