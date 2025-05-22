import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
  schedules,
  type InsertSchedule,
  type SelectSchedule,
} from '$lib/server/db/schema';

export async function createSchedule(
  data: InsertSchedule
): Promise<SelectSchedule[]> {
  return await db.insert(schedules).values(data).returning();
}

export async function getScheduleByUserId(
  userId: SelectSchedule['id']
): Promise<SelectSchedule[]> {
  return await db.select().from(schedules).where(eq(schedules.userId, userId));
}

export async function getScheduleById(
  id: SelectSchedule['id']
): Promise<SelectSchedule[]> {
  return await db.select().from(schedules).where(eq(schedules.id, id));
}

export async function updateSchedule(
  id: SelectSchedule['id'],
  data: Partial<InsertSchedule>
): Promise<SelectSchedule[]> {
  return await db
    .update(schedules)
    .set(data)
    .where(eq(schedules.id, id))
    .returning();
}

export async function deleteSchedule(id: SelectSchedule['id']): Promise<void> {
  await db.delete(schedules).where(eq(schedules.id, id));
}
