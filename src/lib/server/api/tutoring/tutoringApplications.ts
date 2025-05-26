import { db } from '$lib/server/db';
import { eq, or } from 'drizzle-orm';

import { DAY_IN_MS } from '$lib/server/api/auth';
import {
  tutoringApplications,
  type InsertTutoringApplication,
  type SelectTutoringApplication,
} from '$lib/server/db/schema';

export function verifyMessageInput(
  message: InsertTutoringApplication['message']
): boolean {
  return (
    message.length >= 50 &&
    message.length <= 1000 &&
    /^[\w\d\s.,!?;:"'()-]{100,5000}$/.test(message)
  );
}

export async function createApplication(
  userId: InsertTutoringApplication['userId'],
  name: InsertTutoringApplication['name'],
  message: InsertTutoringApplication['message'],
  currentRole: InsertTutoringApplication['currentRole'],
  desiredRole: InsertTutoringApplication['desiredRole']
): Promise<SelectTutoringApplication> {
  if (currentRole === desiredRole) {
    throw new Error('Current role and desired role cannot be the same');
  }

  const application: SelectTutoringApplication[] = await db
    .insert(tutoringApplications)
    .values({
      userId,
      name,
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

export async function getAllApplications(): Promise<
  SelectTutoringApplication[]
> {
  const applications = await db.select().from(tutoringApplications);

  return applications;
}

export async function getApplicationsByStatus(
  status: SelectTutoringApplication['status']
): Promise<SelectTutoringApplication[]> {
  const applications = await db
    .select()
    .from(tutoringApplications)
    .where(eq(tutoringApplications.status, status));

  return applications;
}

export async function getApplicationById(
  id: SelectTutoringApplication['id']
): Promise<SelectTutoringApplication> {
  const application = await db
    .select()
    .from(tutoringApplications)
    .where(eq(tutoringApplications.id, id));

  return application[0];
}

export async function getApplicationByUserId(
  userId: SelectTutoringApplication['userId']
): Promise<SelectTutoringApplication> {
  const application = await db
    .select()
    .from(tutoringApplications)
    .where(eq(tutoringApplications.userId, userId));

  return application[0];
}

export async function updateApplication(
  id: SelectTutoringApplication['id'],
  status: SelectTutoringApplication['status']
): Promise<SelectTutoringApplication> {
  const application: SelectTutoringApplication[] = await db
    .update(tutoringApplications)
    .set({ status: status })
    .where(eq(tutoringApplications.id, id))
    .returning();

  if (application.length === 0) {
    throw new Error('Error updating application');
  }

  return application[0];
}

export async function deleteApplication(
  id: SelectTutoringApplication['id']
): Promise<void> {
  await db.delete(tutoringApplications).where(eq(tutoringApplications.id, id));
}

export async function deleteApplicationsByUserId(
  userId: SelectTutoringApplication['userId']
): Promise<void> {
  await db
    .delete(tutoringApplications)
    .where(eq(tutoringApplications.userId, userId));
}

export async function deleteOldApplications(): Promise<void> {
  await db
    .delete(tutoringApplications)
    .where(
      or(
        eq(tutoringApplications.status, 'accepted'),
        eq(tutoringApplications.status, 'denied')
      )
    );
}
