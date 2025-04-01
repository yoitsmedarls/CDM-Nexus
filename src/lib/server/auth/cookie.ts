import type { RequestEvent } from '@sveltejs/kit';

export function setSessionTokenCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date
): void {
  event.cookies.set('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.delete('session', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}
