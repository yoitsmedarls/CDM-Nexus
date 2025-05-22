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

export async function getQuizzesByTopicId(
  topicId: SelectQuiz['topicId']
): Promise<SelectQuiz[]> {
  return await db.select().from(quizzes).where(eq(quizzes.topicId, topicId));
}

export async function getQuizById(id: SelectQuiz['id']): Promise<SelectQuiz[]> {
  return await db.select().from(quizzes).where(eq(quizzes.id, id));
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
