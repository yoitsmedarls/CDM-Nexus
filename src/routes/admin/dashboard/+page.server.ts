import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { count, eq } from 'drizzle-orm';
import { courses, users } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
  const { ...user } = event.locals.user;

  const [courseList] = await db.select({ count: count() }).from(courses);
  const [studentsList] = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.role, 'student'));
  const [tutorsList] = await db
    .select({ count: count() })
    .from(users)
    .where(eq(users.role, 'tutor'));
  const visitsList = await db.select({ visits: courses.visits }).from(courses);
  let totalVisits = 0;

  visitsList.forEach((element) => {
    totalVisits += element.visits;
  });

  return {
    user: {
      username: user.username,
      cdmEmail: user.cdmEmail,
    },
    coursesCount: courseList.count,
    studentsCount: studentsList.count,
    tutorsCount: tutorsList.count,
    visitsCount: totalVisits,
  };
};
