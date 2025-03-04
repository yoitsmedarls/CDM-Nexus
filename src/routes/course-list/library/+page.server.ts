import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    queriedCourses: await db.query.course.findMany({
      columns: {
        id: true,
        title: true,
        slug: true,
      },
    }),
  };
}) satisfies PageServerLoad;

