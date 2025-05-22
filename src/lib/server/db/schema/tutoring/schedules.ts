import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { users } from '../auth/users';

export const schedules = pgTable('schedules', {
  id: uuid('id').unique().notNull().defaultRandom(),
  userId: text('user_id')
    .unique()
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
    }),
  active: boolean('active').notNull().default(true),
});

export type SelectSchedule = typeof schedules.$inferSelect;
export type InsertSchedule = typeof schedules.$inferInsert;
