// Populates a fresh database with demo data mirroring the frontend's mock data.
// Run with: npm run seed  (make sure MONGO_URI in .env is set and reachable first)
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const { SEED_COURSES, SEED_QUIZZES } = require('./Courseseeddata');

const User = require('../models/User');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');
const MockTest = require('../models/MockTest');
const InterviewTrack = require('../models/InterviewTrack');
const Job = require('../models/Job');
const Placement = require('../models/Placement');

const run = async () => {
  await connectDB();
  console.log('Clearing existing data...');
  await Promise.all([
    User.deleteMany({}), Course.deleteMany({}), Quiz.deleteMany({}),
    MockTest.deleteMany({}), InterviewTrack.deleteMany({}), Job.deleteMany({}), Placement.deleteMany({})
  ]);

  console.log('Seeding users...');
  const adminPass = await bcrypt.hash('admin', 10);
  const studentPass = await bcrypt.hash('student', 10);
  await User.create({ name: 'Admin User', email: 'admin@lms.com', passwordHash: adminPass, role: 'admin' });
  const student = await User.create({ name: 'Ramesh Kumar', email: 'student@lms.com', passwordHash: studentPass, role: 'student' });

  console.log(`Seeding ${SEED_COURSES.length} courses (full catalog, matching mockData.js)...`);
  const courseIdMap = {}; // mockId ('c_java') -> real Mongo _id, needed to link quizzes below
  for (const c of SEED_COURSES) {
    const { mockId, ...courseFields } = c;
    const created = await Course.create(courseFields);
    courseIdMap[mockId] = created._id;
  }

  console.log(`Seeding ${SEED_QUIZZES.length} quizzes...`);
  for (const q of SEED_QUIZZES) {
    const { mockCourseId, ...quizFields } = q;
    const courseId = courseIdMap[mockCourseId];
    if (!courseId) {
      console.warn(`  Skipping quiz "${quizFields.title}" - no matching course for "${mockCourseId}"`);
      continue;
    }
    await Quiz.create({ ...quizFields, courseId });
  }

  console.log('Seeding mock tests...');
  await MockTest.create({
    title: 'Aptitude Mock Test 1',
    totalMarks: 50,
    sections: [
      { title: 'Quantitative Aptitude', durationMinutes: 15, questions: [
        { question: 'A train travels 60 km in 45 minutes. What is its speed in km/h?', options: ['70 km/h', '80 km/h', '75 km/h', '90 km/h'], correctAnswer: 1 },
        { question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correctAnswer: 2 }
      ]},
      { title: 'Reasoning Ability', durationMinutes: 15, questions: [
        { question: 'Find the odd one out: Apple, Mango, Carrot, Banana', options: ['Apple', 'Mango', 'Carrot', 'Banana'], correctAnswer: 2 }
      ]},
      { title: 'English Language', durationMinutes: 10, questions: [
        { question: 'Choose the correctly spelled word:', options: ['Recieve', 'Receive', 'Receeve', 'Receve'], correctAnswer: 1 }
      ]},
      { title: 'General Awareness', durationMinutes: 10, questions: [
        { question: 'Which is the capital of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], correctAnswer: 2 }
      ]}
    ]
  });

  console.log('Seeding interview tracks...');
  await InterviewTrack.create({
    role: 'Java Developer',
    questions: [
      { question: 'Tell me about yourself and your experience with Java.' },
      { question: 'What is the difference between == and .equals() in Java?' },
      { question: 'Explain the concept of inheritance with an example.' }
    ]
  });
  await InterviewTrack.create({
    role: 'Full Stack Developer',
    questions: [
      { question: 'Walk me through a recent project you built end-to-end.' },
      { question: 'What is the difference between == and === in JavaScript?' },
      { question: 'How would you optimize a slow-loading React page?' }
    ]
  });

  console.log('Seeding jobs...');
  await Job.insertMany([
    { title: 'Full Stack Developer', company: 'TCS', location: 'Bangalore', type: 'Full-time', skills: ['React', 'Node.js', 'MongoDB'] },
    { title: 'Frontend Developer', company: 'Infosys', location: 'Bangalore', type: 'Full-time', skills: ['React', 'CSS', 'JavaScript'] },
    { title: 'React Developer', company: 'Wipro', location: 'Hyderabad', type: 'Full-time', skills: ['React', 'Redux', 'Tailwind'] },
    { title: 'Node JS Developer', company: 'Tech Mahindra', location: 'Pune', type: 'Full-time', skills: ['Node.js', 'Express', 'MySQL'] },
    { title: 'Junior Software Engineer', company: 'Capgemini', location: 'Bangalore', type: 'Full-time', skills: ['Java', 'Spring Boot', 'SQL'] },
    { title: 'MERN Stack Developer', company: 'Accenture', location: 'Remote', type: 'Full-time', skills: ['MongoDB', 'Express', 'React', 'Node.js'] }
  ]);

  console.log('Seeding placement drives...');
  await Placement.create({
    company: 'TCS', role: 'Full Stack Developer', location: 'Bangalore',
    package: '4.5 LPA', openings: 10, eligibility: 'BCA/MCA/BTech, 60%+ aggregate',
    deadline: '2026-09-30', applicants: []
  });

  console.log('\nSeed complete!');
  console.log('Login with: admin@lms.com / admin  OR  student@lms.com / student');
  process.exit(0);
};

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});