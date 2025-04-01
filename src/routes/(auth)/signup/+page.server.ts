import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import {
  checkUsernameAvailability,
  createUser,
  verifyFullNameInput,
  verifyUsernameInput,
} from '$lib/server/auth/user';
import { verifyPasswordStrength } from '$lib/server/auth/password';
import { generateSessionToken, generateUserId } from '$lib/server/auth/utils';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';
import {
  checkEmailAvailability,
  verifyEmailInput,
} from '$lib/server/auth/email';

export const load = (async (event) => {
  return { redirectTo: event.url.search };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const formData: FormData = await event.request.formData();

    const fullName: string | undefined = formData
      .get('fullname')
      ?.toString()
      .trim();
    const cdmEmail: string | undefined = formData
      .get('cdmemail')
      ?.toString()
      .trim();
    const username: string | undefined = formData
      .get('username')
      ?.toString()
      .trim();
    const password: string | undefined = formData
      .get('password')
      ?.toString()
      .trim();

    if (!username || !password || !fullName || !cdmEmail) {
      return fail(400, { message: 'Fill in the required fields.' });
    }
    if (!verifyFullNameInput(fullName)) {
      return fail(400, {
        message: 'Please enter your full name.',
      });
    }
    if (!verifyEmailInput(cdmEmail)) {
      return fail(400, {
        message: 'Invalid email. Use your CDM email only.',
      });
    }
    if (!verifyUsernameInput(username)) {
      return fail(400, {
        message:
          'Invalid username. Use alphanumeric characters only (min: 5, max: 30).',
      });
    }
    if (!(await verifyPasswordStrength(password))) {
      return fail(400, {
        message:
          'Password too weak. Use characters, numbers, and symbols (min: 8, max: 255).',
      });
    }
    if (!(await checkUsernameAvailability(username))) {
      return fail(400, {
        message: 'An account already exists with the username provided',
      });
    }
    if (!(await checkEmailAvailability(cdmEmail))) {
      return fail(400, {
        message: 'An account already exists with the email provided',
      });
    }

    try {
      const createdUser = await createUser(
        generateUserId(),
        fullName,
        cdmEmail,
        username,
        password
      );

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, createdUser.id);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (error) {
      console.error('Error creating user:', error);

      return fail(500, {
        message:
          'An error occurred while creating your account. Please try again later.',
      });
    }

    if (event.url.searchParams.has('redirectTo')) {
      const redirectTo = event.url.searchParams.get('redirectTo');

      if (redirectTo) {
        throw redirect(302, `/${redirectTo}`);
      }
    }

    return { success: true };
  },
};
