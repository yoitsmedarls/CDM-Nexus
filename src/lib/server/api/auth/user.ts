import { eq } from 'drizzle-orm';

import {
  generateRandomRecoveryCode,
  hashPassword,
} from '$lib/server/api/auth/';
import { db } from '$lib/server/db';
import { users, type SelectUser } from '$lib/server/db/schema';

export function verifyFullNameInput(fullName: SelectUser['fullName']): boolean {
  return (
    fullName.length >= 5 && fullName.length <= 255 && fullName.includes(' ')
  );
}

export function verifyUsernameInput(username: SelectUser['username']): boolean {
  return (
    username.length >= 5 &&
    username.length <= 30 &&
    /^[A-Za-z][A-Za-z0-9_]{5,30}$/.test(username)
  );
}

export function verifyCDMEmailInput(cdmEmail: string): boolean {
  return /^[A-Za-z0-9.]+(@cdm.edu.ph)$/.test(cdmEmail) && cdmEmail.length < 256;
}

export async function createUser(
  id: string,
  fullName: string,
  cdmEmail: string,
  username: string,
  password: string
): Promise<SelectUser> {
  const passwordHash: string = await hashPassword(password);
  const recoveryCode: string = generateRandomRecoveryCode();

  const [user]: SelectUser[] = await db
    .insert(users)
    .values({
      id,
      fullName,
      cdmEmail,
      username,
      passwordHash,
      recoveryCode,
    })
    .returning();

  return user;
}

export async function getUserByUsername(
  username: SelectUser['username']
): Promise<Omit<SelectUser, 'recoveryCode'> | false> {
  const [user]: Omit<SelectUser, 'recoveryCode'>[] = await db
    .select({
      id: users.id,
      username: users.username,
      fullName: users.fullName,
      cdmEmail: users.cdmEmail,
      role: users.role,
      passwordHash: users.passwordHash,
      dateJoined: users.dateJoined,
    })
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    return false;
  }

  return user;
}
export async function getUserByCdmEmail(
  cdmEmail: SelectUser['cdmEmail']
): Promise<Omit<SelectUser, 'recoveryCode'> | false> {
  const [user]: Omit<SelectUser, 'recoveryCode'>[] = await db
    .select({
      id: users.id,
      username: users.username,
      fullName: users.fullName,
      cdmEmail: users.cdmEmail,
      role: users.role,
      passwordHash: users.passwordHash,
      dateJoined: users.dateJoined,
    })
    .from(users)
    .where(eq(users.cdmEmail, cdmEmail));

  if (!user) {
    return false;
  }

  return user;
}
export async function getUsersByRole(
  role: SelectUser['role']
): Promise<Omit<SelectUser, 'recoveryCode'>[]> {
  const filteredUsers: Omit<SelectUser, 'recoveryCode'>[] = await db
    .select({
      id: users.id,
      username: users.username,
      fullName: users.fullName,
      cdmEmail: users.cdmEmail,
      role: users.role,
      passwordHash: users.passwordHash,
      dateJoined: users.dateJoined,
    })
    .from(users)
    .where(eq(users.role, role));

  return filteredUsers;
}

export async function getUserPasswordHash(
  username: SelectUser['username']
): Promise<SelectUser['passwordHash'] | false> {
  const [user]: {
    passwordHash: SelectUser['passwordHash'];
  }[] = await db
    .select({
      passwordHash: users.passwordHash,
    })
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    return false;
  }

  return user.passwordHash;
}
export async function getUserRecoveryCode(
  username: SelectUser['username']
): Promise<SelectUser['recoveryCode'] | false> {
  const [user]: {
    recoveryCode: SelectUser['recoveryCode'];
  }[] = await db
    .select({
      recoveryCode: users.recoveryCode,
    })
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    return false;
  }

  return user.recoveryCode;
}

export async function updateUserUsername(
  oldUsername: SelectUser['username'],
  newUsername: SelectUser['username']
): Promise<void> {
  await db
    .update(users)
    .set({ username: newUsername })
    .where(eq(users.username, oldUsername));
}

export async function updateUserFullName(
  username: SelectUser['username'],
  newFullName: SelectUser['fullName']
): Promise<void> {
  await db
    .update(users)
    .set({ fullName: newFullName })
    .where(eq(users.username, username));
}

export async function updateUserRole(
  username: SelectUser['username'],
  newRole: SelectUser['role']
): Promise<void> {
  await db
    .update(users)
    .set({ role: newRole })
    .where(eq(users.username, username));
}

export async function updateUserPassword(
  username: SelectUser['username'],
  newPassword: string
): Promise<void> {
  const passwordHash: SelectUser['passwordHash'] =
    await hashPassword(newPassword);

  await db
    .update(users)
    .set({ passwordHash })
    .where(eq(users.username, username));
}

export async function resetUserRecoveryCode(
  username: SelectUser['username']
): Promise<SelectUser['recoveryCode']> {
  const recoveryCode: SelectUser['recoveryCode'] = generateRandomRecoveryCode();

  await db
    .update(users)
    .set({ recoveryCode })
    .where(eq(users.username, username));

  return recoveryCode;
}

export async function deleteUser(
  username: SelectUser['username']
): Promise<void> {
  await db.delete(users).where(eq(users.username, username));
}
