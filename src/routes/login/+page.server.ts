import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { checkIfUserExists, verifyUsernameInput } from '$lib/server/auth/user';
import { users, type SelectUser } from '$lib/server/db/schema';
import { generateSessionToken } from '$lib/server/auth/utils';
import { createSession } from '$lib/server/auth/session';
import { setSessionTokenCookie } from '$lib/server/auth/cookie';
import {
  verifyPasswordHash,
  verifyPasswordStrength,
} from '$lib/server/auth/password';

export const load: PageServerLoad = async (event) => {
  let redirectDestination = '';

  if (event.locals.user) {
    switch (event.locals.user.role) {
      case 'admin':
        redirectDestination = 'admin/dashboard';
        break;

      case 'tutor':
        redirectDestination = 'tutor/dashboard';
        break;

      default:
        redirectDestination = 'student/dashboard';
        break;
    }

    redirect(302, redirectDestination);
  }
};

export const actions: Actions = {
  default: async (event) => {
    const formData: FormData = await event.request.formData();

    const username: string | undefined = formData
      .get('username')
      ?.toString()
      .trim();
    const password: string | undefined = formData
      .get('password')
      ?.toString()
      .trim();

    if (!username || !password) {
      return fail(400, { message: 'Fill in the required fields.' });
    }
    if (!verifyUsernameInput(username)) {
      return fail(400, {
        message: 'Invalid username.',
      });
    }
    if (!(await checkIfUserExists(username))) {
      return fail(400, {
        message: 'No user found with the provided username.',
      });
    }

    const [existingUser]: SelectUser[] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (!(await verifyPasswordStrength(password))) {
      return fail(400, {
        message: 'Invalid password.',
      });
    }
    if (!(await verifyPasswordHash(existingUser.passwordHash, password))) {
      return fail(400, { message: 'Incorrect password.' });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    if (event.url.searchParams.has('redirectTo')) {
      const searchParamValue = event.url.searchParams.get('redirectTo');

      if (searchParamValue) {
        redirect(303, searchParamValue);
      }
    }

    return { success: true };
  },
};
