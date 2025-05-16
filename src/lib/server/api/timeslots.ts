import { and, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
  timeslots,
  type InsertTimeslot,
  type SelectTimeslot,
} from '$lib/server/db/schema';

export async function createTimeslot(
  data: InsertTimeslot
): Promise<SelectTimeslot[]> {
  return await db.insert(timeslots).values(data).returning();
}

export async function getTimeslotsByScheduleId(
  scheduleId: SelectTimeslot['scheduleId']
): Promise<SelectTimeslot[]> {
  return await db
    .select()
    .from(timeslots)
    .where(eq(timeslots.scheduleId, scheduleId));
}

export async function getTimeslotById(
  id: SelectTimeslot['id']
): Promise<SelectTimeslot[]> {
  return await db.select().from(timeslots).where(eq(timeslots.id, id)).limit(1);
}

export async function getTimeslotsByAvailability(
  scheduleId: SelectTimeslot['scheduleId'],
  availability: SelectTimeslot['availability']
): Promise<SelectTimeslot[]> {
  return await db
    .select()
    .from(timeslots)
    .where(
      and(
        eq(timeslots.scheduleId, scheduleId),
        eq(timeslots.availability, availability)
      )
    );
}

export async function updateTimeslot(
  id: SelectTimeslot['id'],
  data: Partial<InsertTimeslot>
): Promise<SelectTimeslot[]> {
  return await db
    .update(timeslots)
    .set(data)
    .where(eq(timeslots.id, id))
    .returning();
}

export async function deleteTimeslot(id: SelectTimeslot['id']): Promise<void> {
  await db.delete(timeslots).where(eq(timeslots.id, id));
}
