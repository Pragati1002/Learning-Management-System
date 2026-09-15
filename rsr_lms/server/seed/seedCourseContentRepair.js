// SAFE COURSE CONTENT REPAIR for RSR LMS
// ------------------------------------------------------------
// Fixes the generated expansion content so different courses
// have different, course-appropriate modules, lessons, notes,
// videos and practice quizzes.
//
// IMPORTANT:
// - NEVER deletes courses.
// - NEVER deletes users.
// - NEVER deletes enrollments.
// - NEVER deletes completed lessons.
// - NEVER deletes existing quizzes.
// - Preserves existing generated lesson IDs whenever possible.
// - Only repairs modules whose moduleId starts with "exp_".
// ------------------------------------------------------------

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');

const VIDEO_POOLS = {
  web: [
    'https://www.youtube.com/embed/kUMe1FH4CHE',
    'https://www.youtube.com/embed/fYq5PXgSsbE',
    'https://www.youtube.com/embed/PoRJizFvM7s',
    'https://www.youtube.com/embed/w7ejDZ8SWv8'
  ],
  javascript: [
    'https://www.youtube.com/embed/PkZNo7MFNFg',
    'https://www.youtube.com/embed/PoRJizFvM7s',
    'https://www.youtube.com/embed/fYq5PXgSsbE',
    'https://www.youtube.com/embed/w7ejDZ8SWv8'
  ],
  react: [
    'https://www.youtube.com/embed/w7ejDZ8SWv8',
    'https://www.youtube.com/embed/Ke90Tje7VS0',
    'https://www.youtube.com/embed/RVFAyFWO4go',
    'https://www.youtube.com/embed/SqcY0GlETPk'
  ],
  java: [
    'https://www.youtube.com/embed/eIrMbAQSU34',
    'https://www.youtube.com/embed/eIrMbAQSU34',
    'https://www.youtube.com/embed/eIrMbAQSU34',
    'https://www.youtube.com/embed/eIrMbAQSU34'
  ],
  python: [
    'https://www.youtube.com/embed/kqtD5dpn9C8',
    'https://www.youtube.com/embed/QUT1VHiLmmI',
    'https://www.youtube.com/embed/rfscVS0vtbw',
    'https://www.youtube.com/embed/_uQrJ0TkZlc'
  ],
  cpp: [
    'https://www.youtube.com/embed/vLnPwxZdW4Y',
    'https://www.youtube.com/embed/vLnPwxZdW4Y',
    'https://www.youtube.com/embed/vLnPwxZdW4Y',
    'https://www.youtube.com/embed/vLnPwxZdW4Y'
  ],
  sql: [
    'https://www.youtube.com/embed/HXV3zeQKqGY',
    'https://www.youtube.com/embed/HXV3zeQKqGY',
    'https://www.youtube.com/embed/HXV3zeQKqGY',
    'https://www.youtube.com/embed/HXV3zeQKqGY'
  ],
  mongodb: [
    'https://www.youtube.com/embed/c2M-rlkkT5o',
    'https://www.youtube.com/embed/c2M-rlkkT5o',
    'https://www.youtube.com/embed/c2M-rlkkT5o',
    'https://www.youtube.com/embed/c2M-rlkkT5o'
  ],
  git: [
    'https://www.youtube.com/embed/RGOj5yH7evk',
    'https://www.youtube.com/embed/RGOj5yH7evk',
    'https://www.youtube.com/embed/RGOj5yH7evk',
    'https://www.youtube.com/embed/RGOj5yH7evk'
  ],
  cloud: [
    'https://www.youtube.com/embed/ulprqHHWlng',
    'https://www.youtube.com/embed/HXV3zeQKqGY',
    'https://www.youtube.com/embed/Mo4vesaut8g',
    'https://www.youtube.com/embed/OK_JCtrrv-c'
  ],
  devops: [
    'https://www.youtube.com/embed/PoRJizFvM7s',
    'https://www.youtube.com/embed/QUT1VHiLmmI',
    'https://www.youtube.com/embed/RGOj5yH7evk',
    'https://www.youtube.com/embed/eIrMbAQSU34'
  ],
  cyber: [
    'https://www.youtube.com/embed/inWWhr5tnEA',
    'https://www.youtube.com/embed/qiQR5rTSshw',
    'https://www.youtube.com/embed/3Kq1MIfTWCE',
    'https://www.youtube.com/embed/2_lsz5xW3FQ'
  ],
  ml: [
    'https://www.youtube.com/embed/aircAruvnKk',
    'https://www.youtube.com/embed/GwIo3gDZCVQ',
    'https://www.youtube.com/embed/ukzFI9rgwfU',
    'https://www.youtube.com/embed/7eh4d6sabA0'
  ],
  ai: [
    'https://www.youtube.com/embed/aircAruvnKk',
    'https://www.youtube.com/embed/i_LwzRVP7bg',
    'https://www.youtube.com/embed/6Z8bX2Yv9hI',
    'https://www.youtube.com/embed/1F7H8eN3f0E'
  ],
  llm: [
    'https://www.youtube.com/embed/zjkBMFhNj_g',
    'https://www.youtube.com/embed/PeMlggyqz0Y',
    'https://www.youtube.com/embed/kCc8FmEb1nY',
    'https://www.youtube.com/embed/aywZrzNaKjs'
  ],
  android: [
    'https://www.youtube.com/embed/fis26HvvDII',
    'https://www.youtube.com/embed/BBWyXo-3JGQ',
    'https://www.youtube.com/embed/6P20npkvcb8',
    'https://www.youtube.com/embed/Iz08OTTjRQo'
  ],
  uiux: [
    'https://www.youtube.com/embed/c9Wg6Cb_YlU',
    'https://www.youtube.com/embed/7kB4F7R8a7A',
    'https://www.youtube.com/embed/5a1Jb7f3hQw',
    'https://www.youtube.com/embed/8w8e8q2k2mQ'
  ],
  networking: [
    'https://www.youtube.com/embed/qiQR5rTSshw',
    'https://www.youtube.com/embed/3QhU9jd03a0',
    'https://www.youtube.com/embed/7eJexJVCqJo',
    'https://www.youtube.com/embed/2ZxjTiZ7J5A'
  ],
  linux: [
    'https://www.youtube.com/embed/sWbUDq4S6Y8',
    'https://www.youtube.com/embed/IVquJh3DXUA',
    'https://www.youtube.com/embed/ZtqBQ68cfJc',
    'https://www.youtube.com/embed/VbEx7B_PTOE'
  ],
  testing: [
    'https://www.youtube.com/embed/FRn5J31eAMw',
    'https://www.youtube.com/embed/3Xx83Ja4O3k',
    'https://www.youtube.com/embed/Ed5w7g8h6Yc',
    'https://www.youtube.com/embed/5Xq3Q9K9xQ0'
  ],
  generic: []
};

// IMPORTANT: specific courses/topics are checked BEFORE broad words
// such as "database", "ai", "network" and "security".
const BLUEPRINTS = [
  {
    match: ['rag applications with vector databases', 'rag application', 'retrieval augmented generation', 'vector database'],
    key: 'llm',
    modules: [
      'RAG Foundations & Retrieval Pipelines',
      'Embeddings & Vector Databases',
      'Chunking, Retrieval & Reranking',
      'RAG Evaluation & Production Applications'
    ]
  },
  {
    match: ['ai agents', 'agentic ai', 'agentic'],
    key: 'llm',
    modules: [
      'AI Agent Foundations',
      'Tools, Function Calling & Memory',
      'Planning, Reasoning & Multi-Agent Workflows',
      'Agent Evaluation & Production'
    ]
  },
  {
    match: ['generative ai', 'llm application', 'large language model'],
    key: 'llm',
    modules: [
      'Generative AI & LLM Foundations',
      'Prompt Engineering & Structured Outputs',
      'Embeddings, RAG & Tool Use',
      'LLM Applications & Production'
    ]
  },
  {
    match: ['prompt engineering', 'ai productivity'],
    key: 'llm',
    modules: [
      'Prompt Engineering Fundamentals',
      'Structured Prompts & Reasoning',
      'AI Workflows & Productivity',
      'Evaluation, Safety & Automation'
    ]
  },
  {
    match: ['react native'],
    key: 'react',
    modules: [
      'React Native Foundations',
      'Components, Navigation & State',
      'APIs, Storage & Device Features',
      'Testing & Mobile Deployment'
    ]
  },
  {
    match: ['next.js', 'next js'],
    key: 'react',
    modules: [
      'Next.js Foundations & App Router',
      'Server Components & Data Fetching',
      'Authentication, APIs & Database Integration',
      'Caching, Performance & Deployment'
    ]
  },
  {
    match: ['typescript'],
    key: 'javascript',
    modules: [
      'TypeScript Foundations',
      'Types, Interfaces & Generics',
      'Advanced TypeScript & React',
      'Type-Safe APIs & Production'
    ]
  },
  {
    match: ['angular'],
    key: 'javascript',
    modules: [
      'Angular Foundations',
      'Components, Templates & Services',
      'Routing, Forms & HTTP',
      'Testing & Production Deployment'
    ]
  },
  {
    match: ['vue.js', 'vue js'],
    key: 'javascript',
    modules: [
      'Vue Foundations',
      'Components, Props & State',
      'Routing, Forms & API Integration',
      'Testing & Deployment'
    ]
  },
  {
    match: ['modern javascript', 'javascript es2025', 'javascript'],
    key: 'javascript',
    modules: [
      'Modern JavaScript & ES2025',
      'Async JavaScript & Browser APIs',
      'Modules, Classes & Advanced Patterns',
      'Testing, Tooling & Web Applications'
    ]
  },
  {
    match: ['full stack web', 'web development', 'html5 & css3', 'html css'],
    key: 'web',
    modules: [
      'HTML, CSS & Responsive Design',
      'Modern JavaScript & Browser APIs',
      'React Frontend Development',
      'Backend APIs, Authentication & Deployment'
    ]
  },
  {
    match: ['node.js', 'node js', 'express', 'nestjs', 'backend'],
    key: 'web',
    modules: [
      'Node.js Runtime & Backend Foundations',
      'Express APIs, Middleware & Validation',
      'Authentication, Databases & Security',
      'Testing, Deployment & Production APIs'
    ]
  },
  {
    match: ['java programming', 'core java', 'java developer', 'java'],
    key: 'java',
    modules: [
      'Java Fundamentals & Modern Syntax',
      'Object-Oriented Programming',
      'Collections, Generics & Exception Handling',
      'Streams, JDBC & Backend Foundations'
    ]
  },
  {
    match: ['c# programming', 'c#', '.net'],
    key: 'java',
    modules: [
      'C# Fundamentals & .NET',
      'Object-Oriented C#',
      'Collections, LINQ & Async Programming',
      'ASP.NET APIs & Deployment'
    ]
  },
  {
    match: ['python programming', 'python'],
    key: 'python',
    modules: [
      'Python Fundamentals & Modern Syntax',
      'Functions, OOP & Modules',
      'NumPy, Pandas & Data Analysis',
      'APIs, Automation & Python Projects'
    ]
  },
  {
    match: ['c++', 'cpp'],
    key: 'cpp',
    modules: [
      'C++ Fundamentals',
      'OOP & Standard Template Library',
      'Pointers, Memory & Templates',
      'Algorithms & Problem Solving'
    ]
  },
  {
    match: ['data structures', 'dsa', 'algorithms'],
    key: 'generic',
    modules: [
      'Arrays, Strings & Complexity',
      'Linked Lists, Stacks & Queues',
      'Trees, Heaps & Hashing',
      'Graphs, Greedy & Dynamic Programming'
    ]
  },
  {
    match: ['mongodb', 'mongo db', 'nosql'],
    key: 'mongodb',
    modules: [
      'MongoDB Fundamentals & Document Modeling',
      'CRUD, Schema Design & Mongoose',
      'Indexes, Aggregation & Validation',
      'Transactions, Security & Production MongoDB'
    ]
  },
  {
    match: ['mysql', 'postgresql', 'sql & database', 'sql', 'database design', 'dbms'],
    key: 'sql',
    modules: [
      'SQL Fundamentals & Data Modeling',
      'Joins, Aggregation & Subqueries',
      'Normalization, Transactions & Indexes',
      'Advanced SQL & Query Optimization'
    ]
  },
  {
    match: ['git & github', 'github', 'git'],
    key: 'git',
    modules: [
      'Git Fundamentals & Repository Workflow',
      'Branching, Merging & Conflict Resolution',
      'GitHub Collaboration & Pull Requests',
      'Releases, Actions & CI/CD'
    ]
  },
  {
    match: ['aws', 'cloud computing', 'cloud'],
    key: 'cloud',
    modules: [
      'Cloud Computing Foundations',
      'AWS Compute, Storage & Networking',
      'IAM, Databases & Cloud Security',
      'Serverless, Monitoring & Deployment'
    ]
  },
  {
    match: ['devops', 'docker', 'kubernetes', 'ci/cd'],
    key: 'devops',
    modules: [
      'DevOps Foundations & Linux',
      'Docker, Images & Containers',
      'CI/CD Pipelines & Infrastructure',
      'Kubernetes, Monitoring & Reliability'
    ]
  },
  {
    match: ['cybersecurity', 'ethical hacking', 'penetration testing', 'cyber security'],
    key: 'cyber',
    modules: [
      'Cybersecurity Foundations & Threats',
      'Network & Web Application Security',
      'Cryptography, Identity & Access',
      'Penetration Testing, Detection & Response'
    ]
  },
  {
    match: ['networking', 'ccna', 'computer network'],
    key: 'networking',
    modules: [
      'Networking Fundamentals & OSI Model',
      'IP Addressing, Subnetting & Routing',
      'DNS, DHCP, Switching & Wireless',
      'Network Security & Troubleshooting'
    ]
  },
  {
    match: ['linux'],
    key: 'linux',
    modules: [
      'Linux Command Line & Filesystem',
      'Users, Permissions & Processes',
      'Shell Scripting & Automation',
      'Networking, Services & Administration'
    ]
  },
  {
    match: ['selenium', 'software testing', 'qa automation', 'cypress', 'playwright', 'testing'],
    key: 'testing',
    modules: [
      'Software Testing Fundamentals',
      'Test Cases, API Testing & Frameworks',
      'UI Automation & Selenium/Playwright',
      'CI Testing, Reporting & QA Strategy'
    ]
  },
  {
    match: ['android', 'kotlin'],
    key: 'android',
    modules: [
      'Android & Kotlin Foundations',
      'UI, Navigation & State',
      'Room, APIs & Local Storage',
      'Testing & Play Store Deployment'
    ]
  },
  {
    match: ['ui/ux', 'ui ux', 'figma'],
    key: 'uiux',
    modules: [
      'Design Thinking & User Research',
      'Wireframes & Information Architecture',
      'Visual Design & Figma Prototyping',
      'Usability, Accessibility & Developer Handoff'
    ]
  },
  {
    match: ['deep learning', 'machine learning', 'data science', 'computer vision', 'natural language processing', 'mlops'],
    key: 'ml',
    modules: [
      'Data Preparation & ML Foundations',
      'Supervised Learning & Model Building',
      'Unsupervised Learning & Feature Engineering',
      'Evaluation, Deployment & MLOps'
    ]
  },
  {
    match: ['artificial intelligence', 'ai'],
    key: 'ai',
    modules: [
      'Artificial Intelligence Foundations',
      'Search, Reasoning & Machine Learning',
      'Neural Networks & Intelligent Applications',
      'Evaluation, Ethics & Deployment'
    ]
  }
];

function makeCourseSpecificBlueprint(course) {
  const title = String(course.title || 'Course').trim();
  const short = title.length > 42 ? `${title.slice(0, 42).trim()}…` : title;
  return {
    key: 'generic',
    modules: [
      `${short} Foundations`,
      `${short} Core Concepts`,
      `${short} Practical Applications`,
      `${short} Projects & Assessment`
    ]
  };
}

const GENERIC = { key: 'generic', modules: [] };

function getBlueprint(course) {
  const title = String(course.title || '').toLowerCase();
  const description = String(course.description || '').toLowerCase();
  const text = `${title} ${description}`;

  // Title is intentionally checked first to prevent broad words such as
  // "database", "ai" or "security" from stealing the wrong blueprint.
  for (const bp of BLUEPRINTS) {
    if (bp.match.some(k => title.includes(k))) return bp;
  }
  for (const bp of BLUEPRINTS) {
    if (bp.match.some(k => text.includes(k))) return bp;
  }
  return makeCourseSpecificBlueprint(course);
}

function lessonTitles(moduleTitle) {
  return [
    `Introduction to ${moduleTitle}`,
    `${moduleTitle}: Core Concepts`,
    `${moduleTitle}: Hands-on Practice`,
    `${moduleTitle}: Interview & Assessment`
  ];
}

function quizQuestions(moduleTitle) {
  return [
    {
      question: `What is the main goal of ${moduleTitle}?`,
      options: [
        `Understand the concepts and apply them in practice`,
        'Memorize answers without understanding',
        'Skip practical work',
        'Avoid examples'
      ],
      correctAnswer: 0
    },
    {
      question: `Which activity best reinforces ${moduleTitle}?`,
      options: [
        'Only watching videos',
        'Solving practical problems and reviewing mistakes',
        'Skipping exercises',
        'Copying notes without practice'
      ],
      correctAnswer: 1
    },
    {
      question: `What should a learner do before moving on from ${moduleTitle}?`,
      options: [
        'Attempt the practice assessment',
        'Ignore mistakes',
        'Skip revision',
        'Start an unrelated topic'
      ],
      correctAnswer: 0
    },
    {
      question: `What is a strong interview habit for ${moduleTitle}?`,
      options: [
        'Explain the concept in your own words and give an example',
        'Memorize one-line definitions only',
        'Avoid coding or demonstrations',
        'Never review mistakes'
      ],
      correctAnswer: 0
    }
  ];
}

async function repairCourse(course) {
  const blueprint = getBlueprint(course);
  const targetModules = blueprint.modules;
  const existingModules = Array.isArray(course.modules) ? course.modules : [];

  // IMPORTANT:
  // Repair the actual modules stored in MongoDB, not only modules created by
  // an earlier seed script. The previous version only touched `exp_*` modules,
  // which left older/generic course content untouched.
  //
  // We preserve existing module/lesson IDs by position so completed lesson IDs
  // remain valid. We only replace the educational content (titles, notes,
  // resources and videos).
  const repairedModules = [];

  for (let moduleIndex = 0; moduleIndex < targetModules.length; moduleIndex++) {
    const moduleTitle = targetModules[moduleIndex];
    const existingModule = existingModules[moduleIndex] || {};
    const moduleId = existingModule.moduleId || `exp_${course._id}_${moduleIndex + 1}`;
    const titles = lessonTitles(moduleTitle);
    const videoPool = VIDEO_POOLS[blueprint.key] || VIDEO_POOLS.generic || [];

    const existingLessons = Array.isArray(existingModule.lessons) ? existingModule.lessons : [];
    const lessons = titles.map((lessonTitle, lessonIndex) => {
      const existing = existingLessons[lessonIndex] || {};
      const lessonId = existing.lessonId || `exp_${course._id}_${moduleIndex + 1}_${lessonIndex + 1}`;
      const videoUrl = videoPool.length ? videoPool[lessonIndex % videoPool.length] : '';

      return {
        lessonId,
        title: `${lessonIndex + 1}. ${lessonTitle}`,
        duration: `${15 + lessonIndex * 7} min`,
        videoUrl,
        notes:
          `${lessonTitle} is a course-specific lesson for ${course.title}. ` +
          `Study the concepts, follow the practical example, complete the hands-on task, ` +
          `and review the assessment points before moving to the next lesson.`,
        resources: [
          `${course.title.replace(/[^a-z0-9]+/gi, '_')}_Module_${moduleIndex + 1}_Notes.pdf`
        ]
      };
    });

    repairedModules.push({
      moduleId,
      title: `Module ${moduleIndex + 1}: ${moduleTitle}`,
      lessons
    });

    const quizTitle = `${course.title} - Module ${moduleIndex + 1} Practice: ${moduleTitle}`;
    let quiz = await Quiz.findOne({ courseId: course._id, title: quizTitle }).exec();

    if (!quiz) {
      const escapedCourse = course.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const oldRegex = new RegExp(
        `^${escapedCourse}.*Module ${moduleIndex + 1} Practice`,
        'i'
      );
      quiz = await Quiz.findOne({ courseId: course._id, title: oldRegex }).exec();
    }

    const questions = quizQuestions(moduleTitle).map((q, i) => ({
      ...q,
      question: q.question.replace(moduleTitle, `${moduleTitle} in ${course.title}`)
    }));

    if (quiz) {
      quiz.title = quizTitle;
      quiz.courseTitle = course.title;
      quiz.durationMinutes = 10;
      quiz.passingScore = 60;
      quiz.questions = questions;
      await quiz.save();
    } else {
      await Quiz.create({
        title: quizTitle,
        courseTitle: course.title,
        courseId: course._id,
        durationMinutes: 10,
        passingScore: 60,
        questions
      });
    }
  }

  // Replace the course's module array with the repaired course-specific
  // modules. Existing module/lesson IDs were preserved above.
  course.modules = repairedModules;
  await course.save();
  return blueprint;
}

async function run() {
  console.log('==============================================');
  console.log(' SAFE COURSE CONTENT REPAIR');
  console.log('==============================================');
  console.log('No courses will be deleted.');
  console.log('No users or enrollments will be deleted.');
  console.log('Existing completed lesson IDs will be preserved.');
  console.log('');

  await connectDB();
  await mongoose.connection.asPromise();

  const courses = await Course.find().exec();
  console.log(`Total courses found: ${courses.length}`);

  const counts = {};
  let updated = 0;

  for (const course of courses) {
    const blueprint = await repairCourse(course);
    counts[blueprint.key] = (counts[blueprint.key] || 0) + 1;
    updated++;
    console.log(`✓ Repaired: ${course.title} -> ${blueprint.modules.join(' | ')}`);
  }

  console.log('');
  console.log('==============================================');
  console.log(' COURSE CONTENT REPAIR COMPLETE');
  console.log('==============================================');
  console.log(`Courses repaired: ${updated}`);
  console.log('Existing users, enrollments and completed lessons were NOT deleted.');
  console.log('Generated module lesson IDs were preserved whenever they existed.');
  console.log('');
  console.log('Blueprint distribution:');
  console.log(counts);

  await mongoose.connection.close();
}

run().catch(err => {
  console.error('Course content repair failed:', err);
  process.exit(1);
});
