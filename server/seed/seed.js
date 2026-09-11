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
  const Assignment = require('../models/Assignment');
  await Promise.all([
    User.deleteMany({}), Course.deleteMany({}), Quiz.deleteMany({}),
    MockTest.deleteMany({}), InterviewTrack.deleteMany({}), Job.deleteMany({}), Placement.deleteMany({}),
    Assignment.deleteMany({})
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

  console.log('Seeding practical assignments...');
  const assignmentDefs = [
    { mockCourseId: 'c_webdev', title: 'Build a Responsive Portfolio Page', description: 'Create a fully responsive personal portfolio using semantic HTML5 and CSS Grid/Flexbox.', dueDate: '2026-10-10' },
    { mockCourseId: 'c_java', title: 'Library Management System (OOP)', description: 'Design a console-based library system demonstrating inheritance, interfaces and encapsulation.', dueDate: '2026-10-12' },
    { mockCourseId: 'c_python', title: 'Data Cleaning Mini-Project', description: 'Clean and analyze a provided CSV dataset using Pandas and summarize insights in a notebook.', dueDate: '2026-10-15' },
    { mockCourseId: 'c_dsa', title: 'Implement a Graph Traversal Visualizer', description: 'Implement BFS and DFS on a graph and visualize the traversal order.', dueDate: '2026-10-18' },
    { mockCourseId: 'c_sql', title: 'Design a Normalized E-Commerce Schema', description: 'Design and submit a normalized (3NF) database schema for a sample e-commerce store.', dueDate: '2026-10-20' },
    { mockCourseId: 'c_aws', title: 'Deploy a Static Site on S3', description: 'Deploy a static website using S3 static website hosting and document the steps taken.', dueDate: '2026-10-22' },
    { mockCourseId: 'c_devops', title: 'Containerize a Node.js App', description: 'Write a Dockerfile and docker-compose setup for a simple Node.js + MongoDB app.', dueDate: '2026-10-25' },
    { mockCourseId: 'c_cyber', title: 'Vulnerability Scan Report', description: 'Run a basic vulnerability scan on a test target using Nmap and submit a findings report.', dueDate: '2026-10-28' },
    { mockCourseId: 'c_ds_ml', title: 'Predictive Model on a Real Dataset', description: 'Train and evaluate a classification model on a provided dataset using scikit-learn.', dueDate: '2026-11-01' },
    { mockCourseId: 'c_android', title: 'Build a Notes App', description: 'Build a simple Android notes app using Jetpack Compose and Room database.', dueDate: '2026-11-03' },
    { mockCourseId: 'c_uiux', title: 'Redesign a Mobile App Screen', description: 'Redesign a chosen app screen in Figma, including a clickable prototype.', dueDate: '2026-11-05' },
    { mockCourseId: 'c_qa_testing', title: 'Automate a Login Test Suite', description: 'Write a Selenium + TestNG automation suite covering positive and negative login scenarios.', dueDate: '2026-11-08' }
  ];
  for (const a of assignmentDefs) {
    const courseId = courseIdMap[a.mockCourseId];
    if (!courseId) continue;
    await Assignment.create({ courseId, title: a.title, description: a.description, dueDate: a.dueDate });
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
    },
    {
      title: 'Python & Data Science Mock Test',
      totalMarks: 35,
      sections: [
        { title: 'Python Core', durationMinutes: 15, questions: [
          { question: 'Which data type is immutable in Python?', options: ['List', 'Dictionary', 'Tuple', 'Set'], correctAnswer: 2 },
          { question: 'What does the len() function return for a string?', options: ['Memory size', 'Number of characters', 'ASCII value', 'Data type'], correctAnswer: 1 }
        ]},
        { title: 'Data Science Basics', durationMinutes: 15, questions: [
          { question: 'Which Pandas method is used to handle missing values by removing them?', options: ['fillna()', 'dropna()', 'isnull()', 'replace()'], correctAnswer: 1 }
        ]}
      ]
    },
    {
      title: 'Cloud Computing (AWS) Mock Test',
      totalMarks: 30,
      sections: [
        { title: 'AWS Fundamentals', durationMinutes: 20, questions: [
          { question: 'Which AWS service is primarily used for object storage?', options: ['EC2', 'S3', 'RDS', 'Lambda'], correctAnswer: 1 },
          { question: 'What does IAM stand for in AWS?', options: ['Internet Access Manager', 'Identity and Access Management', 'Instance Allocation Module', 'Internal Application Manager'], correctAnswer: 1 }
        ]}
      ]
    },
    {
      title: 'DevOps & Docker Mock Test',
      totalMarks: 30,
      sections: [
        { title: 'Docker & Kubernetes', durationMinutes: 20, questions: [
          { question: 'Which file is used to define a Docker image build?', options: ['docker-compose.yml', 'Dockerfile', 'package.json', 'image.config'], correctAnswer: 1 },
          { question: 'In Kubernetes, what is the smallest deployable unit?', options: ['Node', 'Cluster', 'Pod', 'Service'], correctAnswer: 2 }
        ]}
      ]
    },
    {
      title: 'Cybersecurity Fundamentals Mock Test',
      totalMarks: 25,
      sections: [
        { title: 'Security Basics', durationMinutes: 20, questions: [
          { question: 'What does the "C" in the CIA triad stand for?', options: ['Control', 'Confidentiality', 'Compliance', 'Cryptography'], correctAnswer: 1 },
          { question: 'Which attack floods a server with excessive traffic to make it unavailable?', options: ['Phishing', 'SQL Injection', 'DDoS', 'Man-in-the-Middle'], correctAnswer: 2 }
        ]}
      ]
    },
    {
      title: 'Networking Fundamentals Mock Test',
      totalMarks: 20,
      sections: [
        { title: 'Networking Basics', durationMinutes: 15, questions: [
          { question: 'Which layer of the OSI model handles routing?', options: ['Physical', 'Data Link', 'Network', 'Transport'], correctAnswer: 2 },
          { question: 'What is the default subnet mask for a Class C network?', options: ['255.0.0.0', '255.255.0.0', '255.255.255.0', '255.255.255.255'], correctAnswer: 2 }
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
    },
    {
      role: 'Data Scientist / ML Engineer',
      durationMinutes: 30,
      difficulty: 'Medium',
      questions: [
        { question: 'Walk me through your approach to a typical machine learning project.' },
        { question: 'How do you handle overfitting in a model?' },
        { question: 'Explain the difference between supervised and unsupervised learning.' },
        { question: 'How would you evaluate a classification model beyond accuracy?' },
        { question: 'Describe a time you had to clean a messy real-world dataset.' }
      ]
    },
    {
      role: 'DevOps Engineer',
      durationMinutes: 25,
      difficulty: 'Medium',
      questions: [
        { question: 'Walk me through a CI/CD pipeline you have built or would build.' },
        { question: 'What is the difference between a Docker image and a container?' },
        { question: 'How do you manage secrets and configuration across environments?' },
        { question: 'Explain how Kubernetes handles auto-scaling and self-healing.' }
      ]
    },
    {
      role: 'Cybersecurity Analyst',
      durationMinutes: 25,
      difficulty: 'Medium',
      questions: [
        { question: 'Walk me through how you would respond to a reported phishing incident.' },
        { question: 'What is the difference between vulnerability assessment and penetration testing?' },
        { question: 'How would you secure an application against SQL injection?' },
        { question: 'Explain the principle of least privilege.' }
      ]
    },
    {
      role: 'Android Developer',
      durationMinutes: 20,
      difficulty: 'Easy',
      questions: [
        { question: 'What is the Android Activity lifecycle?' },
        { question: 'Explain the difference between a Fragment and an Activity.' },
        { question: 'How do you handle background work in a modern Android app?' }
      ]
    },
    {
      role: 'QA / Test Automation Engineer',
      durationMinutes: 20,
      difficulty: 'Easy',
      questions: [
        { question: 'What is the difference between manual and automated testing, and when would you choose each?' },
        { question: 'How do you design test cases for a login feature?' },
        { question: 'Explain how a Selenium WebDriver script locates and interacts with elements.' }
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
    { title: 'MERN Stack Developer', company: 'Accenture', location: 'Remote', type: 'Full-time', skills: ['MongoDB', 'Express', 'React', 'Node.js'] },
    { title: 'Cloud Support Engineer', company: 'Amazon', location: 'Hyderabad', type: 'Full-time', skills: ['AWS', 'Linux', 'Networking'] },
    { title: 'DevOps Engineer', company: 'Cognizant', location: 'Pune', type: 'Full-time', skills: ['Docker', 'Kubernetes', 'Jenkins'] },
    { title: 'Data Analyst', company: 'Deloitte', location: 'Bangalore', type: 'Full-time', skills: ['Python', 'SQL', 'Power BI'] },
    { title: 'Machine Learning Engineer', company: 'IBM', location: 'Bangalore', type: 'Full-time', skills: ['Python', 'TensorFlow', 'ML'] },
    { title: 'Android Developer', company: 'Paytm', location: 'Noida', type: 'Full-time', skills: ['Kotlin', 'Android SDK'] },
    { title: 'QA Automation Engineer', company: 'HCL Technologies', location: 'Chennai', type: 'Full-time', skills: ['Selenium', 'Java', 'TestNG'] },
    { title: 'Cybersecurity Analyst', company: 'Wipro', location: 'Bangalore', type: 'Full-time', skills: ['Network Security', 'SIEM'] },
    { title: 'UI/UX Designer', company: 'Zomato', location: 'Gurugram', type: 'Full-time', skills: ['Figma', 'Prototyping'] }
  ]);

  console.log('Seeding placement drives...');
  await Placement.insertMany([
    { company: 'TCS', role: 'Full Stack Developer', location: 'Bangalore', package: '4.5 LPA', openings: 10, eligibility: 'BCA/MCA/BTech, 60%+ aggregate', deadline: '2026-10-15', applicants: [] },
    { company: 'Infosys', role: 'Systems Engineer', location: 'Pune', package: '4.0 LPA', openings: 25, eligibility: 'BCA/MCA/BTech, no active backlogs', deadline: '2026-10-20', applicants: [] },
    { company: 'Amazon', role: 'Cloud Support Associate', location: 'Hyderabad', package: '6.5 LPA', openings: 8, eligibility: 'BTech/MCA, strong Linux & networking basics', deadline: '2026-10-25', applicants: [] },
    { company: 'Accenture', role: 'MERN Stack Developer', location: 'Remote', package: '5.2 LPA', openings: 15, eligibility: 'Any IT graduate, MERN stack project experience preferred', deadline: '2026-11-01', applicants: [] },
    { company: 'Cognizant', role: 'DevOps Trainee', location: 'Pune', package: '4.8 LPA', openings: 6, eligibility: 'BTech/MCA, familiarity with Docker/Linux', deadline: '2026-11-05', applicants: [] },
    { company: 'Deloitte', role: 'Data Analyst', location: 'Bangalore', package: '5.5 LPA', openings: 10, eligibility: 'Any graduate with Python/SQL & Data Science course completion', deadline: '2026-11-10', applicants: [] },
    { company: 'HCL Technologies', role: 'QA Automation Engineer', location: 'Chennai', package: '4.2 LPA', openings: 12, eligibility: 'BCA/MCA/BTech, Selenium & Java basics', deadline: '2026-11-15', applicants: [] }
  ]);

  console.log('\nSeed complete!');
  console.log('Login with: admin@lms.com / admin  OR  student@lms.com / student');
  process.exit(0);
};

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});