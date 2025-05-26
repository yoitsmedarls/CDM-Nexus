import { pgTable, primaryKey, smallint, text, uuid } from 'drizzle-orm/pg-core';
import { users } from '../auth';

export const tutorAvailability = pgTable(
  'tutor_availability',
  {
    id: uuid('id').defaultRandom().notNull(),
    tutorId: text('tutor_id')
      .notNull()
      .references(() => users.id, {
        onDelete: 'cascade',
      }),
    name: text('name').notNull(),
    dayOfWeek: smallint('day_of_week').notNull(),
    startTime: text('start_time').notNull(),
    endTime: text('end_time').notNull(),
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
