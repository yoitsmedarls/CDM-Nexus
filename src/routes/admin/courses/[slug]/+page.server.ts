import { db } from '$lib/server/db';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { courses, lessons, type InsertCourse } from '$lib/server/db/schema';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const [queriedCourse] = await db
    .select()
    .from(courses)
    .where(eq(courses.slug, params.slug));

  if (!queriedCourse) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const queriedLessons = await db
    .select()
    .from(lessons)
    .where(eq(lessons.courseId, queriedCourse.id))
    .orderBy(desc(lessons.dateModified));

  return { queriedCourse, queriedLessons };
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

    return redirect(302, slug);
  },
  deleteCourse: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('course-id')?.toString().trim();

    if (!id) {
      return fail(400, {
        message: 'Something went wrong. Please try again later.',
      });
    }

    try {
      await db.delete(courses).where(eq(courses.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        message: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, '/admin/courses');
  },
};
