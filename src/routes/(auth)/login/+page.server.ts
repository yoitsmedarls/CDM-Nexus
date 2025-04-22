import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getUserByUsername, verifyUsernameInput } from '$lib/server/auth/user';
import { generateSessionToken } from '$lib/server/auth/utils';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';
import {
  verifyPasswordHash,
  verifyPasswordStrength,
} from '$lib/server/auth/password';

export const actions: Actions = {
  default: async (event) => {
    const formData: FormData = await event.request.formData();

    // Getting all inputs from the user
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
    if (!username || !password) {
      return fail(400, { message: 'Fill in the required fields.' });
    }

    // Validates the username input through length checks and RegEx.
    if (!verifyUsernameInput(username)) {
      return fail(400, {
        message: 'Invalid username.',
      });
    }

    // Checks password length and compared against list of pwned passwords.
    if (!(await verifyPasswordStrength(password))) {
      return fail(400, {
        message: 'Invalid password.',
      });
    }

    // Checks with the database if the user with the provided username exists.
    const existingUser = await getUserByUsername(username);

    // If value is falsey, user does not exist.
    if (!existingUser) {
      return fail(400, {
        message: 'No user found with the provided username.',
      });
    }

    // At this point, a user with the provided username exists.

    // Checking if the entered password is correct
    if (!(await verifyPasswordHash(existingUser.passwordHash, password))) {
      return fail(400, { message: 'Incorrect password.' });
    }

    // All validation checks completed, setting up session tokens
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    // Checking if URL has redirect targets.
    // If so, redirect user to such target.
    // Access to certain pages are still managed by the server hooks,
    // so unauthorized access is not of concern.
    if (event.url.searchParams.has('redirectTo')) {
      const redirectTo = event.url.searchParams.get('redirectTo');

      if (redirectTo) {
        throw redirect(302, `/${redirectTo}`);
      }
    }

    // Returns a success prompt the user.
    return { success: true };
  },
};
