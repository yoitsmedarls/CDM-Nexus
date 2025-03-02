import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

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

export const actions: Actions = {
  default: async ({ request }: RequestEvent) => {
    const formData = await request.formData();
    const title = formData.get('title');

    if (!title || typeof title !== 'string') {
      throw error(400, 'Title is required');
    }

    return { success: true };
  },
};
