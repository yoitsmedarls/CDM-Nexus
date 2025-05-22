import { pgEnum } from 'drizzle-orm/pg-core';

export const applicationStatusEnum = pgEnum('applicationStatus', [
  'pending',
  'accepted',
  'denied',
]);
