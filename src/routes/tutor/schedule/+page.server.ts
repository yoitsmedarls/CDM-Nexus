import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
  addTutorAvailability,
  convertTo12HourFormat,
  deleteTutorAvailability,
  getTutorAvailability,
  getTutoringSessionsByTutorId,
} from '$lib/server/api/tutoring';

export const load: PageServerLoad = async ({ locals }) => {
  const availability = await getTutorAvailability(
    locals.user ? locals.user.id : ''
  );
  const sessions = await getTutoringSessionsByTutorId(
    locals.user ? locals.user.id : ''
  );

  return {
    availability,
    sessions,
  };
};

export const actions: Actions = {
  addAvailability: async (event) => {
    const formData: FormData = await event.request.formData();

    const tutorId = event.locals.user?.id;
    const name = event.locals.user?.fullName;
    const dayOfWeek = formData.get('day-of-week')?.toString();
    const startTime = formData.get('start-time')?.toString();
    const endTime = formData.get('end-time')?.toString();

    if (!tutorId || !name || !dayOfWeek || !startTime || !endTime) {
      return fail(400, {
        addAvailabilityMessage: 'Fill up all the fields.',
      });
    }

    try {
      await addTutorAvailability(
        tutorId,
        name,
        Number.parseInt(dayOfWeek),
        convertTo12HourFormat(startTime),
        convertTo12HourFormat(endTime)
      );
    } catch (error) {
      console.error(error);

      return fail(400, {
        addAvailabilityMessage: 'Please specify a unique timeslot.',
      });
    }
  },

  deleteAvailability: async (event) => {
    const formData: FormData = await event.request.formData();

    const availabilityId = formData.get('availability-id')?.toString();

    if (!availabilityId) {
      return fail(400, {
        deleteAvailabilityMessage: 'Something went wrong, please try again.',
      });
    }

    try {
      await deleteTutorAvailability(availabilityId);
    } catch (error) {
      console.error(error);

      return fail(400, {
        deleteAvailabilityMessage: 'Something went wrong, please try again.',
      });
    }
  },
};
