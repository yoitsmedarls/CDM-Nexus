import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

import {
  createUser,
  getUserByCdmEmail,
  getUserByUsername,
  verifyCDMEmailInput,
  verifyFullNameInput,
  verifyUsernameInput,
} from '$lib/server/auth/user';
import { verifyPasswordStrength } from '$lib/server/auth/password';
import { generateSessionToken, generateUserId } from '$lib/server/auth/utils';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';

export const actions: Actions = {
  default: async (event) => {
    const formData: FormData = await event.request.formData();

    // Getting all inputs from the user
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

    // Checks if any of the required fields are empty.
    // Prompts the user to fill up empty fields.
    if (!username || !password || !fullName || !cdmEmail) {
      return fail(400, { message: 'Fill in the required fields.' });
    }

    // Ensures a proper full name was entered
    // (at least 5 characters and one space).
    if (!verifyFullNameInput(fullName)) {
      return fail(400, {
        message: 'Please enter your full name.',
      });
    }

    // Validates the CDM Email format through RegEx
    if (!verifyCDMEmailInput(cdmEmail)) {
      return fail(400, {
        message: 'Invalid email. Use your CDM email only.',
      });
    }

    // Validates the username input through length checks and RegEx.
    if (!verifyUsernameInput(username)) {
      return fail(400, {
        message:
          'Invalid username. Use alphanumeric characters only (min: 5, max: 30).',
      });
    }

    // Checks password length and compared against list of pwned passwords.
    if (!(await verifyPasswordStrength(password))) {
      return fail(400, {
        message:
          'Password too weak. Use characters, numbers, and symbols (min: 8, max: 255).',
      });
    }

    // Queries the database twice, checking for either an
    //  existing user with the given username or CDM email.
    if (await getUserByUsername(username)) {
      return fail(400, {
        message: 'An account already exists with the username provided',
      });
    }
    if (await getUserByCdmEmail(cdmEmail)) {
      return fail(400, {
        message: 'An account already exists with the email provided',
      });
    }

    // All validation checks completed, proceeding to account creation
    try {
      const createdUser = await createUser(
        generateUserId(),
        fullName,
        cdmEmail,
        username,
        password
      );

      // Setting up session tokens.
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

    // Checking if URL has redirect targets.
    // If so, redirect user to such target.
    // Access to certain pages are still managed by the server hooks,
    // so unauthorized access is not of concern.
    if (event.url.searchParams.has('redirectTo')) {
      const redirectTo = event.url.searchParams.get('redirectTo');

      if (redirectTo) {
        redirect(302, `/${redirectTo}`);
      }
    }

    // Returns a success prompt the user.
    return { success: true };
  },
};
