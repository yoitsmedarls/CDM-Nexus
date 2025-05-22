import { db } from '$lib/server/db';

import {
  courses,
  lessons,
  topics,
  lectureMaterials,
  quizzes,
  quizQuestions,
  exams,
  examQuestions,
  type InsertCourse,
  type InsertLesson,
  type InsertTopic,
  type InsertLectureMaterial,
  type InsertQuiz,
  type InsertQuizQuestion,
  type InsertExam,
  type InsertExamQuestion,
} from '$lib/server/db/schema';

import coursesData from './data/courses.json';
import lessonsData from './data/lessons.json';
import topicsData from './data/topics.json';
import lectureMaterialsData from './data/lectureMaterials.json';
import quizzesData from './data/quizzes.json';
import quizQuestionsData from './data/quizQuestions.json';
import examsData from './data/exams.json';
import examQuestionsData from './data/examQuestions.json';

async function seedDatabase(): Promise<void> {
  console.log('Inserting data...');

  console.log('Inserting courses...');
  await db.insert(courses).values(coursesData as InsertCourse[]);

  console.log('Inserting lessons...');
  await db.insert(lessons).values(lessonsData as InsertLesson[]);

  console.log('Inserting topics...');
  await db.insert(topics).values(topicsData as InsertTopic[]);

  console.log('Inserting lecture materials...');
  await db
    .insert(lectureMaterials)
    .values(lectureMaterialsData as InsertLectureMaterial[]);

  console.log('Inserting quizzes...');
  await db.insert(quizzes).values(quizzesData as InsertQuiz[]);

  console.log('Inserting quiz questions...');
  await db
    .insert(quizQuestions)
    .values(quizQuestionsData as InsertQuizQuestion[]);

  console.log('Inserting exams...');
  await db.insert(exams).values(examsData as InsertExam[]);

  console.log('Inserting exam questions...');
  await db
    .insert(examQuestions)
    .values(examQuestionsData as InsertExamQuestion[]);

  return;
}

await seedDatabase().then(() => {
  console.log('Done!');

  process.exit(0);
});
