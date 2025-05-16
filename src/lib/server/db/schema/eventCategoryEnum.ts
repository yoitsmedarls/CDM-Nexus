import { pgEnum } from 'drizzle-orm/pg-core';

export const eventCategoryEnum = pgEnum('event_category', [
  'default',
  'tutoring',
  'course',
]);
