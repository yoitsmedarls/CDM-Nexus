import {
  deleteSessionTokenCookie,
  sessionCookieName,
  setSessionTokenCookie,
  validateSessionToken,
} from '$lib/server/auth/session';
import { handleLoginRedirect } from '$lib/server/auth/utils';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const authHandler: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName);

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

  if (event.url.pathname.startsWith('/admin')) {
    if (!event.locals.user || event.locals.user.role !== 'admin') {
      return redirect(302, handleLoginRedirect(event));
    }
  }

  if (event.url.pathname.startsWith('/tutor')) {
    if (!event.locals.user || event.locals.user.role !== 'tutor') {
      return redirect(302, handleLoginRedirect(event));
    }
  }

  const response = await resolve(event);

  return response;
};

export const handle: Handle = authHandler;
