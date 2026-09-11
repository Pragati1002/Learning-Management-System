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
  await MockTest.insertMany([
    {
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
    },
    {
      title: 'Web Development Mock Test',
      totalMarks: 40,
      sections: [
        { title: 'HTML & CSS', durationMinutes: 15, questions: [
          { question: 'Which CSS property controls text size?', options: ['font-style', 'text-size', 'font-size', 'text-style'], correctAnswer: 2 },
          { question: 'Which tag is used to create a hyperlink?', options: ['<link>', '<a>', '<href>', '<url>'], correctAnswer: 1 }
        ]},
        { title: 'JavaScript', durationMinutes: 20, questions: [
          { question: 'Which method converts a JSON string into an object?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'JSON.convert()'], correctAnswer: 0 },
          { question: 'What does "this" refer to in a regular function called as a method?', options: ['The global object', 'The function itself', 'The object the method belongs to', 'undefined'], correctAnswer: 2 }
        ]}
      ]
    },
    {
      title: 'Java Programming Mock Test',
      totalMarks: 30,
      sections: [
        { title: 'Core Java', durationMinutes: 20, questions: [
          { question: 'Which keyword prevents a class from being inherited?', options: ['static', 'final', 'const', 'private'], correctAnswer: 1 },
          { question: 'Which collection does not allow duplicate elements?', options: ['ArrayList', 'LinkedList', 'HashSet', 'Vector'], correctAnswer: 2 }
        ]}
      ]
    },
    {
      title: 'Logical Reasoning & Verbal Ability',
      totalMarks: 25,
      sections: [
        { title: 'Logical Reasoning', durationMinutes: 15, questions: [
          { question: 'If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?', options: ['Yes', 'No', 'Cannot be determined', 'Only sometimes'], correctAnswer: 0 }
        ]},
        { title: 'Verbal Ability', durationMinutes: 10, questions: [
          { question: 'Choose the word most opposite in meaning to "Abundant":', options: ['Plentiful', 'Scarce', 'Ample', 'Excessive'], correctAnswer: 1 }
        ]}
      ]
    }
  ]);

  console.log('Seeding interview tracks...');
  await InterviewTrack.insertMany([
    {
      role: 'Java Developer',
      durationMinutes: 20,
      difficulty: 'Medium',
      questions: [
        { question: 'Tell me about yourself and your experience with Java.' },
        { question: 'What is the difference between == and .equals() in Java?' },
        { question: 'Explain the concept of inheritance with an example.' },
        { question: 'What are the differences between an interface and an abstract class?' },
        { question: 'How does exception handling work in Java?' }
      ]
    },
    {
      role: 'Full Stack Developer',
      durationMinutes: 25,
      difficulty: 'Medium',
      questions: [
        { question: 'Walk me through a recent project you built end-to-end.' },
        { question: 'What is the difference between == and === in JavaScript?' },
        { question: 'How would you optimize a slow-loading React page?' },
        { question: 'Explain how you would design a REST API for a course catalog.' },
        { question: 'What is the difference between SQL and NoSQL databases?' }
      ]
    },
    {
      role: 'Frontend Developer (Entry Level)',
      durationMinutes: 15,
      difficulty: 'Easy',
      questions: [
        { question: 'What is the difference between HTML and HTML5?' },
        { question: 'Explain the CSS box model.' },
        { question: 'What is the difference between let, const, and var?' }
      ]
    },
    {
      role: 'Senior Backend Engineer',
      durationMinutes: 35,
      difficulty: 'Hard',
      questions: [
        { question: 'How would you design a system to handle 1 million concurrent users?' },
        { question: 'Explain database indexing and when it can hurt performance.' },
        { question: 'How do you handle race conditions in a distributed system?' },
        { question: 'Walk me through how you would debug a memory leak in production.' },
        { question: 'What trade-offs would you consider between microservices and a monolith?' }
      ]
    }
  ]);

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