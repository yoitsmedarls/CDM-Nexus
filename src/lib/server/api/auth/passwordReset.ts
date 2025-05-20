import { encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { db } from '$lib/server/db';
import { DAY_IN_MS, generateRandomOTP } from '$lib/server/api/auth/utils';
import {
  passwordResetSessions,
  users,
  type SelectPasswordResetSession,
  type SelectUser,
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export const passwordResetSessionCookieName = 'password_reset_session';

export async function createPasswordResetSession(
  token: string,
  userId: string,
  cdmEmail: string
): Promise<SelectPasswordResetSession> {
  const passwordResetSessionId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(token))
  );

  const createdPasswordResetSession: SelectPasswordResetSession = {
    id: passwordResetSessionId,
    userId,
    cdmEmail,
    otp: generateRandomOTP(),
    expiresAt: new Date(Date.now() + DAY_IN_MS * 7),
  };

  await db.insert(passwordResetSessions).values(createdPasswordResetSession);

  return createdPasswordResetSession;
}

export async function validatePasswordResetSessionToken(
  token: string
): Promise<PasswordResetSessionValidationResult> {
  const passwordResetSessionId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(token))
  );

  const [result]: {
    user: SelectUser;
    passwordResetSession: SelectPasswordResetSession;
  }[] = await db
    .select({ user: users, passwordResetSession: passwordResetSessions })
    .from(passwordResetSessions)
    .innerJoin(users, eq(passwordResetSessions.userId, users.id))
    .where(eq(passwordResetSessions.id, passwordResetSessionId));

  if (!result) {
    return { passwordResetSession: null, user: null };
  }

  const { user, passwordResetSession } = result;

  if (Date.now() >= passwordResetSession.expiresAt.getTime()) {
    await db
      .delete(passwordResetSessions)
      .where(eq(passwordResetSessions.id, passwordResetSession.id));

    return { passwordResetSession: null, user: null };
  }

  return { passwordResetSession, user };
}

export async function invalidateUserPasswordResetSessions(
  userId: string
): Promise<void> {
  await db
    .delete(passwordResetSessions)
    .where(eq(passwordResetSessions.userId, userId));
}

export async function validatePasswordResetSessionRequest(
  event: RequestEvent
): Promise<PasswordResetSessionValidationResult> {
  const token = event.cookies.get(passwordResetSessionCookieName) ?? null;
  if (!token) {
    return { passwordResetSession: null, user: null };
  }

  const result = await validatePasswordResetSessionToken(token);
  if (!result.passwordResetSession) {
    deletePasswordResetSessionTokenCookie(event);
  }

  return result;
}

export function setPasswordResetSessionTokenCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date
): void {
  event.cookies.set(passwordResetSessionCookieName, token, {
    httpOnly: true,
    sameSite: 'strict',
    expires: expiresAt,
    path: '/',
  });
}

export function deletePasswordResetSessionTokenCookie(event: RequestEvent) {
  event.cookies.delete(passwordResetSessionCookieName, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

export function sendPasswordResetEmail(cdmEmail: string, code: string): void {
  // TODO: Implement email sending.
  console.log(`To ${cdmEmail}: Your reset code is ${code}`);
}

export type PasswordResetSessionValidationResult =
  | { passwordResetSession: SelectPasswordResetSession; user: SelectUser }
  | { passwordResetSession: null; user: null };
