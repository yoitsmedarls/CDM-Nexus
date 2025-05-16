import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
  courses,
  type InsertCourse,
  type SelectCourse,
} from '$lib/server/db/schema';

export async function createCourse(
  data: InsertCourse
): Promise<SelectCourse[]> {
  return await db.insert(courses).values(data).returning();
}

export async function getAllCourses(): Promise<SelectCourse[]> {
  return await db.select().from(courses);
}

export async function getCourseById(
  id: SelectCourse['id']
): Promise<SelectCourse[]> {
  return await db.select().from(courses).where(eq(courses.id, id)).limit(1);
}

export async function updateCourse(
  id: SelectCourse['id'],
  data: Partial<InsertCourse>
): Promise<SelectCourse[]> {
  return await db
    .update(courses)
    .set(data)
    .where(eq(courses.id, id))
    .returning();
}

export async function deleteCourse(id: SelectCourse['id']): Promise<void> {
  await db.delete(courses).where(eq(courses.id, id));
}
