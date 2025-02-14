export * from './schema/courses';
export * from './schema/lectureMaterials';
export * from './schema/lessons';
export * from './schema/questions';
export * from './schema/quizzes';
export * from './schema/topics';

/**
 * Courses - Lessons          : 1-*
 * Lessons - Topics           : 1-*
 * Topics - LectureMaterials  : 1-1
 * Topics - Quizzes           : 1-1
 * Quizzes - Questions        : 1-*
 */
