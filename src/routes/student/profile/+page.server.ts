import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
  deleteSessionTokenCookie,
  invalidateSession,
} from '$lib/server/auth/session';

export const load = (async (event) => {
  const user = event.locals.user;

  return { user };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event);

    throw redirect(302, '/login');
  },
};
