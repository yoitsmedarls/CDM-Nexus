import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
  quizzes,
  type InsertQuiz,
  type SelectQuiz,
} from '$lib/server/db/schema';

export async function createQuiz(data: InsertQuiz): Promise<SelectQuiz[]> {
  return await db.insert(quizzes).values(data).returning();
}

export async function getQuizByTopicId(
  topicId: SelectQuiz['topicId']
): Promise<SelectQuiz> {
  const quiz = await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.topicId, topicId));
  return quiz[0];
}

export async function getQuizById(id: SelectQuiz['id']): Promise<SelectQuiz> {
  const quiz = await db.select().from(quizzes).where(eq(quizzes.id, id));
  return quiz[0];
}

export async function updateQuiz(
  id: SelectQuiz['id'],
  data: Partial<InsertQuiz>
): Promise<SelectQuiz[]> {
  return await db
    .update(quizzes)
    .set(data)
    .where(eq(quizzes.id, id))
    .returning();
}

export async function deleteQuiz(id: SelectQuiz['id']): Promise<void> {
  await db.delete(quizzes).where(eq(quizzes.id, id));
}
