export * from './schema/courses/courses';
export * from './schema/courses/lectureMaterials';
export * from './schema/courses/lessons';
export * from './schema/courses/questions';
export * from './schema/courses/quizzes';
export * from './schema/courses/topics';

/**
 * Courses - Lessons          : 1-*
 * Lessons - Topics           : 1-*
 * Topics - LectureMaterials  : 1-1
 * Topics - Quizzes           : 1-1
 * Quizzes - Questions        : 1-*
 */
