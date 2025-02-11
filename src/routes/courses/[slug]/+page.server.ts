import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { courses } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const course = await db.query.courses.findFirst({
    where: eq(courses.slug, params.slug),
    columns: {
      dateCreated: false,
    },
  });

  if (!course) {
    error(404, 'Sorry, your requested URL does not exist.');
  } else {
    return { course };
  }
}) satisfies PageServerLoad;
