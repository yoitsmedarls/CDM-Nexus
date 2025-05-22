import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
  lessons,
  type InsertLesson,
  type SelectLesson,
} from '$lib/server/db/schema';

export async function createLesson(
  data: InsertLesson
): Promise<SelectLesson[]> {
  return await db.insert(lessons).values(data).returning();
}

export async function getLessonsByCourseId(
  courseId: SelectLesson['courseId']
): Promise<SelectLesson[]> {
  return await db.select().from(lessons).where(eq(lessons.courseId, courseId));
}

export async function getLessonById(
  id: SelectLesson['id']
): Promise<SelectLesson[]> {
  return await db.select().from(lessons).where(eq(lessons.id, id));
}

export async function updateLesson(
  id: SelectLesson['id'],
  data: Partial<InsertLesson>
): Promise<SelectLesson[]> {
  return await db
    .update(lessons)
    .set(data)
    .where(eq(lessons.id, id))
    .returning();
}

export async function deleteLesson(id: SelectLesson['id']): Promise<void> {
  await db.delete(lessons).where(eq(lessons.id, id));
}
