import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { invalidateSession, deleteSessionTokenCookie } from '$lib/server/auth';

export const load: PageServerLoad = async () => {
  redirect(301, '/admin/dashboard');
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
