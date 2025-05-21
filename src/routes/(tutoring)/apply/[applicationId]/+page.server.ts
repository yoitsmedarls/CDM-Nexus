import { getApplicationById } from '$lib/server/api/tutoring/application';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
      params.applicationId
    ) === false
  ) {
    error(400, 'Invalid application ID');
  }

  const userApplication = await getApplicationById(params.applicationId);

  if (!userApplication) {
    error(404, 'Application not found');
  }

  return {
    application: userApplication,
  };
};
