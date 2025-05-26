import {
  createLesson,
  deleteCourse,
  getCourseById,
  getLessonsByCourseId,
  updateCourse,
} from '$lib/server/api/courses';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const course = await getCourseById(params.courseId.toUpperCase());

  if (!course) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const lessons = await getLessonsByCourseId(course.id);

  return {
    course,
    lessons,
  };
};

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
    const statusInput: string | undefined = formData
      .get('course-status')
      ?.toString()
      .trim();
    const publishedInput: string | undefined = formData
      .get('course-published')
      ?.toString()
      .trim();

    if (!id || !title || !description || !statusInput || !publishedInput) {
      return fail(400, {
        updateCourseMessage: 'Fill up all the fields.',
      });
    }

    const slug: string = id.toLowerCase().replaceAll(' ', '');
    const published = publishedInput === 'true' ? true : false;
    const status: 'ongoing' | 'complete' =
      statusInput === 'ongoing' ? 'ongoing' : 'complete';

    try {
      await updateCourse(id, {
        title,
        description,
        slug,
        status,
        published,
      });
    } catch (error) {
      console.error(error);

      return fail(500, {
        updateCourseMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, slug);
  },

  deleteCourse: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('course-id')?.toString().trim();

    if (!id) {
      return fail(400, {
        deleteCourseMessage: 'Something went wrong. Please try again later.',
      });
    }

    try {
      await deleteCourse(id);
    } catch (error) {
      console.error(error);

      return fail(500, {
        deleteCourseMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, '/admin/courses');
  },

  addLesson: async (event) => {
    const formData: FormData = await event.request.formData();

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

    if (!courseId || !title || !description || !termInput) {
      return fail(400, {
        addLessonMessage: 'Fill up all the fields.',
      });
    }

    const slugPass1: string = title.toLowerCase().replaceAll(/[^a-z-]/g, '-');
    const slug: string = slugPass1.replaceAll(/-(-)+/g, '-');
    const term: 'midterm' | 'finals' =
      termInput === 'midterm' ? 'midterm' : 'finals';

    try {
      await createLesson({
        courseId,
        title,
        description,
        slug,
        term,
      });
    } catch (error) {
      console.error(error);

      return fail(500, {
        addLessonMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, event.url.pathname + `/${slug}`);
  },
};
