import {
  getUsersByRole,
  updateUserRole,
  getUserByUsername,
} from '$lib/server/api/auth';
import {
  deleteTutorAvailabilitiesByTutorId,
  getAllApplications,
} from '$lib/server/api/tutoring';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    tutors: await getUsersByRole('tutor'),
    applications: await getAllApplications(),
  };
};

export const actions: Actions = {
  removeTutor: async (event) => {
    const formData: FormData = await event.request.formData();

    const username = formData.get('username')?.toString();

    if (!username) {
      return fail(400, {
        removeTutorMessage: 'Something went wrong, please try again.',
      });
    }
    const tutor = await getUserByUsername(username);

    if (!tutor) {
      return fail(400, {
        removeTutorMessage: 'Something went wrong, please try again.',
      });
    }

    try {
      await deleteTutorAvailabilitiesByTutorId(tutor.id);
      await updateUserRole(username, 'student');
    } catch (error) {
      console.error(error);

      return fail(400, {
        removeTutorMessage: 'Something went wrong, please try again.',
      });
    }
  },
};
