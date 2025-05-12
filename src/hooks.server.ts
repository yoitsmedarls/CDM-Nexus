import {
  deleteSessionTokenCookie,
  sessionCookieName,
  setSessionTokenCookie,
  validateSessionToken,
} from '$lib/server/auth/session';
import { loginRedirect, roleBasedRedirect } from '$lib/server/auth/utils';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

// Readonly variables for protected and auth routes.
const protectedRoutes: ReadonlyArray<{
  role: string;
  url: string;
}> = [
  {
    role: 'admin',
    url: '/admin',
  },
  {
    role: 'tutor',
    url: '/tutor',
  },
  {
    role: 'student',
    url: '/student',
  },
];
const authRoutes: ReadonlyArray<string> = ['/login', '/signup'];

const authenticationHandler: Handle = async ({ event, resolve }) => {
  const sessionToken = event.cookies.get(sessionCookieName) ?? null;

  // Checking if there is no session token.
  if (!sessionToken) {
    // No session token found, nulling the user and session locals.
    event.locals.user = null;
    event.locals.session = null;

    // No need to proceed further, resolving the event.
    console.log('Authentication Handler: No session token found.');
    return resolve(event);
  }

  // A session token cookie exists, validating it against the database
  const { session, user } = await validateSessionToken(sessionToken);

  // Checking session validity
  if (session) {
    // Session valid, assigning a session token cookie with adjusted expiry.
    setSessionTokenCookie(event, sessionToken, session.expiresAt);
    console.log(
      `Authentication Handler: Session valid for user: ${user?.username}`
    );
  } else {
    // Session invalid, deleting the redundant session token cookie.
    deleteSessionTokenCookie(event);
    console.log(
      'Authentication Handler: Invalid session token. Cleared cookie.'
    );
  }

  // Assigning local variables.
  event.locals.user = user;
  event.locals.session = session;

  // Process complete, resolving event.
  return resolve(event);
};

const authorizationHandler: Handle = async ({ event, resolve }) => {
  const matchedProtectedRoute = protectedRoutes.find((route) =>
    event.url.pathname.startsWith(route.url)
  );

  // Checking if the user is accessing is a protected route.
  if (matchedProtectedRoute) {
    // User is accessing a protected route.

    // Checking if there is a valid user and session in the locals.
    if (!event.locals.user || !event.locals.session) {
      // No valid user or session, redirecting the user to login/signup.
      console.log(
        `Authorization Handler: User tried to access ${event.url.pathname} without an account.`
      );
      redirect(302, loginRedirect(event));
    }

    // At this point, there is a user or session in locals.

    // Validating if the user has access to the protected route.
    if (event.locals.user.role !== matchedProtectedRoute.role) {
      // User does not have access, redirecting them to their home page.
      console.log(
        `Authorization Handler: User with role '${event.locals.user.role}' tried to access ${event.url.pathname} (requires '${matchedProtectedRoute.role}').`
      );
      redirect(302, roleBasedRedirect(event.locals.user.role));
    }

    // User is authenticated and has access to the page.
    console.log(
      `Authorization Handler: User with role '${event.locals.user.role}' accessing ${event.url.pathname}`
    );
  } else {
    // User is NOT accessing a protected route.

    // Checking if the user is accessing an auth route instead.
    if (authRoutes.some((route) => event.url.pathname.startsWith(route))) {
      // User is accessing an auth route.

      // Checking if they are logged in.
      if (event.locals.user && event.locals.session) {
        // User currently has a valid session, redirecting them to their home page.
        console.log(
          `Authorization Handler: Logged-in user tried to access ${event.url.pathname}. Redirecting.`
        );
        redirect(302, roleBasedRedirect(event.locals.user.role));
      }

      // User is not logged in and is accessing and auth route.
      console.log(
        `Authorization Handler: Guest user accessing ${event.url.pathname}.`
      );
    }
  }

  // Process done resolving event.
  return resolve(event);
};

// Sequences the authentication and authorization handlers.
export const handle: Handle = sequence(
  authenticationHandler,
  authorizationHandler
);
