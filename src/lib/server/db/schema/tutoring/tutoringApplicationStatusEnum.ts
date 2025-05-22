import { pgEnum } from 'drizzle-orm/pg-core';

export const tutoringApplicationStatusEnum = pgEnum(
  'tutoring_application_status',
  ['pending', 'accepted', 'denied']
);
