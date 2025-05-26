import { getUserById, getUsersByRole } from '$lib/server/api/auth';
import {
  createTutoringSession,
  deleteTutoringSession,
  getAllTutorAvailabilities,
  getAllTutoringSessions,
} from '$lib/server/api/tutoring';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const availabilities = await getAllTutorAvailabilities();
  const sessions = await getAllTutoringSessions();
  const tutors = await getUsersByRole('tutor');

  return {
    availabilities,
    sessions,
    tutors,
  };
};

export const actions: Actions = {
  addSession: async (event) => {
    const formData: FormData = await event.request.formData();

    const tutorId = formData.get('tutor-id')?.toString();
    const startTime = formData.get('start-time')?.toString();
    const endTime = formData.get('end-time')?.toString();

    if (!tutorId || !startTime || !endTime) {
      return fail(400, {
        addAvailabilityMessage: 'Fill up all the fields.',
      });
    }

    const tutor = await getUserById(tutorId);

    if (!tutor) {
      return fail(400, {
        addAvailabilityMessage: 'Something went wrong. Please try again later.',
      });
    }

    const name = 'Session with ' + tutor.fullName;

    try {
      await createTutoringSession(
        tutorId,
        name,
        new Date(startTime),
        new Date(endTime)
      );
    } catch (error) {
      console.error(error);

      return fail(400, {
        addAvailabilityMessage: 'Please specify a unique timeslot.',
      });
    }
  },

  deleteSession: async (event) => {
    const formData: FormData = await event.request.formData();

    const sessionId = formData.get('session-id')?.toString();

    if (!sessionId) {
      return fail(400, {
        deleteSessionMessage: 'Something went wrong, please try again.',
      });
    }

    try {
      await deleteTutoringSession(sessionId);
    } catch (error) {
      console.error(error);

      return fail(400, {
        deleteSessionMessage: 'Something went wrong, please try again.',
      });
    }
  },
};
