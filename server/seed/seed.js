// Populates a fresh database with demo data mirroring the frontend's mock data.
// Run with: npm run seed  (make sure MONGO_URI in .env is set and reachable first)
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');

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

  console.log('Seeding courses...');
  const fullStack = await Course.create({
    title: 'Full Stack Development',
    category: 'Web Development',
    description: 'Learn to build complete web applications from front to back - HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.',
    duration: '6 Months',
    level: 'Beginner to Advanced',
    instructor: 'Priya Sharma',
    rating: 4.7,
    reviewsCount: 128,
    modules: [
      {
        moduleId: 'm1', title: 'HTML, CSS & JavaScript',
        lessons: [
          { lessonId: 'l1', title: 'HTML Introduction', duration: '45 min', videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE', notes: 'HTML is the standard markup language for creating web pages.' },
          { lessonId: 'l2', title: 'CSS Fundamentals', duration: '50 min', videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc' },
          { lessonId: 'l3', title: 'JavaScript Basics', duration: '60 min', videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk' }
        ]
      },
      {
        moduleId: 'm2', title: 'React JS',
        lessons: [
          { lessonId: 'l4', title: 'React Components & Props', duration: '55 min' },
          { lessonId: 'l5', title: 'State & Hooks', duration: '60 min' }
        ]
      },
      {
        moduleId: 'm3', title: 'Node JS',
        lessons: [
          { lessonId: 'l6', title: 'Node.js Fundamentals', duration: '50 min' }
        ]
      }
    ]
  });

  await Course.create({
    title: 'Java Programming',
    category: 'Programming',
    description: 'Master core Java concepts, OOP principles, and data structures for interview-ready programming skills.',
    duration: '4 Months',
    level: 'Beginner',
    instructor: 'Amit Verma',
    rating: 4.5,
    reviewsCount: 84,
    modules: [
      {
        moduleId: 'jm1', title: 'Java Basics',
        lessons: [
          { lessonId: 'jl1', title: 'Introduction to Java', duration: '40 min' },
          { lessonId: 'jl2', title: 'Variables & Data Types', duration: '35 min' }
        ]
      }
    ]
  });

  console.log('Seeding quizzes...');
  await Quiz.create({
    title: 'HTML Basics Quiz',
    courseTitle: 'Full Stack Development',
    courseId: fullStack._id,
    durationMinutes: 10,
    passingScore: 60,
    questions: [
      { question: 'Which tag is used for the largest heading?', options: ['<h6>', '<heading>', '<h1>', '<h3>'], correctAnswer: 2 },
      { question: 'What does HTML stand for?', options: ['Hyper Trainer Marking Language', 'HyperText Markup Language', 'Hyper Text Marketing Language', 'None'], correctAnswer: 1 }
    ]
  });

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
    { title: 'Node JS Developer', company: 'Tech Mahindra', location: 'Pune', type: 'Full-time', skills: ['Node.js', 'Express', 'MySQL'] }
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
