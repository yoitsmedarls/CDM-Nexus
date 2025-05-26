import {
  createTopic,
  deleteLesson,
  getLessonBySlug,
  updateLesson,
} from '$lib/server/api/courses';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getTopicsByLessonId } from '$lib/server/api/courses';

export const load: PageServerLoad = async ({ params }) => {
  const lesson = await getLessonBySlug(params.lessonId);

  if (!lesson) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const topics = await getTopicsByLessonId(lesson.id);

  return {
    lesson,
    topics,
  };
};

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
      return fail(400, {
        updateLessonMessage: 'Fill up all the fields.',
      });
    }

    const slugPass1: string = title.toLowerCase().replaceAll(/[^a-z-]/g, '-');
    const slug: string = slugPass1.replaceAll(/-(-)+/g, '-');
    const published = publishedInput === 'true' ? true : false;
    const term: 'midterm' | 'finals' =
      termInput === 'midterm' ? 'midterm' : 'finals';

    try {
      await updateLesson(id, {
        courseId,
        title,
        description,
        slug,
        term,
        published,
      });
    } catch (error) {
      console.error(error);
      return fail(500, {
        updateLessonMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, slug);
  },

  deleteLesson: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('lesson-id')?.toString().trim();

    if (!id) {
      return fail(400, {
        deleteLessonMessage: 'Something went wrong. Please try again later.',
      });
    }

    try {
      await deleteLesson(id);
    } catch (error) {
      console.error(error);
      return fail(500, {
        deleteLessonMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, '/admin/courses/');
  },

  addTopic: async (event) => {
    const formData: FormData = await event.request.formData();

    const lessonId: string | undefined = formData
      .get('topic-lesson-id')
      ?.toString()
      .trim();
    const title: string | undefined = formData
      .get('topic-title')
      ?.toString()
      .trim();
    const description: string | undefined = formData
      .get('topic-description')
      ?.toString()
      .trim();

    if (!lessonId || !title || !description) {
      return fail(400, { addTopicMessage: 'Fill up all the fields.' });
    }

    const slugPass1: string = title.toLowerCase().replaceAll(/[^a-z-]/g, '-');
    const slug: string = slugPass1.replaceAll(/-(-)+/g, '-');

    try {
      await createTopic({
        lessonId,
        title,
        description,
        slug,
      });
    } catch (error) {
      console.error(error);
      return fail(500, {
        addTopicMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, event.url.pathname + `/${slug}`);
  },
};
