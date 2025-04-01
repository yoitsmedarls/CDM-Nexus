import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { courses, lessons, type InsertLesson } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';
import type { Actions, RequestEvent } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const queriedCourse = await db.query.course.findFirst({
    where: eq(courses.slug, params.slug),
    columns: {
      dateCreated: false,
    },
  });

  if (!queriedCourse) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const queriedLessons = await db.query.lesson.findMany({
    where: eq(lessons.courseId, queriedCourse.id),
    columns: {
      id: true,
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
    const title = formData.get('title');
    const description = formData.get('description');
    const term = formData.get('term');

    if (!title || !description || !term) {
      return { error: 'All fields are required!' };
    }

    const queriedCourse = await db.query.course.findFirst({
      where: eq(courses.slug, params.slug as string),
    });

    if (!queriedCourse) {
      throw error(404, 'Course not found');
    }

    await db.insert(lessons).values({
      term: term == 'midterm' ? 'midterm' : 'finals',
      courseId: queriedCourse.id,
      title: title as string,
      description: description as string,
      slug: title.toString().toLowerCase().replace(/ /g, '-'),
    } satisfies InsertLesson);

    return { success: true };
  },

  deleteLesson: async ({ request }) => {
    const formData = await request.formData();
    const lessonId = formData.get('lessonId');

    if (!lessonId) {
      return fail(400, { message: 'Missing lesson ID' });
    }

    try {
      await db.delete(lessons).where(eq(lessons.id, lessonId.toString()));
      return { success: true };
    } catch (err) {
      console.error('Failed to delete lesson:', err);
      return fail(500, { message: 'Failed to delete lesson' });
    }
  },
};
