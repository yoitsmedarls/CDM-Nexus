import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user
      ? {
          username: locals.user.username,
          fullName: locals.user.fullName,
          cdmEmail: locals.user.cdmEmail,
          role: locals.user.role,
        }
      : null,
  };
};
