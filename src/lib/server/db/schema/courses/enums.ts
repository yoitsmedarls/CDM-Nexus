import { pgEnum } from 'drizzle-orm/pg-core';

export const stateEnum = pgEnum('status', ['ongoing', 'complete']);
export const termEnum = pgEnum('term', ['midterm', 'finals']);
