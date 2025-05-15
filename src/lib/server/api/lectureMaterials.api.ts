import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
  lectureMaterials,
  type InsertLectureMaterial,
  type SelectLectureMaterial,
} from '$lib/server/db/schema';

export async function createLectureMaterial(
  data: InsertLectureMaterial
): Promise<SelectLectureMaterial[]> {
  return await db.insert(lectureMaterials).values(data).returning();
}

export async function getLectureMaterialsByTopicId(
  topicId: SelectLectureMaterial['topicId']
): Promise<SelectLectureMaterial[]> {
  return await db
    .select()
    .from(lectureMaterials)
    .where(eq(lectureMaterials.topicId, topicId));
}

export async function getLectureMaterialById(
  id: SelectLectureMaterial['id']
): Promise<SelectLectureMaterial[]> {
  return await db
    .select()
    .from(lectureMaterials)
    .where(eq(lectureMaterials.id, id));
}

export async function updateLectureMaterial(
  id: SelectLectureMaterial['id'],
  data: Partial<InsertLectureMaterial>
): Promise<SelectLectureMaterial[]> {
  return await db
    .update(lectureMaterials)
    .set(data)
    .where(eq(lectureMaterials.id, id))
    .returning();
}

export async function deleteLectureMaterial(
  id: SelectLectureMaterial['id']
): Promise<void> {
  await db.delete(lectureMaterials).where(eq(lectureMaterials.id, id));
}
