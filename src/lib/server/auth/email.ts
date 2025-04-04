import { eq } from 'drizzle-orm';
import { db } from '../db';
import { users, type SelectUser } from '../db/schema';

export function verifyEmailInput(cdmEmail: string): boolean {
  return /^[A-Za-z0-9.]+(@cdm.edu.ph)$/.test(cdmEmail) && cdmEmail.length < 256;
}

export async function checkEmailAvailability(
  cdmEmail: string
): Promise<boolean> {
  const [existingUser]: SelectUser[] = await db
    .select()
    .from(users)
    .where(eq(users.cdmEmail, cdmEmail));

  if (existingUser) {
    return false;
  }

  return true;
}
