import { db } from '$lib/server/db';
import { courses, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    coursesCount: (await db.select().from(courses)).length,
    studentsCount: (
      await db.select().from(users).where(eq(users.role, 'student'))
    ).length,
    tutorsCount: (await db.select().from(users).where(eq(users.role, 'tutor')))
      .length,
    visitsCount: (
      await db.select({ visits: courses.visits }).from(courses)
    ).reduce((acc, curr) => acc + curr.visits, 0),
  };
};
