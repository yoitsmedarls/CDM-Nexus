import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handleLoginRedirect } from '$lib/server/auth/utils';

export const load = (async (event) => {
  if (
    !event.locals.session ||
    !event.locals.user ||
    event.locals.user.role !== 'admin'
  ) {
    return redirect(302, handleLoginRedirect(event));
  }

  return redirect(303, '/admin/dashboard');
}) satisfies PageServerLoad;
