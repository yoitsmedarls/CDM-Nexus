import { updateUserRole, getUserById } from '$lib/server/api/auth';
import {
  deleteApplication,
  getApplicationById,
} from '$lib/server/api/tutoring';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  return {
    application: await getApplicationById(params.applicationId),
  };
};

export const actions: Actions = {
  acceptApplication: async (event) => {
    const formData: FormData = await event.request.formData();

    const id = formData.get('application-id')?.toString();

    if (!id) {
      return fail(400, {
        acceptApplicationMessage: 'Fill up all the fields.',
      });
    }

    const userId = (await getApplicationById(id)).userId;
    const user = await getUserById(userId);

    if (!user) {
      return fail(400, {
        acceptApplicationMessage: 'Fill up all the fields.',
      });
    }

    try {
      await updateUserRole(user.username, 'tutor');
      await deleteApplication(id);
    } catch (error) {
      console.error(error);

      return fail(400, {
        acceptApplicationMessage: 'Something went wrong, please try again.',
      });
    }

    redirect(300, '/admin/tutors');
  },

  denyApplication: async (event) => {
    const formData: FormData = await event.request.formData();

    const id = formData.get('application-id')?.toString();

    if (!id) {
      return fail(400, {
        denyApplicationMessage: 'Fill up all the fields.',
      });
    }

    try {
      await deleteApplication(id);
    } catch (error) {
      console.error(error);

      return fail(400, {
        denyApplicationMessage: 'Something went wrong, please try again.',
      });
    }

    redirect(300, '/admin/tutors');
  },
};
