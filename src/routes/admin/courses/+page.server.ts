import { db } from '$lib/server/db';
import { courses, type InsertCourse } from '$lib/server/db/schema';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load = (async () => {
  const queriedCourses = await db.select().from(courses).orderBy(courses.id);

  return { queriedCourses };
}) satisfies PageServerLoad;

export const actions: Actions = {
  updateCourse: async (event) => {
    const formData: FormData = await event.request.formData();
    const id: string | undefined = formData.get('course-id')?.toString().trim();
    const title: string | undefined = formData
      .get('course-title')
      ?.toString()
      .trim();
    const description: string | undefined = formData
      .get('course-description')
      ?.toString()
      .trim();
    const stateInput: string | undefined = formData
      .get('course-state')
      ?.toString()
      .trim();
    const publishedInput: string | undefined = formData
      .get('course-published')
      ?.toString()
      .trim();

    if (!id || !title || !description || !stateInput || !publishedInput) {
      return fail(400, { message: 'Fill up all the fields.' });
    }

    const slug: string = id.toLowerCase().replaceAll(' ', '');
    const published = publishedInput === 'true' ? true : false;
    const state: 'ongoing' | 'complete' =
      stateInput === 'ongoing' ? 'ongoing' : 'complete';

    const updatedCourse: InsertCourse = {
      id,
      title,
      description,
      slug,
      state,
      published,
    };

    try {
      await db.update(courses).set(updatedCourse).where(eq(courses.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        message: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, '/admin/courses/');
  },
};
