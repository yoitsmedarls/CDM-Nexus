import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
  topics,
  type InsertTopic,
  type SelectTopic,
} from '$lib/server/db/schema';

export async function createTopic(data: InsertTopic): Promise<SelectTopic[]> {
  return await db.insert(topics).values(data).returning();
}

export async function getTopicsByLessonId(
  lessonId: SelectTopic['lessonId']
): Promise<SelectTopic[]> {
  return await db.select().from(topics).where(eq(topics.lessonId, lessonId));
}

export async function getTopicById(
  id: SelectTopic['id']
): Promise<SelectTopic[]> {
  return await db.select().from(topics).where(eq(topics.id, id));
}

export async function updateTopic(
  id: SelectTopic['id'],
  data: Partial<InsertTopic>
): Promise<SelectTopic[]> {
  return await db.update(topics).set(data).where(eq(topics.id, id)).returning();
}

export async function deleteTopic(id: SelectTopic['id']): Promise<void> {
  await db.delete(topics).where(eq(topics.id, id));
}
