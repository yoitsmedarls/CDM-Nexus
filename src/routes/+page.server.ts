import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
  invalidateSession,
  deleteSessionTokenCookie,
} from '$lib/server/api/auth';

export const load: PageServerLoad = async ({ locals }) => {
  return {
    // Returns the currently logged in user's role for the proper color coding of the Avatar component in the landing page.
    user: locals.user
      ? {
          role: locals.user.role,
        }
      : null,
  };
};

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event);

    console.log('User logged out.');

    return redirect(302, '/login');
  },
};
