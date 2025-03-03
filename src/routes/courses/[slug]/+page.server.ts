import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { course, lesson } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const queriedCourse = await db.query.course.findFirst({
    where: eq(course.slug, params.slug),
    columns: {
      dateCreated: false,
    },
  });

  if (!queriedCourse) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const queriedLessons = await db.query.lesson.findMany({
    where: eq(lesson.courseId, queriedCourse.id),
    columns: {
      term: true,
      title: true,
      description: true,
      dateModified: true,
      slug: true,
    },
  });

  return { queriedCourse, queriedLessons };
}) satisfies PageServerLoad;

export const actions: Actions = {
  addLesson: async ({ request, params }: RequestEvent) => {
    const formData = await request.formData();

    const title = formData.get('title')?.toString() ?? '';
    const description = formData.get('description')?.toString() ?? '';
    const term = formData.get('term')?.toString() as 'midterm' | 'finals';

    if (!title || !description || !term) {
      return { error: 'All fields are required!' };
    }

    const queriedCourse = await db.query.course.findFirst({
      where: eq(course.slug, params.slug as string),
    });

    if (!queriedCourse) {
      throw error(404, 'Course not found');
    }

    await db.insert(lesson).values({
      courseId: queriedCourse.id,
      title,
      description,
      term,
      dateModified: new Date(),
      slug: title.toLowerCase().replace(/ /g, '-'), // super simple slug generator
    });

    return { success: true };
  }
};