import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
  quizQuestions,
  type InsertQuizQuestion,
  type SelectQuizQuestion,
} from '$lib/server/db/schema';

export async function createQuizQuestion(
  data: InsertQuizQuestion
): Promise<SelectQuizQuestion[]> {
  return await db.insert(quizQuestions).values(data).returning();
}

export async function getQuizQuestionsByQuizId(
  quizId: SelectQuizQuestion['quizId']
): Promise<SelectQuizQuestion[]> {
  return await db
    .select()
    .from(quizQuestions)
    .where(eq(quizQuestions.quizId, quizId))
    .orderBy(quizQuestions.id);
}

export async function getQuizQuestionById(
  id: SelectQuizQuestion['id']
): Promise<SelectQuizQuestion[]> {
  return await db.select().from(quizQuestions).where(eq(quizQuestions.id, id));
}

export async function updateQuizQuestion(
  id: SelectQuizQuestion['id'],
  data: Partial<InsertQuizQuestion>
): Promise<SelectQuizQuestion[]> {
  return await db
    .update(quizQuestions)
    .set(data)
    .where(eq(quizQuestions.id, id))
    .returning();
}

export async function deleteQuizQuestion(
  id: SelectQuizQuestion['id']
): Promise<void> {
  await db.delete(quizQuestions).where(eq(quizQuestions.id, id));
}
