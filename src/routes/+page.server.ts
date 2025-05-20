import type { PageServerLoad } from './$types';

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
