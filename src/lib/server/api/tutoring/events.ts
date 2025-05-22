import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import {
  events,
  type InsertEvent,
  type SelectEvent,
} from '$lib/server/db/schema';

export async function createEvent(data: InsertEvent): Promise<SelectEvent[]> {
  return await db.insert(events).values(data).returning();
}

export async function getAllEvents(): Promise<SelectEvent[]> {
  return await db.select().from(events);
}

export async function getEventsByCategory(
  category: SelectEvent['category']
): Promise<SelectEvent[]> {
  return await db.select().from(events).where(eq(events.category, category));
}

export async function getEventById(
  id: SelectEvent['id']
): Promise<SelectEvent[]> {
  return await db.select().from(events).where(eq(events.id, id)).limit(1);
}

export async function updateEvent(
  id: SelectEvent['id'],
  data: Partial<InsertEvent>
): Promise<SelectEvent[]> {
  return await db.update(events).set(data).where(eq(events.id, id)).returning();
}

export async function deleteEvent(id: SelectEvent['id']): Promise<void> {
  await db.delete(events).where(eq(events.id, id));
}
