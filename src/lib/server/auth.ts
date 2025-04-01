// import type { RequestEvent } from '@sveltejs/kit';
// import { eq } from 'drizzle-orm';
// import { sha256 } from '@oslojs/crypto/sha2';
// import { encodeBase64url, encodeHexLowerCase } from '@oslojs/encoding';
// import { db } from '$lib/server/db';
// import * as schema from '$lib/server/db/schema';

// const DAY_IN_MS = 1000 * 60 * 60 * 24;

// export const sessionCookieName = 'auth-session';

// export function generateSessionToken() {
//   const bytes = crypto.getRandomValues(new Uint8Array(18));
//   const token = encodeBase64url(bytes);
//   return token;
// }

// export async function createSession(sessionToken: string, userId: string) {
//   const sessionId = encodeHexLowerCase(
//     sha256(new TextEncoder().encode(sessionToken))
//   );
//   const createdSession = {
//     id: sessionId,
//     userId: userId,
//     expiresAt: new Date(Date.now() + DAY_IN_MS * 30),
//   };
//   await db.insert(schema.sessions).values(createdSession);
//   return createdSession;
// }

// export async function validateSessionToken(sessionToken: string) {
//   const sessionId = encodeHexLowerCase(
//     sha256(new TextEncoder().encode(sessionToken))
//   );
//   const [result] = await db
//     .select({
//       user: {
//         id: schema.users.id,
//         // role: schema.user.role,
//         username: schema.users.username,
//         // fullName: schema.user.fullName,
//       },
//       session: schema.sessions,
//     })
//     .from(schema.sessions)
//     .innerJoin(schema.users, eq(schema.sessions.userId, schema.users.id))
//     .where(eq(schema.sessions.id, sessionId));

//   if (!result) {
//     return { session: null, user: null };
//   }

//   const { session, user } = result;

//   const sessionExpired = Date.now() >= session.expiresAt.getTime();

//   if (sessionExpired) {
//     await db.delete(schema.sessions).where(eq(schema.sessions.id, session.id));
//     return { session: null, user: null };
//   }

//   const renewSession =
//     Date.now() >= session.expiresAt.getTime() - DAY_IN_MS * 15;
//   if (renewSession) {
//     session.expiresAt = new Date(Date.now() + DAY_IN_MS * 30);
//     await db
//       .update(schema.sessions)
//       .set({ expiresAt: session.expiresAt })
//       .where(eq(schema.sessions.id, session.id));
//   }

//   return { session, user };
// }

// export type SessionValidationResult = Awaited<
//   ReturnType<typeof validateSessionToken>
// >;

// export async function invalidateSession(sessionId: string) {
//   await db.delete(schema.sessions).where(eq(schema.sessions.id, sessionId));
// }

// export function setSessionTokenCookie(
//   event: RequestEvent,
//   token: string,
//   expiresAt: Date
// ) {
//   event.cookies.set(sessionCookieName, token, {
//     expires: expiresAt,
//     path: '/',
//   });
// }

// export function deleteSessionTokenCookie(event: RequestEvent) {
//   event.cookies.delete(sessionCookieName, {
//     path: '/',
//   });
// }
