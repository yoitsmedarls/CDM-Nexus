import {
  deleteSessionTokenCookie,
  sessionCookieName,
  setSessionTokenCookie,
  validateSessionToken,
} from '$lib/server/auth/session';
import { loginRedirect, roleBasedRedirect } from '$lib/server/auth/utils';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authHandler: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName) ?? null;

  if (!sessionToken) {
    event.locals.user = null;
    event.locals.session = null;
    console.log('Auth Handler: No session token found.');
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(sessionToken);

  if (session) {
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    console.log(`Auth Handler: Session valid for user: ${user?.username}`);
  } else {
    deleteSessionTokenCookie(event);
    console.log('Auth Handler: Invalid session token. Cleared cookie.');
  }

  event.locals.user = user;
  event.locals.session = session;

  return resolve(event);
};

const protectedRoutesHandler: Handle = async ({ event, resolve }) => {
  const protectedRoutes = [
    {
      role: 'admin',
      route: '/admin',
    },
    {
      role: 'tutor',
      route: '/tutor',
    },
    {
      role: 'student',
      route: '/student',
    },
  ];
  const authRoutes = ['/login', '/signup'];
  const currentPath = event.url.pathname;
  const user = event.locals.user;
  const session = event.locals.session;

  const isProtectedRoute = protectedRoutes.some((route) =>
    currentPath.startsWith(route.route)
  );
  const isAuthRoute = authRoutes.some((route) => currentPath.startsWith(route));

  if (isProtectedRoute) {
    if (!user || !session) {
      console.log(
        'Protected Routes Handler: User tried to access',
        currentPath,
        'without an account.'
      );
      throw redirect(302, loginRedirect(event));
    }

    const matchedRoute = protectedRoutes.find((route) =>
      currentPath.startsWith(route.route)
    );

    if (matchedRoute && user.role !== matchedRoute.role) {
      console.log(
        `Protected Routes Handler: User with role '${user.role}' tried to access ${currentPath} (requires '${matchedRoute.role}').`
      );
      throw redirect(302, roleBasedRedirect(user.role));
    }

    console.log(
      `Protected Routes Handler: User with role '${user.role}' accessing ${currentPath}`
    );
  }
  if (isAuthRoute) {
    if (user && session) {
      console.log(
        `Protected Routes Handler: Logged-in user tried to access ${currentPath}. Redirecting.`
      );
      throw redirect(302, roleBasedRedirect(user.role));
    }
    console.log(
      `Protected Routes Handler: Guest user accessing ${currentPath}.`
    );
  }

  return resolve(event);
};

export const handle: Handle = sequence(authHandler, protectedRoutesHandler);
