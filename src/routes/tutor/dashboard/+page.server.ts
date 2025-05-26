import type { PageServerLoad } from './$types';
import { getAllCourses } from '$lib/server/api/courses';

export const load: PageServerLoad = async () => {
  return {
    courses: await getAllCourses(),
  };
};
