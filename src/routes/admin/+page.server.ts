import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth/session';
import { deleteSessionTokenCookie } from '$lib/server/auth/session';

export const load = (async () => {
  return redirect(303, '/admin/dashboard');
}) satisfies PageServerLoad;

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
