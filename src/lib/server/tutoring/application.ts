import { db } from '$lib/server/db';
import {
  applications,
  type InsertApplication,
  type SelectApplication,
} from '$lib/server/db/schema/applications';
import { DAY_IN_MS } from '$lib/server/auth/utils';
import { eq, or } from 'drizzle-orm';

export async function createApplication(
  userId: InsertApplication['userId'],
  message: InsertApplication['message'],
  currentRole: InsertApplication['currentRole'],
  desiredRole: InsertApplication['desiredRole']
): Promise<SelectApplication> {
  if (currentRole === desiredRole) {
    throw new Error('Current role and desired role cannot be the same');
  }

  const application: SelectApplication[] = await db
    .insert(applications)
    .values({
      userId,
      message,
      currentRole,
      desiredRole,
      expiresAt: new Date(Date.now() + DAY_IN_MS * 30),
    })
    .returning();

  if (application.length === 0) {
    throw new Error('Failed to create application');
  }

  return application[0];
}

export async function getAllApplications(): Promise<SelectApplication[]> {
  return await db.select().from(applications);
}

export async function getApplicationsByStatus(
  status: SelectApplication['status']
): Promise<SelectApplication[]> {
  return await db
    .select()
    .from(applications)
    .where(eq(applications.status, status));
}

export async function getApplicationById(
  id: SelectApplication['id']
): Promise<SelectApplication> {
  return (
    await db.select().from(applications).where(eq(applications.id, id))
  )[0];
}

export async function getApplicationByUserId(
  userId: SelectApplication['userId']
): Promise<SelectApplication> {
  return (
    await db.select().from(applications).where(eq(applications.userId, userId))
  )[0];
}

export async function updateApplication(
  id: SelectApplication['id'],
  status: SelectApplication['status']
): Promise<SelectApplication> {
  const application: SelectApplication[] = await db
    .update(applications)
    .set({ status: status })
    .where(eq(applications.id, id))
    .returning();

  if (application.length === 0) {
    throw new Error('Error updating application');
  }

  return application[0];
}

export async function deleteApplication(
  id: SelectApplication['id']
): Promise<void> {
  await db.delete(applications).where(eq(applications.id, id));
}

export async function deleteApplicationsByUserId(
  userId: SelectApplication['userId']
): Promise<void> {
  await db.delete(applications).where(eq(applications.userId, userId));
}

export async function deleteOldApplications(): Promise<void> {
  await db
    .delete(applications)
    .where(
      or(eq(applications.status, 'accepted'), eq(applications.status, 'denied'))
    );
}
