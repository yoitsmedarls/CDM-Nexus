import {
  disableCoursesPlatform,
  disableTutorApplications,
  disableTutorRequests,
  enableCoursesPlatform,
  enableTutorApplications,
  enableTutorRequests,
  getFeatures,
} from '$lib/server/api/auth/features';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const features = await getFeatures();

  return {
    features,
  };
};

export const actions: Actions = {
  updateSettings: async (event) => {
    const formData: FormData = await event.request.formData();

    const coursesPlatform = formData.get('courses_platform')?.toString();
    const tutorApplications = formData.get('tutoring_applications')?.toString();
    const tutorRequests = formData.get('tutor_requests')?.toString();

    if (coursesPlatform === 'on') {
      enableCoursesPlatform();
    } else {
      disableCoursesPlatform();
    }

    if (tutorApplications === 'on') {
      enableTutorApplications();
    } else {
      disableTutorApplications();
    }

    if (tutorRequests === 'on') {
      enableTutorRequests();
    } else {
      disableTutorRequests();
    }

    redirect(302, '/admin/dashboard');
  },
};
