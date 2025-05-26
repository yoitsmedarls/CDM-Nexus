import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { exams, type InsertExam, type SelectExam } from '$lib/server/db/schema';

export async function createExam(data: InsertExam): Promise<SelectExam[]> {
  return await db.insert(exams).values(data).returning();
}

export async function getAllExams(): Promise<SelectExam[]> {
  return await db.select().from(exams).orderBy(exams.courseId);
}

export async function getExamsByCourseId(
  courseId: SelectExam['courseId']
): Promise<SelectExam[]> {
  return await db.select().from(exams).where(eq(exams.courseId, courseId));
}

export async function getExamById(id: SelectExam['id']): Promise<SelectExam[]> {
  return await db.select().from(exams).where(eq(exams.id, id));
}

export async function updateExam(
  id: SelectExam['id'],
  data: Partial<InsertExam>
): Promise<SelectExam[]> {
  return await db.update(exams).set(data).where(eq(exams.id, id)).returning();
}

export async function deleteExam(id: SelectExam['id']): Promise<void> {
  await db.delete(exams).where(eq(exams.id, id));
}
