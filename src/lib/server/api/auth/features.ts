import { eq } from 'drizzle-orm';

import { db } from '$lib/server/db';
import { features, type SelectFeature } from '$lib/server/db/schema';

export async function getFeatures(): Promise<SelectFeature> {
  const result = await db
    .select()
    .from(features)
    .where(eq(features.version, 1));

  return result[0];
}

export async function enableCoursesPlatform(): Promise<void> {
  await db
    .update(features)
    .set({ coursesPlatform: true })
    .where(eq(features.version, 1));
}

export async function disableCoursesPlatform(): Promise<void> {
  await db
    .update(features)
    .set({ coursesPlatform: false })
    .where(eq(features.version, 1));
}

export async function enableTutorApplications(): Promise<void> {
  await db
    .update(features)
    .set({ tutorApplications: true })
    .where(eq(features.version, 1));
}

export async function disableTutorApplications(): Promise<void> {
  await db
    .update(features)
    .set({ tutorApplications: false })
    .where(eq(features.version, 1));
}

export async function enableTutorRequests(): Promise<void> {
  await db
    .update(features)
    .set({ tutorRequests: true })
    .where(eq(features.version, 1));
}

export async function disableTutorRequests(): Promise<void> {
  await db
    .update(features)
    .set({ tutorRequests: false })
    .where(eq(features.version, 1));
}
