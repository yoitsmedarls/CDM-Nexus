import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';

import {
  tutoringSessionAttendees,
  type InsertTutoringSessionAttendee,
  type SelectTutoringSessionAttendee,
} from '$lib/server/db/schema';

export async function addTutoringSessionAttendee(
  tutoringSessionId: InsertTutoringSessionAttendee['tutoringSessionId'],
  studentId: InsertTutoringSessionAttendee['studentId']
): Promise<SelectTutoringSessionAttendee> {
  const attendee: SelectTutoringSessionAttendee[] = await db
    .insert(tutoringSessionAttendees)
    .values({
      tutoringSessionId,
      studentId,
    })
    .returning();

  if (attendee.length === 0) {
    throw new Error('Failed to add attendee');
  }

  return attendee[0];
}

export async function getTutoringSessionAttendees(
  tutoringSessionId: SelectTutoringSessionAttendee['tutoringSessionId']
): Promise<SelectTutoringSessionAttendee[]> {
  return await db
    .select()
    .from(tutoringSessionAttendees)
    .where(eq(tutoringSessionAttendees.tutoringSessionId, tutoringSessionId));
}

export async function deleteTutoringSessionAttendee(
  tutoringSessionId: SelectTutoringSessionAttendee['tutoringSessionId'],
  studentId: SelectTutoringSessionAttendee['studentId']
): Promise<void> {
  await db
    .delete(tutoringSessionAttendees)
    .where(
      and(
        eq(tutoringSessionAttendees.tutoringSessionId, tutoringSessionId),
        eq(tutoringSessionAttendees.studentId, studentId)
      )
    );
}
