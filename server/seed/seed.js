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
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const studentEmail = process.env.SEED_STUDENT_EMAIL || 'student@example.com';
  const studentPassword = process.env.SEED_STUDENT_PASSWORD;
  if (!adminEmail || !adminPassword || !studentPassword) {
    throw new Error('Set ADMIN_EMAIL, ADMIN_PASSWORD and SEED_STUDENT_PASSWORD in server/.env before running the seed.');
  }
  const adminPass = await bcrypt.hash(adminPassword, 10);
  const studentPass = await bcrypt.hash(studentPassword, 10);
  await User.create({ name: 'Admin User', email: adminEmail, passwordHash: adminPass, role: 'admin' });
  const student = await User.create({ name: 'Ramesh Kumar', email: studentEmail, passwordHash: studentPass, role: 'student' });

  console.log(`Seeding ${SEED_COURSES.length} courses (full catalog, matching mockData.js)...`);
  const courseIdMap = {}; // mockId ('c_java') -> real Mongo _id, needed to link quizzes below
  for (const c of SEED_COURSES) {
    const { mockId, ...courseFields } = c;
    const created = await Course.create(courseFields);
    courseIdMap[mockId] = created._id;
  }

  // Demo student must be enrolled in ONE course only. Configure the course by
  // title (SEED_STUDENT_COURSE_TITLE) so the demo account does not accidentally
  // receive practice/quizzes from the entire catalog.
  const seedCourseTitle = process.env.SEED_STUDENT_COURSE_TITLE;
  let seedCourse = seedCourseTitle
    ? await Course.findOne({ title: seedCourseTitle })
    : await Course.findOne().sort({ createdAt: 1 });
  if (!seedCourse) throw new Error('No course found for demo student enrollment.');
  student.enrolledCourses = [seedCourse._id];
  await student.save();
  console.log(`Demo student enrolled only in: ${seedCourse.title}`);

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
    { mockCourseId: 'c_qa_testing', title: 'Automate a Login Test Suite', description: 'Write a Selenium + TestNG automation suite covering positive and negative login scenarios.', dueDate: '2026-11-08' },
    { mockCourseId: 'c_reactnative', title: 'Build a Weather App', description: 'Build a cross-platform weather app using React Native and a public weather API.', dueDate: '2026-11-10' },
    { mockCourseId: 'c_mongodb', title: 'Design a Blog API', description: 'Design a MongoDB schema and build CRUD APIs for a simple blogging platform.', dueDate: '2026-11-12' },
    { mockCourseId: 'c_networking', title: 'Subnetting Practice Set', description: 'Solve a set of IP subnetting problems and document your working for each.', dueDate: '2026-11-14' },
    { mockCourseId: 'c_linux', title: 'Set Up a Personal Linux Server', description: 'Set up a basic Linux server with a running Nginx web server and a scheduled cron job.', dueDate: '2026-11-16' },
    { mockCourseId: 'c_csharp', title: 'Build a Console-Based Inventory System', description: 'Build a console app in C# to manage inventory items with add, update and delete operations.', dueDate: '2026-11-18' },
    { mockCourseId: 'c_cpp', title: 'Implement a Custom Linked List Class', description: 'Implement a templated singly linked list class in C++ with insert, delete and search operations.', dueDate: '2026-11-20' },
    { mockCourseId: 'c_php', title: 'Build a Student Result Management System', description: 'Build a PHP + MySQL app to add students, record marks and calculate grades.', dueDate: '2026-11-22' },
    { mockCourseId: 'c_git', title: 'Simulate a Team Git Workflow', description: 'Create a repo, branch, make conflicting changes, and practice resolving a merge conflict.', dueDate: '2026-11-24' },
    { mockCourseId: 'c_ai_dl', title: 'Train an Image Classifier', description: 'Train and evaluate a simple CNN image classifier using TensorFlow/Keras on a small dataset.', dueDate: '2026-11-26' },
    // Second assignment for the most popular courses, so students get more practice.
    { mockCourseId: 'c_webdev', title: 'Build a To-Do List App with Local Storage', description: 'Build a to-do list app using HTML, CSS and JavaScript that persists tasks in local storage.', dueDate: '2026-11-28' },
    { mockCourseId: 'c_java', title: 'Build a Simple Banking System', description: 'Build a console-based banking system with deposit, withdrawal and balance-check features.', dueDate: '2026-11-30' },
    { mockCourseId: 'c_python', title: 'Build a Command-Line Expense Tracker', description: 'Build a Python CLI app that logs expenses to a CSV file and shows monthly summaries.', dueDate: '2026-12-02' },
    { mockCourseId: 'c_sql', title: 'Write Complex Analytical Queries', description: 'Write queries using joins, subqueries and window functions on a provided sales dataset.', dueDate: '2026-12-04' },
    { mockCourseId: 'c_devops', title: 'Build a Complete CI/CD Pipeline', description: 'Set up a GitHub Actions pipeline that builds, tests and deploys a sample app on every push.', dueDate: '2026-12-06' },
    { mockCourseId: 'c_ds_ml', title: 'End-to-End ML Project with Deployment', description: 'Train a model, evaluate it, and deploy it behind a simple Flask API endpoint.', dueDate: '2026-12-08' }
  ];
  for (const a of assignmentDefs) {
    const courseId = courseIdMap[a.mockCourseId];
    if (!courseId) continue;
    await Assignment.create({ courseId, title: a.title, description: a.description, dueDate: a.dueDate });
  }

  console.log('Seeding mock tests...');
  await MockTest.insertMany([
  {
    "title": "Aptitude Mock Test 1",
    "totalMarks": 50,
    "sections": [
      {
        "title": "Quantitative Aptitude",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "A train travels 60 km in 45 minutes. What is its speed in km/h?",
            "options": [
              "70 km/h",
              "80 km/h",
              "75 km/h",
              "90 km/h"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What is 15% of 200?",
            "options": [
              "20",
              "25",
              "30",
              "35"
            ],
            "correctAnswer": 2
          },
          {
            "question": "If the ratio of two numbers is 3:4 and their sum is 63, what is the larger number?",
            "options": [
              "27",
              "30",
              "36",
              "32"
            ],
            "correctAnswer": 2
          },
          {
            "question": "A shopkeeper marks an item 25% above cost price and gives a 10% discount. What is his profit percentage?",
            "options": [
              "10%",
              "12.5%",
              "15%",
              "20%"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "title": "Reasoning Ability",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "Find the odd one out: Apple, Mango, Carrot, Banana",
            "options": [
              "Apple",
              "Mango",
              "Carrot",
              "Banana"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Complete the series: 2, 6, 12, 20, 30, ?",
            "options": [
              "36",
              "40",
              "42",
              "38"
            ],
            "correctAnswer": 2
          },
          {
            "question": "If \"CAT\" is coded as \"DBU\", how is \"DOG\" coded?",
            "options": [
              "EPH",
              "EPI",
              "FPH",
              "EOI"
            ],
            "correctAnswer": 0
          }
        ]
      },
      {
        "title": "English Language",
        "durationMinutes": 10,
        "questions": [
          {
            "question": "Choose the correctly spelled word:",
            "options": [
              "Recieve",
              "Receive",
              "Receeve",
              "Receve"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Choose the synonym of \"Meticulous\":",
            "options": [
              "Careless",
              "Careful",
              "Quick",
              "Loud"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Identify the correctly punctuated sentence:",
            "options": [
              "Its a nice day isnt it",
              "It's a nice day, isn't it?",
              "Its a nice day, isnt it",
              "It is a nice day isn't, it"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "title": "General Awareness",
        "durationMinutes": 10,
        "questions": [
          {
            "question": "Which is the capital of India?",
            "options": [
              "Mumbai",
              "Kolkata",
              "New Delhi",
              "Chennai"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Who is known as the Father of the Indian Constitution?",
            "options": [
              "Mahatma Gandhi",
              "B. R. Ambedkar",
              "Jawaharlal Nehru",
              "Sardar Patel"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "Aptitude Mock Test 2 (Advanced)",
    "totalMarks": 40,
    "sections": [
      {
        "title": "Quantitative Aptitude",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "A can complete a work in 12 days and B in 18 days. In how many days will they finish it together?",
            "options": [
              "6 days",
              "7.2 days",
              "8 days",
              "9 days"
            ],
            "correctAnswer": 1
          },
          {
            "question": "The average of 5 numbers is 20. If one number is removed, the average becomes 18. What was the removed number?",
            "options": [
              "24",
              "26",
              "28",
              "30"
            ],
            "correctAnswer": 2
          },
          {
            "question": "A sum of money doubles itself in 8 years at simple interest. What is the rate of interest?",
            "options": [
              "10%",
              "12.5%",
              "15%",
              "8%"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "title": "Data Interpretation",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "If a pie chart shows IT sector at 40% of a total of 500 employees, how many employees work in IT?",
            "options": [
              "150",
              "180",
              "200",
              "220"
            ],
            "correctAnswer": 2
          },
          {
            "question": "If sales grew from 200 to 250 units, what is the percentage growth?",
            "options": [
              "20%",
              "25%",
              "30%",
              "15%"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "Web Development Mock Test",
    "totalMarks": 40,
    "sections": [
      {
        "title": "HTML & CSS",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "Which CSS property controls text size?",
            "options": [
              "font-style",
              "text-size",
              "font-size",
              "text-style"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Which tag is used to create a hyperlink?",
            "options": [
              "<link>",
              "<a>",
              "<href>",
              "<url>"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which CSS layout model is best for one-dimensional alignment?",
            "options": [
              "Grid",
              "Flexbox",
              "Float",
              "Table"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which HTML tag is used to embed an image?",
            "options": [
              "<image>",
              "<img>",
              "<pic>",
              "<src>"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "title": "JavaScript",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "Which method converts a JSON string into an object?",
            "options": [
              "JSON.parse()",
              "JSON.stringify()",
              "JSON.toObject()",
              "JSON.convert()"
            ],
            "correctAnswer": 0
          },
          {
            "question": "What does \"this\" refer to in a regular function called as a method?",
            "options": [
              "The global object",
              "The function itself",
              "The object the method belongs to",
              "undefined"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Which array method creates a new array with the results of calling a function on every element?",
            "options": [
              "forEach()",
              "map()",
              "filter()",
              "reduce()"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What does \"===\" check in JavaScript that \"==\" does not?",
            "options": [
              "Nothing extra",
              "Value only",
              "Value and type",
              "Type only"
            ],
            "correctAnswer": 2
          }
        ]
      },
      {
        "title": "React Basics",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "Which Hook is used to perform side effects in a React component?",
            "options": [
              "useState",
              "useEffect",
              "useMemo",
              "useRef"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What is passed to a React component to make it dynamic?",
            "options": [
              "Props",
              "Templates",
              "Styles",
              "Modules"
            ],
            "correctAnswer": 0
          }
        ]
      }
    ]
  },
  {
    "title": "Java Programming Mock Test",
    "totalMarks": 40,
    "sections": [
      {
        "title": "Core Java",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "Which keyword prevents a class from being inherited?",
            "options": [
              "static",
              "final",
              "const",
              "private"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which collection does not allow duplicate elements?",
            "options": [
              "ArrayList",
              "LinkedList",
              "HashSet",
              "Vector"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Which of these is not a Java access modifier?",
            "options": [
              "public",
              "private",
              "protected",
              "internal"
            ],
            "correctAnswer": 3
          },
          {
            "question": "What is the size of an int in Java?",
            "options": [
              "16-bit",
              "32-bit",
              "64-bit",
              "Platform dependent"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "title": "OOP Concepts",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "Which OOP principle allows a subclass to provide its own implementation of a method?",
            "options": [
              "Encapsulation",
              "Abstraction",
              "Overriding",
              "Overloading"
            ],
            "correctAnswer": 2
          },
          {
            "question": "What is used to achieve multiple inheritance in Java?",
            "options": [
              "Multiple classes",
              "Interfaces",
              "Abstract classes",
              "Packages"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "Logical Reasoning & Verbal Ability",
    "totalMarks": 30,
    "sections": [
      {
        "title": "Logical Reasoning",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
            "options": [
              "Yes",
              "No",
              "Cannot be determined",
              "Only sometimes"
            ],
            "correctAnswer": 0
          },
          {
            "question": "Find the next number: 3, 9, 27, 81, ?",
            "options": [
              "162",
              "243",
              "216",
              "324"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Pointing to a photo, Ravi said: She is the daughter of my grandfathers only son. Who is she to Ravi?",
            "options": [
              "Sister",
              "Cousin",
              "Aunt",
              "Niece"
            ],
            "correctAnswer": 0
          }
        ]
      },
      {
        "title": "Verbal Ability",
        "durationMinutes": 10,
        "questions": [
          {
            "question": "Choose the word most opposite in meaning to \"Abundant\":",
            "options": [
              "Plentiful",
              "Scarce",
              "Ample",
              "Excessive"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Fill in the blank: She has been working here ___ 2019.",
            "options": [
              "for",
              "since",
              "from",
              "at"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "Python & Data Science Mock Test",
    "totalMarks": 40,
    "sections": [
      {
        "title": "Python Core",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "Which data type is immutable in Python?",
            "options": [
              "List",
              "Dictionary",
              "Tuple",
              "Set"
            ],
            "correctAnswer": 2
          },
          {
            "question": "What does the len() function return for a string?",
            "options": [
              "Memory size",
              "Number of characters",
              "ASCII value",
              "Data type"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which keyword is used to define a function in Python?",
            "options": [
              "function",
              "def",
              "func",
              "lambda"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What is the output of 3 // 2 in Python?",
            "options": [
              "1.5",
              "1",
              "2",
              "0"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "title": "Data Science Basics",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "Which Pandas method is used to handle missing values by removing them?",
            "options": [
              "fillna()",
              "dropna()",
              "isnull()",
              "replace()"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which NumPy function creates an array of evenly spaced values?",
            "options": [
              "np.range()",
              "np.arange()",
              "np.linspace_range()",
              "np.array_range()"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which metric is commonly used to evaluate regression models?",
            "options": [
              "Accuracy",
              "F1 Score",
              "Mean Squared Error",
              "Precision"
            ],
            "correctAnswer": 2
          }
        ]
      }
    ]
  },
  {
    "title": "Cloud Computing (AWS) Mock Test",
    "totalMarks": 30,
    "sections": [
      {
        "title": "AWS Fundamentals",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "Which AWS service is primarily used for object storage?",
            "options": [
              "EC2",
              "S3",
              "RDS",
              "Lambda"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What does IAM stand for in AWS?",
            "options": [
              "Internet Access Manager",
              "Identity and Access Management",
              "Instance Allocation Module",
              "Internal Application Manager"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which AWS service is a managed relational database?",
            "options": [
              "S3",
              "RDS",
              "EC2",
              "Route 53"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What is the purpose of an AWS Auto Scaling Group?",
            "options": [
              "Store files",
              "Automatically adjust EC2 instance count based on demand",
              "Manage DNS",
              "Send emails"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "DevOps & Docker Mock Test",
    "totalMarks": 30,
    "sections": [
      {
        "title": "Docker & Kubernetes",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "Which file is used to define a Docker image build?",
            "options": [
              "docker-compose.yml",
              "Dockerfile",
              "package.json",
              "image.config"
            ],
            "correctAnswer": 1
          },
          {
            "question": "In Kubernetes, what is the smallest deployable unit?",
            "options": [
              "Node",
              "Cluster",
              "Pod",
              "Service"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Which command lists running Docker containers?",
            "options": [
              "docker list",
              "docker ps",
              "docker show",
              "docker containers"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What does CI/CD automate in a DevOps pipeline?",
            "options": [
              "Only testing",
              "Building, testing and deploying code",
              "Only deployment",
              "Only code review"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "Cybersecurity Fundamentals Mock Test",
    "totalMarks": 30,
    "sections": [
      {
        "title": "Security Basics",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "What does the \"C\" in the CIA triad stand for?",
            "options": [
              "Control",
              "Confidentiality",
              "Compliance",
              "Cryptography"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which attack floods a server with excessive traffic to make it unavailable?",
            "options": [
              "Phishing",
              "SQL Injection",
              "DDoS",
              "Man-in-the-Middle"
            ],
            "correctAnswer": 2
          },
          {
            "question": "What is \"phishing\"?",
            "options": [
              "A type of firewall",
              "Tricking users into revealing sensitive information",
              "A type of encryption",
              "A network protocol"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What does a firewall primarily do?",
            "options": [
              "Encrypts files",
              "Filters network traffic based on rules",
              "Backs up data",
              "Speeds up internet"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "Networking Fundamentals Mock Test",
    "totalMarks": 25,
    "sections": [
      {
        "title": "Networking Basics",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "Which layer of the OSI model handles routing?",
            "options": [
              "Physical",
              "Data Link",
              "Network",
              "Transport"
            ],
            "correctAnswer": 2
          },
          {
            "question": "What is the default subnet mask for a Class C network?",
            "options": [
              "255.0.0.0",
              "255.255.0.0",
              "255.255.255.0",
              "255.255.255.255"
            ],
            "correctAnswer": 2
          },
          {
            "question": "What does DNS primarily do?",
            "options": [
              "Assigns IP addresses",
              "Translates domain names to IP addresses",
              "Encrypts traffic",
              "Routes packets"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which protocol is used to securely transfer web pages?",
            "options": [
              "HTTP",
              "FTP",
              "HTTPS",
              "SMTP"
            ],
            "correctAnswer": 2
          }
        ]
      }
    ]
  },
  {
    "title": "Mobile App Development Mock Test",
    "totalMarks": 25,
    "sections": [
      {
        "title": "Android & React Native",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "Which language is officially preferred for modern Android development?",
            "options": [
              "Java only",
              "Kotlin",
              "Swift",
              "C#"
            ],
            "correctAnswer": 1
          },
          {
            "question": "React Native lets you build apps for which platforms from one codebase?",
            "options": [
              "iOS only",
              "Android only",
              "iOS and Android",
              "Windows only"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Which Android component manages a single screen with a user interface?",
            "options": [
              "Service",
              "Activity",
              "Broadcast Receiver",
              "Content Provider"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "UI/UX Design Mock Test",
    "totalMarks": 20,
    "sections": [
      {
        "title": "Design Fundamentals",
        "durationMinutes": 15,
        "questions": [
          {
            "question": "What is the main purpose of a wireframe?",
            "options": [
              "Final visual design",
              "Basic structural layout of a screen",
              "Marketing material",
              "Database schema"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What does \"usability testing\" primarily measure?",
            "options": [
              "Server performance",
              "How easily users can use a product",
              "Code quality",
              "Network speed"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  },
  {
    "title": "Data Structures & Algorithms Mock Test",
    "totalMarks": 35,
    "sections": [
      {
        "title": "DSA Concepts",
        "durationMinutes": 25,
        "questions": [
          {
            "question": "What is the time complexity of binary search on a sorted array?",
            "options": [
              "O(n)",
              "O(log n)",
              "O(n log n)",
              "O(1)"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which data structure uses FIFO order?",
            "options": [
              "Stack",
              "Queue",
              "Tree",
              "Graph"
            ],
            "correctAnswer": 1
          },
          {
            "question": "What is the worst-case time complexity of Quick Sort?",
            "options": [
              "O(n log n)",
              "O(n)",
              "O(n^2)",
              "O(log n)"
            ],
            "correctAnswer": 2
          },
          {
            "question": "Which traversal is used to get elements in sorted order from a BST?",
            "options": [
              "Preorder",
              "Postorder",
              "Inorder",
              "Level order"
            ],
            "correctAnswer": 2
          }
        ]
      }
    ]
  },
  {
    "title": "SQL & Database Mock Test",
    "totalMarks": 30,
    "sections": [
      {
        "title": "SQL Concepts",
        "durationMinutes": 20,
        "questions": [
          {
            "question": "Which SQL clause is used to filter grouped results?",
            "options": [
              "WHERE",
              "HAVING",
              "GROUP BY",
              "FILTER"
            ],
            "correctAnswer": 1
          },
          {
            "question": "Which type of join returns all rows from both tables, matched or not?",
            "options": [
              "INNER JOIN",
              "LEFT JOIN",
              "FULL OUTER JOIN",
              "CROSS JOIN"
            ],
            "correctAnswer": 2
          },
          {
            "question": "What does ACID stand for in database transactions?",
            "options": [
              "Atomicity, Consistency, Isolation, Durability",
              "Access, Control, Identity, Data",
              "Aggregate, Combine, Index, Delete",
              "None of these"
            ],
            "correctAnswer": 0
          },
          {
            "question": "Which command removes all rows from a table but keeps its structure?",
            "options": [
              "DELETE",
              "DROP",
              "TRUNCATE",
              "REMOVE"
            ],
            "correctAnswer": 2
          }
        ]
      }
    ]
  }
]);

  console.log('Seeding interview tracks...');
  await InterviewTrack.insertMany([
  {
    "role": "Java Developer",
    "durationMinutes": 20,
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What is the difference between JDK, JRE and JVM?"
      },
      {
        "question": "Explain the concept of method overloading with an example."
      },
      {
        "question": "What is the difference between an abstract class and an interface?"
      }
    ]
  },
  {
    "role": "Full Stack Developer",
    "durationMinutes": 30,
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Walk me through how data flows from the frontend to the database in a typical MERN app."
      },
      {
        "question": "How do you handle authentication and authorization in a full stack application?"
      },
      {
        "question": "What is the difference between REST and GraphQL APIs?"
      },
      {
        "question": "How would you optimize a slow-loading web page?"
      }
    ]
  },
  {
    "role": "Frontend Developer",
    "durationMinutes": 20,
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What is the Virtual DOM and why does React use it?"
      },
      {
        "question": "Explain the difference between props and state in React."
      },
      {
        "question": "How do you make a website responsive across screen sizes?"
      }
    ]
  },
  {
    "role": "Senior Backend Engineer",
    "durationMinutes": 35,
    "difficulty": "Hard",
    "questions": [
      {
        "question": "How would you design a system to handle 1 million concurrent users?"
      },
      {
        "question": "Explain database indexing and when it can hurt performance."
      },
      {
        "question": "How do you handle race conditions in a distributed system?"
      },
      {
        "question": "Walk me through how you would debug a memory leak in production."
      },
      {
        "question": "What trade-offs would you consider between microservices and a monolith?"
      }
    ]
  },
  {
    "role": "Data Scientist / ML Engineer",
    "durationMinutes": 30,
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Walk me through your approach to a typical machine learning project."
      },
      {
        "question": "How do you handle overfitting in a model?"
      },
      {
        "question": "Explain the difference between supervised and unsupervised learning."
      },
      {
        "question": "How would you evaluate a classification model beyond accuracy?"
      },
      {
        "question": "Describe a time you had to clean a messy real-world dataset."
      }
    ]
  },
  {
    "role": "DevOps Engineer",
    "durationMinutes": 25,
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Walk me through a CI/CD pipeline you have built or would build."
      },
      {
        "question": "What is the difference between a Docker image and a container?"
      },
      {
        "question": "How do you manage secrets and configuration across environments?"
      },
      {
        "question": "Explain how Kubernetes handles auto-scaling and self-healing."
      }
    ]
  },
  {
    "role": "Cybersecurity Analyst",
    "durationMinutes": 25,
    "difficulty": "Medium",
    "questions": [
      {
        "question": "Walk me through how you would respond to a reported phishing incident."
      },
      {
        "question": "What is the difference between vulnerability assessment and penetration testing?"
      },
      {
        "question": "How would you secure an application against SQL injection?"
      },
      {
        "question": "Explain the principle of least privilege."
      }
    ]
  },
  {
    "role": "Android Developer",
    "durationMinutes": 20,
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What is the Android Activity lifecycle?"
      },
      {
        "question": "Explain the difference between a Fragment and an Activity."
      },
      {
        "question": "How do you handle background work in a modern Android app?"
      }
    ]
  },
  {
    "role": "QA / Test Automation Engineer",
    "durationMinutes": 20,
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What is the difference between manual and automated testing, and when would you choose each?"
      },
      {
        "question": "How do you design test cases for a login feature?"
      },
      {
        "question": "Explain how a Selenium WebDriver script locates and interacts with elements."
      }
    ]
  },
  {
    "role": "UI/UX Designer",
    "durationMinutes": 20,
    "difficulty": "Easy",
    "questions": [
      {
        "question": "Walk me through your design process from research to a final prototype."
      },
      {
        "question": "How do you decide between usability and visual appeal when they conflict?"
      },
      {
        "question": "How do you incorporate accessibility into your designs?"
      }
    ]
  },
  {
    "role": "Database Administrator",
    "durationMinutes": 25,
    "difficulty": "Medium",
    "questions": [
      {
        "question": "How would you design a schema for a high-traffic e-commerce application?"
      },
      {
        "question": "Explain the difference between SQL and NoSQL databases and when to use each."
      },
      {
        "question": "How do you approach optimizing a slow-running query?"
      }
    ]
  },
  {
    "role": "Cloud Engineer (AWS)",
    "durationMinutes": 25,
    "difficulty": "Medium",
    "questions": [
      {
        "question": "How would you design a highly available architecture on AWS?"
      },
      {
        "question": "What is the difference between horizontal and vertical scaling?"
      },
      {
        "question": "How do you secure sensitive data and credentials in the cloud?"
      }
    ]
  },
  {
    "role": "React Native Developer",
    "durationMinutes": 20,
    "difficulty": "Easy",
    "questions": [
      {
        "question": "What are the key differences between React and React Native?"
      },
      {
        "question": "How do you handle navigation in a React Native app?"
      },
      {
        "question": "How would you access a device feature like the camera or GPS?"
      }
    ]
  },
  {
    "role": "HR / Behavioral Round",
    "durationMinutes": 15,
    "difficulty": "Easy",
    "questions": [
      {
        "question": "Tell me about yourself and your career goals."
      },
      {
        "question": "Describe a time you faced a conflict in a team and how you resolved it."
      },
      {
        "question": "Why do you want to work with our company?"
      },
      {
        "question": "Where do you see yourself in five years?"
      }
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
    { company: 'HCL Technologies', role: 'QA Automation Engineer', location: 'Chennai', package: '4.2 LPA', openings: 12, eligibility: 'BCA/MCA/BTech, Selenium & Java basics', deadline: '2026-11-15', applicants: [] },
    { company: 'IBM', role: 'Machine Learning Engineer', location: 'Bangalore', package: '7.0 LPA', openings: 5, eligibility: 'BTech/MCA, completed Data Science & ML course', deadline: '2026-11-18', applicants: [] },
    { company: 'Wipro', role: 'Cybersecurity Analyst', location: 'Bangalore', package: '5.0 LPA', openings: 8, eligibility: 'BCA/MCA/BTech, Cybersecurity course completion preferred', deadline: '2026-11-20', applicants: [] },
    { company: 'Paytm', role: 'Android Developer', location: 'Noida', package: '6.0 LPA', openings: 6, eligibility: 'BTech/MCA, Kotlin/Android project experience', deadline: '2026-11-22', applicants: [] },
    { company: 'Zomato', role: 'UI/UX Designer', location: 'Gurugram', package: '5.8 LPA', openings: 4, eligibility: 'Any graduate, strong Figma portfolio', deadline: '2026-11-25', applicants: [] },
    { company: 'Tech Mahindra', role: 'Network Engineer', location: 'Hyderabad', package: '4.3 LPA', openings: 10, eligibility: 'BCA/MCA/BTech, Networking Fundamentals course completion', deadline: '2026-11-28', applicants: [] },
    { company: 'Capgemini', role: 'Java Backend Developer', location: 'Bangalore', package: '4.6 LPA', openings: 20, eligibility: 'BCA/MCA/BTech, Core Java & SQL', deadline: '2026-12-01', applicants: [] },
    { company: 'Oracle', role: 'Database Administrator', location: 'Hyderabad', package: '6.2 LPA', openings: 5, eligibility: 'BTech/MCA, strong SQL/MongoDB fundamentals', deadline: '2026-12-05', applicants: [] },
    { company: 'Zoho', role: 'React Native Developer', location: 'Chennai', package: '5.5 LPA', openings: 5, eligibility: 'Any IT graduate, mobile app project experience', deadline: '2026-12-10', applicants: [] }
  ]);

  console.log('\nSeed complete!');
  console.log(`Seed complete. Admin login email: ${adminEmail}`);
  process.exit(0);
};

run().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});