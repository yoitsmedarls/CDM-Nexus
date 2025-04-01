import type { RequestEvent } from '@sveltejs/kit';

export const sessionCookieName = 'session';

export function setSessionTokenCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date
): void {
  event.cookies.set(sessionCookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.delete(sessionCookieName, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}
