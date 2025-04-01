import {
  encodeBase32LowerCase,
  encodeBase32LowerCaseNoPadding,
} from '@oslojs/encoding';

export const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function generateSessionToken(): string {
  const token = encodeBase32LowerCaseNoPadding(
    crypto.getRandomValues(new Uint8Array(20))
  );

  return token;
}

export function generateUserId() {
  const userId = encodeBase32LowerCase(
    crypto.getRandomValues(new Uint8Array(15))
  );

  return userId;
}
