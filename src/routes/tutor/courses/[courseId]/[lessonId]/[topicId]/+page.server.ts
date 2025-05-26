import {
  createLectureMaterial,
  deleteLectureMaterial,
  deleteTopic,
  getLectureMaterialsByTopicId,
  getQuizByTopicId,
  getQuizQuestionsByQuizId,
  getTopicBySlug,
  updateLectureMaterial,
  updateTopic,
} from '$lib/server/api/courses';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const topic = await getTopicBySlug(params.topicId);

  if (!topic) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const lectureMaterial = await getLectureMaterialsByTopicId(topic.id);
  const quiz = await getQuizByTopicId(topic.id);
  let quizQuestions;

  if (quiz) {
    quizQuestions = await getQuizQuestionsByQuizId(quiz.id);
  }

  return {
    topic,
    lectureMaterial,
    quiz,
    quizQuestions,
  };
};

export const actions: Actions = {
  updateTopic: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('topic-id')?.toString().trim();
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
    const publishedInput: string | undefined = formData
      .get('topic-published')
      ?.toString()
      .trim();

    if (!id || !lessonId || !title || !description || !publishedInput) {
      return fail(400, { updateTopicMessage: 'Fill up all the fields.' });
    }

    const slugPass1: string = title.toLowerCase().replaceAll(/[^a-z-]/g, '-');
    const slug: string = slugPass1.replaceAll(/-(-)+/g, '-');
    const published = publishedInput === 'true' ? true : false;

    try {
      await updateTopic(id, {
        lessonId,
        title,
        description,
        slug,
        published,
      });
    } catch (error) {
      console.error(error);
      return fail(500, {
        updateTopicMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, slug);
  },
  deleteTopic: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('topic-id')?.toString().trim();

    if (!id) {
      return fail(400, {
        deleteTopicMessage: 'Something went wrong. Please try again later.',
      });
    }

    try {
      await deleteTopic(id);
    } catch (error) {
      console.error(error);
      return fail(500, {
        deleteTopicMessage: 'Something went wrong. Please try again later.',
      });
    }

    redirect(302, '/admin/courses');
  },
  addLectureMaterial: async (event) => {
    const formData: FormData = await event.request.formData();

    const topicId: string | undefined = formData
      .get('insert-lecture-material-topic-id')
      ?.toString()
      .trim();
    const title: string | undefined = formData
      .get('insert-lecture-material-title')
      ?.toString()
      .trim();
    const ytVideoId: string | undefined = formData
      .get('insert-lecture-material-yt-video-id')
      ?.toString()
      .trim();
    const description: string | undefined = formData
      .get('insert-lecture-material-description')
      ?.toString()
      .trim();

    if (!topicId || !title || !ytVideoId || !description) {
      return fail(400, {
        addLectureMaterialMessage: 'Fill up all the fields.',
      });
    }

    try {
      await createLectureMaterial({
        topicId,
        title,
        ytVideoId,
        description,
      });
    } catch (error) {
      console.error(error);
      return fail(500, {
        addLectureMaterialMessage:
          'Something went wrong. Please try again later.',
      });
    }

    redirect(302, event.url.pathname);
  },
  updateLectureMaterial: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData
      .get('lecture-material-id')
      ?.toString()
      .trim();
    const topicId: string | undefined = formData
      .get('lecture-material-topic-id')
      ?.toString()
      .trim();
    const ytVideoId: string | undefined = formData
      .get('lecture-material-yt-video-id')
      ?.toString()
      .trim();
    const title: string | undefined = formData
      .get('lecture-material-title')
      ?.toString()
      .trim();
    const description: string | undefined = formData
      .get('lecture-material-description')
      ?.toString()
      .trim();

    if (!id || !topicId || !ytVideoId || !title || !description) {
      return fail(400, {
        updateLectureMaterialMessage: 'Fill up all the fields.',
      });
    }

    try {
      await updateLectureMaterial(id, {
        topicId,
        ytVideoId,
        title,
        description,
      });
    } catch (error) {
      console.error(error);
      return fail(500, {
        updateLectureMaterialMessage:
          'Something went wrong. Please try again later.',
      });
    }

    redirect(302, event.url.pathname);
  },

  deleteLectureMaterial: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData
      .get('lecture-material-id')
      ?.toString()
      .trim();

    if (!id) {
      return fail(400, {
        deleteLectureMaterialMessage:
          'Something went wrong. Please try again later.',
      });
    }

    try {
      await deleteLectureMaterial(id);
    } catch (error) {
      console.error(error);
      return fail(500, {
        deleteLectureMaterialMessage:
          'Something went wrong. Please try again later.',
      });
    }

    redirect(302, event.url.pathname);
  },
};
