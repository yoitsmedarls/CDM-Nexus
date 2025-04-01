import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { invalidateSession } from '$lib/server/auth/session';
import { deleteSessionTokenCookie } from '$lib/server/auth/session';

export const load: PageServerLoad = async (event) => {
  const { ...user } = event.locals.user;

  return {
    user: {
      username: user.username,
      cdmEmail: user.cdmEmail,
    },
  };
};

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event);

    return redirect(302, '/login');
  },
};
