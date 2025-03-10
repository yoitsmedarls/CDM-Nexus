import { pgEnum } from 'drizzle-orm/pg-core';

export const stateEnum = pgEnum('status', ['ongoing', 'complete']);
