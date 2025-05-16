import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { availabilityEnum } from './availabilityEnum';
import { schedules } from './schedules';

export const timeslots = pgTable('timeslots', {
  id: uuid('id').unique().notNull().defaultRandom(),
  scheduleId: uuid('schedule_id')
    .notNull()
    .references(() => schedules.id, { onDelete: 'cascade' }),
  date: timestamp('date', { withTimezone: true }).notNull(),
  availability: availabilityEnum('availability').notNull().default('unset'),
});

export type SelectTimeslot = typeof timeslots.$inferSelect;
export type InsertTimeslot = typeof timeslots.$inferInsert;
