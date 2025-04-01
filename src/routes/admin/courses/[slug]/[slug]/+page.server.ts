import { db } from '$lib/server/db';
import { lessons, topics, type InsertLesson } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const [queriedLesson] = await db
    .select()
    .from(lessons)
    .where(eq(lessons.slug, params.slug));

  if (!queriedLesson) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const queriedTopics = await db
    .select()
    .from(topics)
    .where(eq(topics.lessonId, queriedLesson.id))
    .orderBy(desc(topics.dateModified));

  return { queriedLesson, queriedTopics };
}) satisfies PageServerLoad;

export const actions: Actions = {
  updateLesson: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('lesson-id')?.toString().trim();
    const courseId: string | undefined = formData
      .get('lesson-course-id')
      ?.toString()
      .trim();
    const title: string | undefined = formData
      .get('lesson-title')
      ?.toString()
      .trim();
    const description: string | undefined = formData
      .get('lesson-description')
      ?.toString()
      .trim();
    const termInput: string | undefined = formData
      .get('lesson-term')
      ?.toString()
      .trim();
    const publishedInput: string | undefined = formData
      .get('lesson-published')
      ?.toString()
      .trim();

    if (
      !id ||
      !courseId ||
      !title ||
      !description ||
      !termInput ||
      !publishedInput
    ) {
      return fail(400, { message: 'Fill up all the fields.' });
    }

    const slugPass1: string = title.toLowerCase().replaceAll(/[^a-z-]/g, '-');
    const slug: string = slugPass1.replaceAll(/-(-)+/g, '-');
    const published = publishedInput === 'true' ? true : false;
    const term: 'midterm' | 'finals' =
      termInput === 'midterm' ? 'midterm' : 'finals';

    const updatedLesson: InsertLesson = {
      courseId,
      title,
      description,
      slug,
      term,
      published,
    };

    try {
      await db.update(lessons).set(updatedLesson).where(eq(lessons.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        message: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, slug);
  },
  deleteLesson: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('lesson-id')?.toString().trim();

    if (!id) {
      return fail(400, {
        message: 'Something went wrong. Please try again later.',
      });
    }

    try {
      await db.delete(lessons).where(eq(lessons.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        message: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, '/admin/courses');
  },
};
