import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  return {
    courses: await db.query.courses.findMany({
      columns: {
        id: true,
        title: true,
        slug: true,
      },
    }),
  };
}) satisfies PageServerLoad;
