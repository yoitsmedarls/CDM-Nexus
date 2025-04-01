import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { lessons } from '$lib/server/db/schema';

export const load = (async ({ params }) => {
  return {
    queriedLesson: await db.query.lesson.findFirst({
      where: eq(lessons.slug, params.slug),
    }),
  };
}) satisfies PageServerLoad;
