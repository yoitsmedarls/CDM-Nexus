import { pgEnum } from 'drizzle-orm/pg-core';

export const availabilityEnum = pgEnum('availability', [
  'unset',
  'unavailable',
  'available',
]);
