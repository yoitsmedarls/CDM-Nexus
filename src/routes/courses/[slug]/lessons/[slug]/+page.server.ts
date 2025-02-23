import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { lesson } from '$lib/server/db/schema';

export const load = (async ({ params }) => {
  return {
    queriedLesson: await db.query.lesson.findFirst({
      where: eq(lesson.slug, params.slug),
    }),
  };
}) satisfies PageServerLoad;
