import {
  encodeBase32LowerCase,
  encodeBase32LowerCaseNoPadding,
  encodeBase32UpperCaseNoPadding,
} from '@oslojs/encoding';
import { type RequestEvent } from '@sveltejs/kit';

import type { SelectUser } from '$lib/server/db/schema';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function generateSessionToken(): string {
  const token = encodeBase32LowerCaseNoPadding(
    crypto.getRandomValues(new Uint8Array(20))
  );

  return token;
}

export function generateUserId(): string {
  const userId = encodeBase32LowerCase(
    crypto.getRandomValues(new Uint8Array(15))
  );

  return userId;
}

export function generateRandomOTP(): string {
  const otp = encodeBase32UpperCaseNoPadding(
    crypto.getRandomValues(new Uint8Array(5))
  );

  return otp;
}

export function generateRandomRecoveryCode(): string {
  const recoveryCode = encodeBase32UpperCaseNoPadding(
    crypto.getRandomValues(new Uint8Array(10))
  );

  return recoveryCode;
}

export function loginRedirect(event: RequestEvent): string {
  const redirectTo = event.url.pathname.slice(1) + event.url.search;

  return `/login?redirectTo=${redirectTo}`;
}

export function roleBasedRedirect(role: SelectUser['role']): string {
  if (role === 'admin') {
    return '/admin/dashboard';
  }
  if (role === 'tutor') {
    return '/tutor/home';
  }

  return '/home';
}
