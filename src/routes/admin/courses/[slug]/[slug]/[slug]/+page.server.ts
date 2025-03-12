import { db } from '$lib/server/db';
import {
  topics,
  lectureMaterials,
  quizzes,
  quizQuestions,
  type InsertTopic,
  type InsertLectureMaterial,
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const [queriedTopic] = await db
    .select()
    .from(topics)
    .where(eq(topics.slug, params.slug));

  if (!queriedTopic) {
    error(404, 'Sorry, your requested URL does not exist.');
  }

  const [queriedLectureMaterial] = await db
    .select()
    .from(lectureMaterials)
    .where(eq(lectureMaterials.topicId, queriedTopic.id));

  const [queriedQuiz] = await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.topicId, queriedTopic.id));

  let queriedQuizQuestions;

  if (queriedQuiz) {
    queriedQuizQuestions = await db
      .select()
      .from(quizQuestions)
      .where(eq(quizQuestions.quizId, queriedQuiz.id));
  }

  return {
    queriedTopic,
    queriedLectureMaterial,
    queriedQuiz,
    queriedQuizQuestions,
  };
}) satisfies PageServerLoad;

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
      return fail(400, { topicMessage: 'Fill up all the fields.' });
    }

    const slugPass1: string = title.toLowerCase().replaceAll(/[^a-z-]/g, '-');
    const slug: string = slugPass1.replaceAll(/-(-)+/g, '-');
    const published = publishedInput === 'true' ? true : false;

    const updatedTopic: InsertTopic = {
      lessonId,
      title,
      description,
      slug,
      published,
    };

    try {
      await db.update(topics).set(updatedTopic).where(eq(topics.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        topicMessage: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, slug);
  },

  deleteTopic: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData.get('topic-id')?.toString().trim();

    if (!id) {
      return fail(400, {
        topicMessage: 'Something went wrong. Please try again later.',
      });
    }

    try {
      await db.delete(topics).where(eq(topics.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        topicMessage: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, '/admin/courses');
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
      return fail(400, { lectureMaterialMessage: 'Fill up all the fields.' });
    }

    const updatedLectureMaterial: InsertLectureMaterial = {
      topicId,
      ytVideoId,
      title,
      description,
    };

    try {
      await db
        .update(lectureMaterials)
        .set(updatedLectureMaterial)
        .where(eq(lectureMaterials.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        lectureMaterialMessage: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, event.url.pathname);
  },

  deleteLectureMaterial: async (event) => {
    const formData: FormData = await event.request.formData();

    const id: string | undefined = formData
      .get('lecture-material-id')
      ?.toString()
      .trim();

    if (!id) {
      return fail(400, {
        lectureMaterialMessage: 'Something went wrong. Please try again later.',
      });
    }

    try {
      await db.delete(lectureMaterials).where(eq(lectureMaterials.id, id));
    } catch (error) {
      console.error(error);
      return fail(500, {
        lectureMaterialMessage: 'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, event.url.pathname);
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
        insertLectureMaterialMessage: 'Fill up all the fields.',
      });
    }

    const updatedLectureMaterial: InsertLectureMaterial = {
      topicId,
      title,
      ytVideoId,
      description,
    };

    try {
      await db.insert(lectureMaterials).values(updatedLectureMaterial);
    } catch (error) {
      console.error(error);
      return fail(500, {
        insertLectureMaterialMessage:
          'Something went wrong. Please try again later.',
      });
    }

    return redirect(302, event.url.pathname);
  },
};
