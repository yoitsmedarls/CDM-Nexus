import { pgEnum } from 'drizzle-orm/pg-core';

export const tutoringSessionStatusEnum = pgEnum('tutoring_session_status', [
  'upcoming',
  'completed',
  'cancelled',
]);
