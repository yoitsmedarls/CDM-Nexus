import { getFeatures } from '$lib/server/api/auth/features';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAllTutoringSessions } from '$lib/server/api/tutoring';

export const load: PageServerLoad = async () => {
  if ((await getFeatures()).tutorRequests === false) {
    redirect(302, '/');
  }

  return {
    sessions: await getAllTutoringSessions(),
  };
};
