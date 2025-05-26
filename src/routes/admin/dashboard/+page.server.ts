import type { PageServerLoad } from './$types';
import { getAllCourses } from '$lib/server/api/courses';
import { getUsersByRole } from '$lib/server/api/auth';

export const load: PageServerLoad = async () => {
  return {
    courses: await getAllCourses(),
    students: await getUsersByRole('student'),
    tutors: await getUsersByRole('tutor'),
  };
};
