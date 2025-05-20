import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
  examQuestions,
  type InsertExamQuestion,
  type SelectExamQuestion,
} from '$lib/server/db/schema';

export async function createExamQuestion(
  data: InsertExamQuestion
): Promise<SelectExamQuestion[]> {
  return await db.insert(examQuestions).values(data).returning();
}

export async function getExamQuestionsByExamId(
  examId: SelectExamQuestion['examId']
): Promise<SelectExamQuestion[]> {
  return await db
    .select()
    .from(examQuestions)
    .where(eq(examQuestions.examId, examId))
    .orderBy(examQuestions.id);
}

export async function getExamQuestionById(
  id: SelectExamQuestion['id']
): Promise<SelectExamQuestion[]> {
  return await db.select().from(examQuestions).where(eq(examQuestions.id, id));
}

export async function updateExamQuestion(
  id: SelectExamQuestion['id'],
  data: Partial<InsertExamQuestion>
): Promise<SelectExamQuestion[]> {
  return await db
    .update(examQuestions)
    .set(data)
    .where(eq(examQuestions.id, id))
    .returning();
}

export async function deleteExamQuestion(
  id: SelectExamQuestion['id']
): Promise<void> {
  await db.delete(examQuestions).where(eq(examQuestions.id, id));
}
