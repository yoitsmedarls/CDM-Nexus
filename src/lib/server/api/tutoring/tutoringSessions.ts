import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';

import {
  tutoringSessions,
  type InsertTutoringSession,
  type SelectTutoringSession,
} from '$lib/server/db/schema';

export async function createTutoringSession(
  tutorId: InsertTutoringSession['tutorId'],
  name: InsertTutoringSession['name'],
  startTime: InsertTutoringSession['startTime'],
  endTime: InsertTutoringSession['endTime']
): Promise<SelectTutoringSession> {
  const session: SelectTutoringSession[] = await db
    .insert(tutoringSessions)
    .values({
      tutorId,
      name,
      startTime,
      endTime,
    })
    .returning();

  if (session.length === 0) {
    throw new Error('Failed to create tutoring session');
  }

  return session[0];
}

export async function getAllTutoringSessions(): Promise<
  SelectTutoringSession[]
> {
  const sessions = await db.select().from(tutoringSessions);

  return sessions;
}

export async function getTutoringSessionById(
  id: SelectTutoringSession['id']
): Promise<SelectTutoringSession> {
  const session = await db
    .select()
    .from(tutoringSessions)
    .where(eq(tutoringSessions.id, id));

  return session[0];
}

export async function getTutoringSessionsByTutorId(
  tutorId: SelectTutoringSession['tutorId']
): Promise<SelectTutoringSession[]> {
  const sessions = await db
    .select()
    .from(tutoringSessions)
    .where(eq(tutoringSessions.tutorId, tutorId));

  return sessions;
}

export async function updateTutoringSession(
  id: SelectTutoringSession['id'],
  startTime: InsertTutoringSession['startTime'],
  endTime: InsertTutoringSession['endTime']
): Promise<SelectTutoringSession> {
  const session = await db
    .update(tutoringSessions)
    .set({
      startTime,
      endTime,
    })
    .where(eq(tutoringSessions.id, id))
    .returning();

  if (session.length === 0) {
    throw new Error('Failed to update tutoring session');
  }

  return session[0];
}

export async function deleteTutoringSession(
  id: SelectTutoringSession['id']
): Promise<void> {
  await db.delete(tutoringSessions).where(eq(tutoringSessions.id, id));
}
