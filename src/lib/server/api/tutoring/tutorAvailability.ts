import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';

import {
  tutorAvailability,
  type InsertTutorAvailability,
  type SelectTutorAvailability,
} from '$lib/server/db/schema';

export async function addTutorAvailability(
  tutorId: InsertTutorAvailability['tutorId'],
  dayOfWeek: InsertTutorAvailability['dayOfWeek'],
  startTime: InsertTutorAvailability['startTime'],
  endTime: InsertTutorAvailability['endTime']
): Promise<SelectTutorAvailability> {
  const availability: SelectTutorAvailability[] = await db
    .insert(tutorAvailability)
    .values({
      tutorId,
      dayOfWeek,
      startTime,
      endTime,
    })
    .returning();

  if (availability.length === 0) {
    throw new Error('Failed to create tutor availability');
  }

  return availability[0];
}

export async function getAllTutorAvailabilities(): Promise<
  SelectTutorAvailability[]
> {
  const availabilities: SelectTutorAvailability[] = await db
    .select()
    .from(tutorAvailability);

  return availabilities;
}

export async function getTutorAvailability(
  tutorId: SelectTutorAvailability['tutorId']
): Promise<SelectTutorAvailability[]> {
  const tutorAvailabilities = await db
    .select()
    .from(tutorAvailability)
    .where(eq(tutorAvailability.tutorId, tutorId));

  return tutorAvailabilities;
}

export async function updateTutorAvailability(
  id: SelectTutorAvailability['id'],
  dayOfWeek: InsertTutorAvailability['dayOfWeek'],
  startTime: InsertTutorAvailability['startTime'],
  endTime: InsertTutorAvailability['endTime']
) {
  const availability: SelectTutorAvailability[] = await db
    .update(tutorAvailability)
    .set({
      dayOfWeek: dayOfWeek,
      startTime: startTime,
      endTime: endTime,
    })
    .where(eq(tutorAvailability.id, id))
    .returning();

  if (availability.length === 0) {
    throw new Error('Failed to update tutor availability');
  }

  return availability[0];
}

export async function deleteTutorAvailability(
  tutorId: SelectTutorAvailability['tutorId'],
  dayOfWeek: SelectTutorAvailability['dayOfWeek'],
  startTime: SelectTutorAvailability['startTime'],
  endTime: SelectTutorAvailability['endTime']
): Promise<void> {
  await db
    .delete(tutorAvailability)
    .where(
      and(
        eq(tutorAvailability.tutorId, tutorId),
        eq(tutorAvailability.dayOfWeek, dayOfWeek),
        eq(tutorAvailability.startTime, startTime),
        eq(tutorAvailability.endTime, endTime)
      )
    );
}
