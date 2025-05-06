import { encodeHexLowerCase } from '@oslojs/encoding';
import { db } from '../db';
import {
  sessions,
  users,
  type SelectSession,
  type SelectUser,
} from '../db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { DAY_IN_MS } from './utils';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export const sessionCookieName = 'session';

export async function createSession(
  token: string,
  userId: string
): Promise<SelectSession> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const createdSession: SelectSession = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + DAY_IN_MS * 30),
  };

  await db.insert(sessions).values(createdSession);

  return createdSession;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [result]: {
    user: SelectUser;
    session: SelectSession;
  }[] = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }

  const { user, session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15) {
    await db
      .update(sessions)
      .set({
        expiresAt: new Date(Date.now() + DAY_IN_MS * 30),
      })
      .where(eq(sessions.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function invalidateAllSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}

export function setSessionTokenCookie(
  event: RequestEvent,
  token: string,
  expiresAt: Date
): void {
  event.cookies.set(sessionCookieName, token, {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.delete(sessionCookieName, {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  });
}

export type SessionValidationResult =
  | { session: SelectSession; user: SelectUser }
  | { session: null; user: null };
