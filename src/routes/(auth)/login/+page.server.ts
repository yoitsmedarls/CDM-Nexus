import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { checkIfUserExists, verifyUsernameInput } from '$lib/server/auth/user';
import { users, type SelectUser } from '$lib/server/db/schema';
import { generateSessionToken } from '$lib/server/auth/utils';
import { createSession, setSessionTokenCookie } from '$lib/server/auth/session';
import {
  verifyPasswordHash,
  verifyPasswordStrength,
} from '$lib/server/auth/password';

export const load: PageServerLoad = async (event) => {
  if (event.locals.user) {
    if (event.locals.user.role === 'admin') {
      throw redirect(302, '/admin/dashboard');
    }
    if (event.locals.user.role === 'tutor') {
      throw redirect(302, '/tutor/home');
    }

    throw redirect(302, '/home');
  }

  return { redirectTo: event.url.search };
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
      const redirectTo = event.url.searchParams.get('redirectTo');

      if (redirectTo) {
        throw redirect(302, `/${redirectTo}`);
      }
    }

    return { success: true };
  },
};
