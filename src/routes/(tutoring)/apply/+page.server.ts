import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SelectUser } from '$lib/server/db/schema';
import {
  getApplicationByUserId,
  verifyMessageInput,
} from '$lib/server/api/tutoring/application';
import { createApplication } from '$lib/server/api/tutoring/application';
import { invalidateSession } from '$lib/server/api/auth';
import { deleteSessionTokenCookie } from '$lib/server/api/auth';

export const load: PageServerLoad = async ({ locals }) => {
  // Checks if the user visiting the page has already submitted an application before. If yes, then redirect them to the updates page regarding their application.
  const userApplication = await getApplicationByUserId(
    locals.user ? locals.user.id : ''
  );
  if (userApplication) {
    redirect(302, `/apply/${userApplication.id}`);
  }

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

export const actions: Actions = {
  submitApplication: async (event) => {
    const formData: FormData = await event.request.formData();

    // Getting all inputs from the user
    const userId: string | undefined = event.locals.user?.id;
    const message: string | undefined = formData.get('message')?.toString();
    const currentRole: SelectUser['role'] | undefined = event.locals.user?.role;
    const desiredRole: SelectUser['role'] = 'tutor';

    // Checks if any of the required fields are empty.
    // Prompts the user to fill up empty fields.
    if (!userId || !message || !currentRole || !desiredRole) {
      return fail(400, { message: 'Fill in the required fields.' });
    }

    // Validates the message input through length checks and RegEx.
    if (!verifyMessageInput(message)) {
      return fail(400, {
        message: 'Message too short/long or contains invalid characters.',
      });
    }

    // Checks with the database if the user already has a pending application.
    const existingApplication = await getApplicationByUserId(userId);

    // If value is truthy, an application is already in the database.
    if (existingApplication) {
      return fail(400, {
        message: 'You already have a pending application.',
      });
    }

    let createdApplication;

    // At this point, the tutor application can be created.
    try {
      createdApplication = await createApplication(
        userId,
        message,
        currentRole,
        desiredRole
      );
    } catch (error) {
      console.error('Error creating application:', error);

      return fail(500, {
        message:
          'An error occurred while creating your application. Please try again later.',
      });
    }

    redirect(302, `/apply/${createdApplication.id}`);
  },
  switchAccount: async (event) => {
    // This form action is similar to a logout form action, just that it has a set redirectTo search param on the redirect to login.
    if (!event.locals.session) {
      return fail(401);
    }
    await invalidateSession(event.locals.session.id);
    deleteSessionTokenCookie(event);

    console.log('User logged out.');

    return redirect(302, '/login?redirectTo=apply');
  },
};
