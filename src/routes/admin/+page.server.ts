import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
  if (!event.locals.user) {
    return redirect(302, '/admin/login');
  }

  if (event.locals.user.role !== 'admin') {
    return redirect(302, '/admin/login');
  }

  return redirect(302, '/admin/dashboard');
};
