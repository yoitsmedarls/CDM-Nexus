import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  return {
    user: locals.user
      ? {
          role: locals.user.role,
        }
      : null,
  };
};
