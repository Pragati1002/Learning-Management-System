// SAFE course expansion for RSR LMS.
// Adds missing modules/lessons and module quizzes to existing courses.
// NEVER deletes courses, users, progress, or existing quizzes.
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');

const topicMap = [
  { keys: ['web development', 'full stack', 'html', 'css', 'javascript'], topics: ['HTML5 & Semantic Web', 'CSS Layout & Responsive Design', 'JavaScript & DOM', 'APIs, Git & Deployment'] },
  { keys: ['java'], topics: ['Java Fundamentals', 'Object-Oriented Programming', 'Collections & Exception Handling', 'JDBC, Streams & Modern Java'] },
  { keys: ['python'], topics: ['Python Fundamentals', 'Functions, OOP & Modules', 'NumPy, Pandas & Data Handling', 'APIs, Automation & Projects'] },
  { keys: ['data structures', 'dsa', 'algorithm'], topics: ['Arrays, Strings & Complexity', 'Linked Lists, Stacks & Queues', 'Trees, Heaps & Hashing', 'Graphs, Greedy & Dynamic Programming'] },
  { keys: ['sql', 'mysql', 'database', 'dbms'], topics: ['SQL Fundamentals & Filtering', 'Joins, Aggregation & Subqueries', 'Normalization, Transactions & Indexes', 'Advanced SQL & Query Optimization'] },
  { keys: ['react'], topics: ['React Fundamentals & JSX', 'Components, Props & State', 'Hooks, Routing & Forms', 'APIs, Performance & Deployment'] },
  { keys: ['node', 'express'], topics: ['Node.js Fundamentals', 'Express APIs & Middleware', 'MongoDB & Authentication', 'Testing, Security & Deployment'] },
  { keys: ['mongodb'], topics: ['MongoDB Fundamentals', 'Schema Design & CRUD', 'Indexes, Aggregation & Validation', 'Transactions, Security & Production'] },
  { keys: ['aws', 'cloud'], topics: ['Cloud Fundamentals', 'Compute, Storage & Networking', 'Databases, IAM & Security', 'Serverless, Monitoring & Deployment'] },
  { keys: ['devops', 'docker', 'kubernetes', 'ci/cd'], topics: ['Linux & DevOps Fundamentals', 'Git, Docker & Containers', 'CI/CD & Infrastructure', 'Kubernetes, Monitoring & Reliability'] },
  { keys: ['cyber', 'security'], topics: ['Security Fundamentals', 'Network & Application Security', 'Cryptography & Identity', 'Threat Detection & Incident Response'] },
  { keys: ['machine learning', 'data science', 'ml engineer'], topics: ['Python & Data Preparation', 'Supervised Learning', 'Unsupervised Learning & Evaluation', 'Feature Engineering & Model Deployment'] },
  { keys: ['artificial intelligence', 'deep learning', 'ai'], topics: ['AI & ML Foundations', 'Neural Networks', 'Computer Vision & NLP', 'Model Evaluation & Deployment'] },
  { keys: ['network'], topics: ['Networking Fundamentals', 'OSI, TCP/IP & Routing', 'Subnetting, DNS & DHCP', 'Network Security & Troubleshooting'] },
  { keys: ['linux'], topics: ['Linux Command Line', 'Users, Permissions & Processes', 'Shell Scripting & Automation', 'Networking, Services & Administration'] },
  { keys: ['android', 'mobile'], topics: ['Mobile Development Fundamentals', 'UI, Navigation & State', 'Data Storage & APIs', 'Testing & App Deployment'] },
  { keys: ['ui/ux', 'ux', 'figma'], topics: ['Design Thinking & Research', 'Wireframes & Information Architecture', 'Visual Design & Prototyping', 'Usability, Accessibility & Handoff'] },
  { keys: ['testing', 'qa', 'selenium'], topics: ['Testing Fundamentals', 'Test Cases & API Testing', 'Automation with Selenium', 'CI Testing & Quality Strategy'] },
  { keys: ['c++'], topics: ['C++ Fundamentals', 'OOP & STL', 'Pointers, Memory & Templates', 'Algorithms & Problem Solving'] },
  { keys: ['c#', '.net'], topics: ['C# Fundamentals', 'OOP & Collections', 'LINQ, Async & APIs', 'ASP.NET & Deployment'] },
  { keys: ['php'], topics: ['PHP Fundamentals', 'Forms, Sessions & OOP', 'MySQL & CRUD', 'Security & MVC Applications'] },
  { keys: ['git', 'github'], topics: ['Git Fundamentals', 'Branching & Merging', 'Collaboration & Pull Requests', 'Release, Tags & CI/CD'] },
  { keys: ['aptitude', 'reasoning', 'placement'], topics: ['Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability', 'Data Interpretation & Placement Strategy'] }
];

const genericTopics = ['Core Concepts & Fundamentals', 'Practical Skills & Problem Solving', 'Intermediate Techniques & Best Practices', 'Projects, Assessment & Interview Readiness'];

function topicsFor(course) {
  const text = `${course.title} ${course.category || ''} ${course.description || ''}`.toLowerCase();
  return topicMap.find(x => x.keys.some(k => text.includes(k)))?.topics || genericTopics;
}

function slug(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function makeLessons(course, topic, moduleIndex) {
  const base = [
    `Introduction to ${topic}`,
    `${topic}: Core Concepts`,
    `${topic}: Hands-on Practice`,
    `${topic}: Assessment & Interview Questions`
  ];
  return base.map((title, i) => ({
    lessonId: `${slug(course.title)}-m${moduleIndex + 1}-l${i + 1}`,
    title,
    duration: `${12 + i * 6} min`,
    notes: `${title}. Study the concepts, work through examples, and complete the practice questions before moving to the next lesson.`,
    resources: []
  }));
}

function quizQuestions(topic) {
  return [
    { question: `Which approach is most important when learning ${topic}?`, options: ['Understand concepts and practise them', 'Memorize every answer', 'Skip examples', 'Avoid hands-on work'], correctAnswer: 0 },
    { question: `Which activity best reinforces ${topic}?`, options: ['Only watching videos', 'Solving practical problems', 'Skipping revision', 'Copying notes without practice'], correctAnswer: 1 },
    { question: `Before moving beyond ${topic}, what should a learner do?`, options: ['Attempt the module assessment', 'Skip the exercises', 'Ignore mistakes', 'Start an unrelated topic'], correctAnswer: 0 },
    { question: `What is a good interview-preparation habit for ${topic}?`, options: ['Explain concepts in your own words', 'Memorize definitions only', 'Avoid coding/examples', 'Never review mistakes'], correctAnswer: 0 }
  ];
}

async function run() {
  await connectDB();
  await mongoose.connection.asPromise();
  console.log('Starting SAFE course expansion. Existing data will not be deleted.');

  const courses = await Course.find().exec();
  let addedModules = 0;
  let addedLessons = 0;
  let addedQuizzes = 0;

  for (const course of courses) {
    const topics = topicsFor(course);
    const existingTitles = new Set((course.modules || []).map(m => String(m.title || '').trim().toLowerCase()));

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      if (existingTitles.has(topic.toLowerCase())) continue;

      const lessons = makeLessons(course, topic, i);
      course.modules.push({ moduleId: `${slug(course.title)}-m${i + 1}`, title: topic, lessons });
      addedModules++;
      addedLessons += lessons.length;

      const quizTitle = `${course.title} — ${topic} Practice Quiz`;
      const existingQuiz = await Quiz.findOne({ courseId: course._id, title: quizTitle }).exec();
      if (!existingQuiz) {
        await Quiz.create({
          title: quizTitle,
          courseTitle: course.title,
          courseId: course._id,
          durationMinutes: 10,
          passingScore: 60,
          questions: quizQuestions(topic)
        });
        addedQuizzes++;
      }
    }

    await course.save();
  }

  console.log('\nCOURSE EXPANSION COMPLETE');
  console.log({ totalCourses: courses.length, addedModules, addedLessons, addedQuizzes });
  console.log('Existing courses, users, enrollments and progress were preserved.');
  await mongoose.connection.close();
}

run().catch(err => {
  console.error('Course expansion failed:', err);
  process.exit(1);
});
