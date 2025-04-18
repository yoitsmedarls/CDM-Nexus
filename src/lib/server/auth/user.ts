import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users, type SelectUser } from '../db/schema';
import { hashPassword } from './password';
import { generateRandomRecoveryCode } from './utils';

export function verifyFullNameInput(fullName: string): boolean {
  return fullName.length >= 5 && fullName.length <= 255;
}

export function verifyUsernameInput(username: string): boolean {
  return (
    username.length >= 5 &&
    username.length <= 30 &&
    /^[A-Za-z][A-Za-z0-9_]{5,30}$/.test(username)
  );
}

export async function checkUsernameAvailability(
  username: string
): Promise<boolean> {
  const [existingUser]: SelectUser[] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (existingUser) {
    return false;
  }

  return true;
}

export async function checkIfUserExists(username: string): Promise<boolean> {
  const [existingUser]: SelectUser[] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (!existingUser) {
    return false;
  }

  return true;
}

export async function createUser(
  userId: string,
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
      id: userId,
      fullName,
      cdmEmail,
      username,
      passwordHash,
      recoveryCode,
    })
    .returning();

  return user;
}

export async function deleteUser(userId: string): Promise<void> {
  await db.delete(users).where(eq(users.id, userId));
}

export async function updateUserUsername(
  userId: string,
  newUsername: string
): Promise<void> {
  await db
    .update(users)
    .set({ username: newUsername })
    .where(eq(users.id, userId));
}

export async function getUserByUsername(username: string): Promise<SelectUser> {
  const [user]: SelectUser[] = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function getUserByCdmEmail(cdmEmail: string): Promise<SelectUser> {
  const [user]: SelectUser[] = await db
    .select()
    .from(users)
    .where(eq(users.cdmEmail, cdmEmail));

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function updateUserFullName(
  userId: string,
  newFullName: string
): Promise<void> {
  await db
    .update(users)
    .set({ fullName: newFullName })
    .where(eq(users.id, userId));
}

export async function updateUserRole(
  userId: string,
  newRole: SelectUser['role']
): Promise<void> {
  await db.update(users).set({ role: newRole }).where(eq(users.id, userId));
}

export async function updateUserPassword(
  userId: string,
  newPassword: string
): Promise<void> {
  const passwordHash: string = await hashPassword(newPassword);
  await db.update(users).set({ passwordHash }).where(eq(users.id, userId));
}

export async function getUserPasswordHash(userId: string): Promise<string> {
  const [user]: { passwordHash: string }[] = await db
    .select({ passwordHash: users.passwordHash })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new Error('User not found');
  }

  return user.passwordHash;
}

export async function getUserRecoveryCode(userId: string): Promise<string> {
  const [user]: { recoveryCode: string }[] = await db
    .select({ recoveryCode: users.recoveryCode })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) {
    throw new Error('User not found');
  }

  return user.recoveryCode;
}

export async function resetUserRecoveryCode(userId: string): Promise<string> {
  const recoveryCode = generateRandomRecoveryCode();

  await db.update(users).set({ recoveryCode }).where(eq(users.id, userId));

  return recoveryCode;
}
