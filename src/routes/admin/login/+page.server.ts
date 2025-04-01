import { fail, redirect } from '@sveltejs/kit';
import { hash, verify } from '@node-rs/argon2';
import type { Actions, PageServerLoad } from './$types';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
  if (event.locals.user !== null && event.locals.user.role === 'admin') {
    return redirect(302, '/admin/dashboard');
  }
};

export const actions: Actions = {
  login: async (event) => {
    const formData: FormData = await event.request.formData();
    const username: string | undefined = formData.get('username')?.toString();
    const password: string | undefined = formData.get('password')?.toString();

    if (!validateUsername(username)) {
      return fail(400, {
        message:
          'Invalid username (min 3, max 31 characters, alphanumeric only)',
      });
    }
    if (!validatePassword(password)) {
      return fail(400, {
        message: 'Invalid password (min 6, max 255 characters)',
      });
    }

    const results = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    const existingUser = results.at(0);
    if (!existingUser) {
      return fail(400, { message: 'Incorrect username or password' });
    }

    const validPassword = await verify(existingUser.passwordHash, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    if (!validPassword) {
      return fail(400, { message: 'Incorrect username or password' });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(event, sessionToken, session.expiresAt);

    return redirect(302, '/admin/dashboard');
  },
  register: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    if (!validateUsername(username)) {
      return fail(400, { message: 'Invalid username' });
    }
    if (!validatePassword(password)) {
      return fail(400, { message: 'Invalid password' });
    }
    if (
      await db.query.user.findFirst({ where: eq(users.username, username) })
    ) {
      return fail(400, { message: 'Username already taken' });
    }

    const userId = generateUserId();
    const passwordHash = await hash(password, {
      // recommended minimum parameters
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    try {
      await db.insert(users).values({ id: userId, username, passwordHash });

      const sessionToken = generateSessionToken();
      const session = await createSession(sessionToken, userId);
      setSessionTokenCookie(event, sessionToken, session.expiresAt);
    } catch (e) {
      console.log(e ?? '');
      return fail(500, { message: 'An error has occurred. ' });
    }
    return redirect(302, '/admin/dashboard');
  },
};



function validateUsername(username: unknown): username is string {
  return (
    typeof username === 'string' &&
    username.length >= 3 &&
    username.length <= 31 &&
    /^[a-z0-9_-]+$/.test(username)
  );
}

function validatePassword(password: unknown): password is string {
  return (
    typeof password === 'string' &&
    password.length >= 6 &&
    password.length <= 255
  );
}
