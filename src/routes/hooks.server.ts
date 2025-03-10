import {
  deleteSessionTokenCookie,
  sessionCookieName,
  setSessionTokenCookie,
  validateSessionToken,
} from '$lib/server/auth/session';
import type { Handle } from '@sveltejs/kit';

const authHandler: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName) ?? null;

  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(sessionToken);

  if (session !== null) {
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
  } else {
    deleteSessionTokenCookie(event);
  }

  event.locals.user = user;
  event.locals.session = session;

  return resolve(event);
};

export const handle: Handle = authHandler;
