import { getAllCourses } from '$lib/server/api/courses';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    courses: await getAllCourses(),
  };
};
