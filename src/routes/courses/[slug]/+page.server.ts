import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { course, lesson } from '$lib/server/db/schema';
import { error } from '@sveltejs/kit';

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
