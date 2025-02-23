import { pgEnum } from 'drizzle-orm/pg-core';

export const termEnum = pgEnum('term', ['midterm', 'finals']);
