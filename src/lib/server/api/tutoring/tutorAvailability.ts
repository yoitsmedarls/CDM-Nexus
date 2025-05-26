import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

import {
  tutorAvailability,
  type InsertTutorAvailability,
  type SelectTutorAvailability,
} from '$lib/server/db/schema';

export function convertTo12HourFormat(time24hr: string): string {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  const match = time24hr.match(timeRegex);

  if (!match) {
    return 'Invalid input format. Please use HH:MM (e.g., 09:00 or 17:00).';
  }

  const hour24 = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);

  let period = 'AM';
  let hour12 = hour24;

  if (hour24 === 0) {
    hour12 = 12; // Midnight case: 00:xx becomes 12:xx AM
  } else if (hour24 === 12) {
    period = 'PM'; // Noon case: 12:xx becomes 12:xx PM
  } else if (hour24 > 12) {
    hour12 = hour24 - 12;
    period = 'PM'; // Afternoon/Evening: 13:xx to 23:xx
  }
  const minuteStr = minute < 10 ? `0${minute}` : minute.toString();

  return `${hour12}:${minuteStr} ${period}`;
}

export async function addTutorAvailability(
  tutorId: InsertTutorAvailability['tutorId'],
  name: InsertTutorAvailability['name'],
  dayOfWeek: InsertTutorAvailability['dayOfWeek'],
  startTime: InsertTutorAvailability['startTime'],
  endTime: InsertTutorAvailability['endTime']
): Promise<SelectTutorAvailability> {
  const availability: SelectTutorAvailability[] = await db
    .insert(tutorAvailability)
    .values({
      tutorId,
      name,
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
  id: SelectTutorAvailability['id']
): Promise<void> {
  await db.delete(tutorAvailability).where(eq(tutorAvailability.id, id));
}

export async function deleteTutorAvailabilitiesByTutorId(
  tutorId: SelectTutorAvailability['tutorId']
): Promise<void> {
  await db
    .delete(tutorAvailability)
    .where(eq(tutorAvailability.tutorId, tutorId));
}
