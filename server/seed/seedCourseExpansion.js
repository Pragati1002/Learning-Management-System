/**
 * SAFE COURSE EXPANSION / REPAIR SCRIPT
 * --------------------------------------
 * File:
 * server/seed/seedCourseExpansion.js
 *
 * What this script does:
 * 1. Connects to MongoDB using the existing project DB config.
 * 2. Goes through every course.
 * 3. Adds OR repairs 4 expansion modules for each course.
 * 4. Keeps existing expansion module IDs stable.
 * 5. Adds/repairs one practice quiz for each expansion module.
 * 6. Does NOT delete existing courses.
 * 7. Does NOT delete existing quizzes.
 * 8. Does NOT delete user accounts or progress.
 *
 * IMPORTANT:
 * Run from:
 * C:\Desktop\rsr_lms\server
 *
 * Command:
 * npm run seed:expand
 */

require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');

const Course = require('../models/Course');
const Quiz = require('../models/Quiz');


// ============================================================
// HELPERS
// ============================================================

const cleanText = (value) => String(value || '').trim().toLowerCase();

const slugify = (value) => {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};


/**
 * Creates lessons for a module.
 *
 * IMPORTANT:
 * Lesson IDs are deterministic.
 * If the module already exists, the same lesson IDs are reused.
 * This helps preserve any existing progress references.
 */
const createLessons = (courseId, moduleNumber, lessonTitles) => {
  return lessonTitles.map((title, index) => {
    const lessonNumber = index + 1;

    return {
      lessonId: `exp_${courseId}_${moduleNumber}_${lessonNumber}`,
      title,
      duration: `${12 + (index % 4) * 5} min`,
      videoUrl: '',
      notes: `Study notes for ${title}. Complete the lesson and practice the concepts before moving to the next lesson.`,
      audioUrl: '',
      resources: []
    };
  });
};


/**
 * Creates a complete expansion module.
 */
const createModule = (course, moduleNumber, blueprint) => {
  const courseId = String(course._id);

  return {
    moduleId: `exp_${courseId}_${moduleNumber}`,
    title: blueprint.title,
    lessons: createLessons(
      courseId,
      moduleNumber,
      blueprint.lessons
    )
  };
};


/**
 * Update an existing generated module instead of replacing it.
 *
 * We preserve:
 * - moduleId
 * - lessonId
 *
 * We update:
 * - module title
 * - lesson title
 * - lesson duration
 * - notes
 */
const updateExistingModule = (
  course,
  existingModule,
  moduleNumber,
  blueprint
) => {
  const courseId = String(course._id);

  existingModule.title = blueprint.title;

  const oldLessons = existingModule.lessons || [];

  existingModule.lessons = blueprint.lessons.map((title, index) => {
    const lessonNumber = index + 1;

    const existingLesson = oldLessons[index];

    return {
      ...(existingLesson
        ? existingLesson.toObject
          ? existingLesson.toObject()
          : existingLesson
        : {}),
      lessonId:
        existingLesson?.lessonId ||
        `exp_${courseId}_${moduleNumber}_${lessonNumber}`,
      title,
      duration: `${12 + (index % 4) * 5} min`,
      notes: `Study notes for ${title}. Complete the lesson and practice the concepts before moving to the next lesson.`,
      videoUrl: existingLesson?.videoUrl || '',
      audioUrl: existingLesson?.audioUrl || '',
      resources: existingLesson?.resources || []
    };
  });

  return existingModule;
};


// ============================================================
// COURSE BLUEPRINTS
// ============================================================



// ------------------------------------------------------------
// EXTRA MODULES: every course should have a substantial curriculum.
// The original catalog starts with 4 modules and this expansion script adds
// 4 more. We now guarantee 6 expansion modules (10 total) so the course
// feels like a real learning path rather than a short demo.
// ------------------------------------------------------------
const buildExtraBlueprints = (course) => {
  const subject = String(course.title || 'the course').trim();
  const category = String(course.category || '').trim();
  return [
    {
      title: `Advanced ${category || subject} Applications`,
      lessons: [
        `Advanced concepts and patterns in ${subject}`,
        `Real-world problem solving with ${subject}`,
        `Working with industry tools and workflows`,
        `Performance, security and maintainability`,
        `Debugging and troubleshooting common issues`,
        `Hands-on advanced practice project`
      ]
    },
    {
      title: `${subject}: Capstone Project & Career Preparation`,
      lessons: [
        `Plan and design a complete ${subject} project`,
        `Implement the project step by step`,
        `Testing, documentation and quality checks`,
        `Deploy, present and review the final project`,
        `Common interview questions and practical tasks`,
        `Final assessment and portfolio preparation`
      ]
    }
  ];
};

const BLUEPRINTS = [

  // ----------------------------------------------------------
  // WEB DEVELOPMENT
  // ----------------------------------------------------------

  {
    match: ['full stack web development', 'web development'],
    modules: [
      {
        title: 'Advanced HTML, CSS & Responsive Design',
        lessons: [
          'Semantic HTML and Accessible Page Structure',
          'Advanced CSS Layout with Flexbox and Grid',
          'Responsive Design and Mobile-First Development',
          'CSS Animations, Transitions and Modern UI',
          'Accessibility and Web Performance Basics',
          'Build a Responsive Portfolio Page'
        ]
      },
      {
        title: 'Modern JavaScript & Browser APIs',
        lessons: [
          'Modern JavaScript ES2020+ Features',
          'Destructuring, Spread, Modules and Closures',
          'Promises, Async/Await and Error Handling',
          'DOM Manipulation and Browser Events',
          'Fetch API, Local Storage and Browser APIs',
          'Build an Interactive JavaScript Application'
        ]
      },
      {
        title: 'Backend APIs & Authentication',
        lessons: [
          'REST API Architecture',
          'Node.js and Express Fundamentals',
          'MongoDB Data Modeling',
          'Authentication with JWT',
          'Authorization and Protected Routes',
          'Build a Complete CRUD REST API'
        ]
      },
      {
        title: 'Production Full-Stack Applications',
        lessons: [
          'Connecting React Frontend to Backend APIs',
          'State Management and API Integration',
          'Validation and Error Handling',
          'Security Best Practices',
          'Deployment and Environment Variables',
          'Build and Deploy a Full-Stack Project'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // JAVASCRIPT
  // ----------------------------------------------------------

  {
    match: ['modern javascript', 'javascript es2025', 'javascript'],
    modules: [
      {
        title: 'Modern JavaScript Fundamentals',
        lessons: [
          'let, const and Modern Variable Patterns',
          'Arrow Functions and Template Literals',
          'Destructuring and Spread Syntax',
          'Modules and Import Export',
          'Optional Chaining and Nullish Coalescing',
          'Modern JavaScript Coding Practice'
        ]
      },
      {
        title: 'Asynchronous JavaScript',
        lessons: [
          'Callbacks and Callback Problems',
          'Promises and Promise Chaining',
          'Async and Await',
          'Error Handling in Async Code',
          'Fetch API and HTTP Requests',
          'Build an Async API Application'
        ]
      },
      {
        title: 'Advanced JavaScript Concepts',
        lessons: [
          'Closures and Lexical Scope',
          'Prototype and Prototype Chain',
          'Classes and Object-Oriented JavaScript',
          'Higher-Order Functions',
          'Map, Filter and Reduce',
          'JavaScript Design Patterns'
        ]
      },
      {
        title: 'JavaScript Projects & Testing',
        lessons: [
          'DOM-Based Application Architecture',
          'Form Validation and User Input',
          'Local Storage and Session Storage',
          'Unit Testing with Jest',
          'Debugging and Performance',
          'Build a Complete JavaScript Project'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // REACT
  // ----------------------------------------------------------

  {
    match: ['react.js', 'react complete', 'react frontend'],
    modules: [
      {
        title: 'Advanced React Components & Hooks',
        lessons: [
          'Component Architecture and Reusability',
          'useState and Complex State',
          'useEffect and Side Effects',
          'useMemo and useCallback',
          'Custom Hooks',
          'Build a Reusable Component Library'
        ]
      },
      {
        title: 'React State Management',
        lessons: [
          'Context API',
          'Reducers and useReducer',
          'Global Application State',
          'Form State Management',
          'Authentication State',
          'Build an Authenticated React App'
        ]
      },
      {
        title: 'React Routing & API Integration',
        lessons: [
          'React Router',
          'Nested and Protected Routes',
          'REST API Integration',
          'Loading and Error States',
          'CRUD Operations from React',
          'Build a React API Dashboard'
        ]
      },
      {
        title: 'React Performance & Production',
        lessons: [
          'React Rendering and Reconciliation',
          'Code Splitting and Lazy Loading',
          'Performance Optimization',
          'React Testing Library',
          'Production Builds',
          'Deploy a React Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // NEXT.JS
  // ----------------------------------------------------------

  {
    match: ['next.js', 'nextjs'],
    modules: [
      {
        title: 'Next.js App Router',
        lessons: [
          'Next.js Project Structure',
          'App Router Fundamentals',
          'Layouts and Nested Routes',
          'Dynamic Routes',
          'Loading and Error UI',
          'Build a Multi-Page Next.js App'
        ]
      },
      {
        title: 'Server Components & Data Fetching',
        lessons: [
          'Server Components',
          'Client Components',
          'Server-Side Data Fetching',
          'Caching and Revalidation',
          'Loading Remote API Data',
          'Build a Data-Driven Next.js App'
        ]
      },
      {
        title: 'Authentication & APIs in Next.js',
        lessons: [
          'Next.js API Routes',
          'Route Handlers',
          'Authentication Architecture',
          'Protected Pages',
          'Middleware',
          'Build an Authenticated Application'
        ]
      },
      {
        title: 'Next.js Production Deployment',
        lessons: [
          'Image Optimization',
          'SEO and Metadata',
          'Environment Variables',
          'Performance Optimization',
          'Production Build',
          'Deploy a Next.js Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // VUE
  // ----------------------------------------------------------

  {
    match: ['vue.js', 'vue 3', 'vuejs'],
    modules: [
      {
        title: 'Vue 3 Fundamentals',
        lessons: [
          'Vue 3 Project Structure',
          'Templates and Directives',
          'Reactive State',
          'Computed Properties',
          'Watchers',
          'Build a Vue Application'
        ]
      },
      {
        title: 'Composition API',
        lessons: [
          'setup and Composition API',
          'ref and reactive',
          'Computed and Watch',
          'Reusable Composables',
          'Component Communication',
          'Build Reusable Vue Components'
        ]
      },
      {
        title: 'Vue Routing & State',
        lessons: [
          'Vue Router',
          'Nested Routes',
          'Navigation Guards',
          'Pinia State Management',
          'Forms and Validation',
          'Build a Multi-Page Vue App'
        ]
      },
      {
        title: 'Vue APIs & Production',
        lessons: [
          'REST API Integration',
          'Async Data Loading',
          'Error Handling',
          'Testing Vue Components',
          'Production Optimization',
          'Deploy a Vue Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // ANGULAR
  // ----------------------------------------------------------

  {
    match: ['angular'],
    modules: [
      {
        title: 'Angular Components & Templates',
        lessons: [
          'Angular Project Structure',
          'Components and Templates',
          'Data Binding',
          'Directives',
          'Pipes',
          'Build a Component-Based Application'
        ]
      },
      {
        title: 'Angular Services & Dependency Injection',
        lessons: [
          'Angular Services',
          'Dependency Injection',
          'Reusable Business Logic',
          'HTTP Client',
          'Observables and RxJS',
          'Build an API Service Layer'
        ]
      },
      {
        title: 'Angular Routing & Forms',
        lessons: [
          'Angular Router',
          'Route Parameters',
          'Guards and Protected Routes',
          'Template-Driven Forms',
          'Reactive Forms',
          'Form Validation'
        ]
      },
      {
        title: 'Angular Production Applications',
        lessons: [
          'State Management',
          'API Error Handling',
          'Lazy Loading',
          'Testing Angular Components',
          'Production Build',
          'Deploy an Angular Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // NODE
  // ----------------------------------------------------------

  {
    match: ['node.js', 'nodejs', 'express rest api', 'nestjs'],
    modules: [
      {
        title: 'Node.js Backend Fundamentals',
        lessons: [
          'Node.js Runtime Architecture',
          'Modules and CommonJS',
          'File System and Path APIs',
          'Events and Event Emitters',
          'Streams and Buffers',
          'Build a Node.js CLI Tool'
        ]
      },
      {
        title: 'Express REST APIs',
        lessons: [
          'Express Application Structure',
          'Routing and Controllers',
          'Middleware',
          'Request and Response Handling',
          'Validation and Error Handling',
          'Build a CRUD REST API'
        ]
      },
      {
        title: 'Authentication & Security',
        lessons: [
          'User Registration',
          'Password Hashing',
          'JWT Authentication',
          'Authorization',
          'CORS and Security Headers',
          'Secure API Design'
        ]
      },
      {
        title: 'Production Node.js APIs',
        lessons: [
          'MongoDB Integration',
          'Pagination and Filtering',
          'Logging and Monitoring',
          'Environment Variables',
          'Testing APIs',
          'Deploy a Node.js Backend'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // JAVA
  // ----------------------------------------------------------

  {
    match: ['java programming', 'java programming & oop'],
    modules: [
      {
        title: 'Advanced Java OOP',
        lessons: [
          'Advanced Classes and Objects',
          'Inheritance and Polymorphism',
          'Interfaces and Abstract Classes',
          'Composition and Aggregation',
          'SOLID Principles in Java',
          'Build an OOP-Based Java Application'
        ]
      },
      {
        title: 'Collections & Generics',
        lessons: [
          'List, Set and Map',
          'ArrayList and LinkedList',
          'HashMap and TreeMap',
          'Iterators and Comparators',
          'Generics',
          'Collections Practice Problems'
        ]
      },
      {
        title: 'Exception Handling & File Processing',
        lessons: [
          'Checked and Unchecked Exceptions',
          'Custom Exceptions',
          'Try-Catch-Finally',
          'Java File I/O',
          'Serialization',
          'Build a File-Based Java Application'
        ]
      },
      {
        title: 'Modern Java & Backend Development',
        lessons: [
          'Lambda Expressions',
          'Streams API',
          'Functional Interfaces',
          'Multithreading',
          'Introduction to Spring Boot',
          'Build a Java REST API'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // C#
  // ----------------------------------------------------------

  {
    match: ['c# programming', 'asp.net', '.net'],
    modules: [
      {
        title: 'Advanced C# Programming',
        lessons: [
          'Advanced Classes and Interfaces',
          'Inheritance and Polymorphism',
          'Delegates and Events',
          'Generics',
          'LINQ Fundamentals',
          'Build a C# Application'
        ]
      },
      {
        title: 'LINQ & Collections',
        lessons: [
          'Collections in C#',
          'LINQ Query Syntax',
          'LINQ Method Syntax',
          'Lambda Expressions',
          'Deferred Execution',
          'LINQ Practice Problems'
        ]
      },
      {
        title: 'ASP.NET Core Web Development',
        lessons: [
          'ASP.NET Core Architecture',
          'Controllers and Routing',
          'Dependency Injection',
          'Entity Framework Core',
          'REST APIs',
          'Build an ASP.NET Core API'
        ]
      },
      {
        title: 'Production .NET Applications',
        lessons: [
          'Authentication',
          'Authorization',
          'API Validation',
          'Logging and Configuration',
          'Testing .NET APIs',
          'Deploy an ASP.NET Core Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // PYTHON
  // ----------------------------------------------------------

  {
    match: [
      'python programming',
      'python zero',
      'python for data analysis',
      'numpy',
      'pandas'
    ],
    modules: [
      {
        title: 'Advanced Python Programming',
        lessons: [
          'Advanced Functions',
          'List and Dictionary Comprehensions',
          'Decorators',
          'Generators',
          'Iterators',
          'Object-Oriented Python'
        ]
      },
      {
        title: 'NumPy & Pandas',
        lessons: [
          'NumPy Arrays',
          'Array Operations',
          'Pandas Series and DataFrames',
          'Data Cleaning',
          'Grouping and Aggregation',
          'Data Analysis Project'
        ]
      },
      {
        title: 'Data Visualization',
        lessons: [
          'Matplotlib Fundamentals',
          'Charts and Plots',
          'Seaborn Basics',
          'Customizing Visualizations',
          'Exploratory Data Analysis',
          'Build a Data Visualization Dashboard'
        ]
      },
      {
        title: 'Python Projects & Automation',
        lessons: [
          'Working with APIs',
          'File and JSON Processing',
          'Web Scraping Concepts',
          'Automation Scripts',
          'Virtual Environments',
          'Build a Python Automation Project'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // DSA
  // ----------------------------------------------------------

  {
    match: [
      'data structures & algorithms',
      'data structures and algorithms',
      'competitive programming'
    ],
    modules: [
      {
        title: 'Advanced Arrays & Strings',
        lessons: [
          'Two Pointer Technique',
          'Sliding Window',
          'Prefix Sum',
          'Hashing Techniques',
          'Binary Search Patterns',
          'Advanced Array Practice'
        ]
      },
      {
        title: 'Trees & Binary Search Trees',
        lessons: [
          'Binary Trees',
          'Tree Traversals',
          'Binary Search Trees',
          'Height and Diameter',
          'Lowest Common Ancestor',
          'Tree Practice Problems'
        ]
      },
      {
        title: 'Graphs & Graph Algorithms',
        lessons: [
          'Graph Representation',
          'BFS and DFS',
          'Cycle Detection',
          'Topological Sorting',
          'Shortest Path Algorithms',
          'Graph Practice Problems'
        ]
      },
      {
        title: 'Dynamic Programming & Advanced Problem Solving',
        lessons: [
          'Dynamic Programming Fundamentals',
          'Memoization and Tabulation',
          'Knapsack Patterns',
          'Longest Common Subsequence',
          'DP on Trees and Grids',
          'Advanced Interview Problems'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // SQL / DATABASE
  // ----------------------------------------------------------

  {
    match: [
      'sql',
      'mysql',
      'postgresql',
      'oracle database',
      'database design',
      'mongodb',
      'mongoose',
      'nosql',
      'redis'
    ],
    modules: [
      {
        title: 'Advanced Database Queries',
        lessons: [
          'Advanced SELECT Queries',
          'Joins and Subqueries',
          'Common Table Expressions',
          'Window Functions',
          'Aggregation and Grouping',
          'Advanced Query Practice'
        ]
      },
      {
        title: 'Database Design & Normalization',
        lessons: [
          'Entity Relationship Modeling',
          'Primary and Foreign Keys',
          'Functional Dependencies',
          'First, Second and Third Normal Forms',
          'Denormalization',
          'Design a Production Database'
        ]
      },
      {
        title: 'Transactions & Concurrency',
        lessons: [
          'Database Transactions',
          'ACID Properties',
          'Isolation Levels',
          'Locks',
          'Concurrency Problems',
          'Transaction Practice'
        ]
      },
      {
        title: 'Indexes & Database Optimization',
        lessons: [
          'Database Indexes',
          'Composite Indexes',
          'Query Execution Plans',
          'Performance Optimization',
          'Database Security',
          'Optimize a Production Database'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // GIT
  // ----------------------------------------------------------

  {
    match: ['git', 'github', 'github actions'],
    modules: [
      {
        title: 'Git Fundamentals',
        lessons: [
          'Git Repository Basics',
          'Working Tree and Staging Area',
          'Commits',
          'Branches',
          'Merge and Rebase',
          'Git Practice Workflow'
        ]
      },
      {
        title: 'Professional Git Workflows',
        lessons: [
          'Feature Branch Workflow',
          'Git Rebase',
          'Conflict Resolution',
          'Stashing Changes',
          'Tags and Releases',
          'Professional Git Workflow'
        ]
      },
      {
        title: 'GitHub Collaboration',
        lessons: [
          'GitHub Repositories',
          'Pull Requests',
          'Code Reviews',
          'Issues and Projects',
          'Branch Protection',
          'Team Collaboration'
        ]
      },
      {
        title: 'GitHub Actions & CI/CD',
        lessons: [
          'GitHub Actions Fundamentals',
          'Workflow Files',
          'Build and Test Automation',
          'Secrets and Environment Variables',
          'Deployment Workflows',
          'Build a CI/CD Pipeline'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // AWS / CLOUD
  // ----------------------------------------------------------

  {
    match: [
      'aws',
      'cloud computing',
      'azure',
      'google cloud',
      'gcp'
    ],
    modules: [
      {
        title: 'Cloud Computing Fundamentals',
        lessons: [
          'Cloud Computing Models',
          'IaaS, PaaS and SaaS',
          'Regions and Availability Zones',
          'Cloud Security Basics',
          'Pricing and Cost Management',
          'Cloud Architecture Practice'
        ]
      },
      {
        title: 'Cloud Networking',
        lessons: [
          'Virtual Networks',
          'Subnets',
          'Routing Tables',
          'Firewalls and Security Groups',
          'Load Balancers',
          'Design a Cloud Network'
        ]
      },
      {
        title: 'Cloud Databases & Serverless',
        lessons: [
          'Managed Databases',
          'Object Storage',
          'Serverless Functions',
          'API Gateways',
          'Caching',
          'Build a Serverless Application'
        ]
      },
      {
        title: 'Cloud Deployment & Security',
        lessons: [
          'Application Deployment',
          'Identity and Access Management',
          'Secrets Management',
          'Monitoring',
          'Backup and Recovery',
          'Deploy a Production Cloud Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // DEVOPS
  // ----------------------------------------------------------

  {
    match: [
      'devops',
      'docker',
      'kubernetes',
      'jenkins',
      'terraform',
      'ansible',
      'ci/cd'
    ],
    modules: [
      {
        title: 'Docker Fundamentals',
        lessons: [
          'Containers vs Virtual Machines',
          'Docker Images',
          'Docker Containers',
          'Dockerfiles',
          'Volumes and Networks',
          'Containerize an Application'
        ]
      },
      {
        title: 'Docker Compose & Application Stacks',
        lessons: [
          'Docker Compose',
          'Multi-Container Applications',
          'Environment Variables',
          'Persistent Volumes',
          'Service Networking',
          'Build a Multi-Service Application'
        ]
      },
      {
        title: 'Kubernetes Fundamentals',
        lessons: [
          'Kubernetes Architecture',
          'Pods and Deployments',
          'Services',
          'ConfigMaps and Secrets',
          'Scaling Applications',
          'Deploy an Application to Kubernetes'
        ]
      },
      {
        title: 'CI/CD Pipelines',
        lessons: [
          'CI/CD Fundamentals',
          'Automated Testing',
          'Build Pipelines',
          'Deployment Pipelines',
          'GitHub Actions and Jenkins',
          'Build a Complete CI/CD Pipeline'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // CYBERSECURITY
  // ----------------------------------------------------------

  {
    match: [
      'cybersecurity',
      'ethical hacking',
      'security'
    ],
    modules: [
      {
        title: 'Security Fundamentals',
        lessons: [
          'CIA Triad',
          'Authentication and Authorization',
          'Common Attack Vectors',
          'Security Threat Modeling',
          'Password Security',
          'Security Fundamentals Practice'
        ]
      },
      {
        title: 'Web Application Security',
        lessons: [
          'OWASP Top 10',
          'SQL Injection Concepts',
          'Cross-Site Scripting',
          'CSRF',
          'Authentication Security',
          'Secure Web Application Design'
        ]
      },
      {
        title: 'Network Security',
        lessons: [
          'Network Threats',
          'Firewalls',
          'VPNs',
          'TLS and HTTPS',
          'Intrusion Detection',
          'Network Security Practice'
        ]
      },
      {
        title: 'Security Testing',
        lessons: [
          'Vulnerability Assessment',
          'Security Testing Methodology',
          'Penetration Testing Concepts',
          'Security Scanning',
          'Reporting Vulnerabilities',
          'Build a Security Testing Checklist'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // MACHINE LEARNING
  // ----------------------------------------------------------

  {
    match: [
      'data science & machine learning',
      'machine learning',
      'machine learning with python',
      'mlops'
    ],
    modules: [
      {
        title: 'Machine Learning Foundations',
        lessons: [
          'Machine Learning Concepts',
          'Supervised vs Unsupervised Learning',
          'Training and Test Data',
          'Feature Engineering',
          'Data Preprocessing',
          'Build Your First ML Pipeline'
        ]
      },
      {
        title: 'Regression & Classification',
        lessons: [
          'Linear Regression',
          'Logistic Regression',
          'Decision Trees',
          'Random Forests',
          'K-Nearest Neighbors',
          'Classification Practice'
        ]
      },
      {
        title: 'Unsupervised Learning',
        lessons: [
          'Clustering Concepts',
          'K-Means Clustering',
          'Hierarchical Clustering',
          'Dimensionality Reduction',
          'PCA',
          'Unsupervised Learning Project'
        ]
      },
      {
        title: 'Model Evaluation & Deployment',
        lessons: [
          'Accuracy and Precision',
          'Recall and F1 Score',
          'Cross Validation',
          'Hyperparameter Tuning',
          'Model Serialization',
          'Deploy a Machine Learning Model'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // AI / DEEP LEARNING
  // ----------------------------------------------------------

  {
    match: [
      'artificial intelligence',
      'deep learning',
      'tensorflow',
      'pytorch'
    ],
    modules: [
      {
        title: 'Deep Learning Foundations',
        lessons: [
          'Neural Network Fundamentals',
          'Perceptrons',
          'Activation Functions',
          'Forward and Backpropagation',
          'Loss Functions',
          'Build a Neural Network'
        ]
      },
      {
        title: 'CNNs & Computer Vision',
        lessons: [
          'Convolutional Neural Networks',
          'Convolution and Pooling',
          'Image Classification',
          'Transfer Learning',
          'Computer Vision Pipelines',
          'Build an Image Classifier'
        ]
      },
      {
        title: 'NLP & Transformers',
        lessons: [
          'Natural Language Processing',
          'Text Preprocessing',
          'Word Embeddings',
          'Attention Mechanism',
          'Transformer Architecture',
          'Build an NLP Application'
        ]
      },
      {
        title: 'Generative AI Applications',
        lessons: [
          'Generative AI Fundamentals',
          'Large Language Models',
          'Prompt Engineering',
          'Embeddings and Vector Search',
          'RAG Architecture',
          'Build a Generative AI Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // GENERATIVE AI
  // ----------------------------------------------------------

  {
    match: [
      'generative ai',
      'llm',
      'rag applications',
      'ai agents',
      'agentic ai',
      'prompt engineering'
    ],
    modules: [
      {
        title: 'LLM Fundamentals',
        lessons: [
          'Generative AI Concepts',
          'Large Language Models',
          'Tokens and Context Windows',
          'Embeddings',
          'Model Parameters',
          'Working with LLM APIs'
        ]
      },
      {
        title: 'Prompt Engineering',
        lessons: [
          'Prompt Structure',
          'Zero-Shot and Few-Shot Prompting',
          'Role and Context Design',
          'Structured Outputs',
          'Prompt Evaluation',
          'Build a Prompt Library'
        ]
      },
      {
        title: 'RAG & Vector Databases',
        lessons: [
          'Retrieval Augmented Generation',
          'Document Chunking',
          'Embeddings',
          'Vector Databases',
          'Retrieval Pipelines',
          'Build a RAG Application'
        ]
      },
      {
        title: 'AI Agents & Production Applications',
        lessons: [
          'AI Agent Architecture',
          'Tools and Function Calling',
          'Agent Memory',
          'Multi-Step Workflows',
          'Evaluation and Safety',
          'Build an AI Agent Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // ANDROID / KOTLIN
  // ----------------------------------------------------------

  {
    match: [
      'android',
      'kotlin'
    ],
    modules: [
      {
        title: 'Kotlin Programming',
        lessons: [
          'Kotlin Syntax',
          'Functions and Null Safety',
          'Classes and Objects',
          'Collections',
          'Lambdas',
          'Kotlin Practice Project'
        ]
      },
      {
        title: 'Android UI Development',
        lessons: [
          'Android Project Structure',
          'Layouts and UI Components',
          'Activities and Fragments',
          'RecyclerView',
          'Material Design',
          'Build an Android UI'
        ]
      },
      {
        title: 'Android Data & Networking',
        lessons: [
          'Local Storage',
          'Room Database',
          'REST API Integration',
          'JSON Parsing',
          'Networking with Retrofit',
          'Build an API-Based Android App'
        ]
      },
      {
        title: 'Production Android Applications',
        lessons: [
          'App Architecture',
          'MVVM',
          'Authentication',
          'Notifications',
          'Testing Android Apps',
          'Publish an Android Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // REACT NATIVE
  // ----------------------------------------------------------

  {
    match: [
      'react native'
    ],
    modules: [
      {
        title: 'React Native Fundamentals',
        lessons: [
          'React Native Project Structure',
          'Core Components',
          'Styling',
          'Flexbox Layout',
          'Platform APIs',
          'Build a Mobile UI'
        ]
      },
      {
        title: 'State & Navigation',
        lessons: [
          'React Native State',
          'Context API',
          'React Navigation',
          'Stack Navigation',
          'Tab Navigation',
          'Build a Multi-Screen App'
        ]
      },
      {
        title: 'APIs & Device Features',
        lessons: [
          'REST API Integration',
          'Async Storage',
          'Camera',
          'Location',
          'Notifications',
          'Build a Mobile API Application'
        ]
      },
      {
        title: 'Production React Native Apps',
        lessons: [
          'Performance Optimization',
          'Debugging',
          'Testing',
          'Android Builds',
          'iOS Builds',
          'Release a Mobile Application'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // UI UX
  // ----------------------------------------------------------

  {
    match: [
      'ui/ux',
      'ui ux',
      'figma'
    ],
    modules: [
      {
        title: 'UX Research',
        lessons: [
          'Understanding User Problems',
          'User Interviews',
          'Personas',
          'User Journeys',
          'Information Architecture',
          'UX Research Practice'
        ]
      },
      {
        title: 'Wireframing & Prototyping',
        lessons: [
          'Low-Fidelity Wireframes',
          'High-Fidelity Wireframes',
          'Layout and Hierarchy',
          'Interactive Prototypes',
          'Navigation Flows',
          'Build a Clickable Prototype'
        ]
      },
      {
        title: 'Figma Design Systems',
        lessons: [
          'Figma Interface',
          'Components',
          'Variants',
          'Auto Layout',
          'Design Tokens',
          'Build a Design System'
        ]
      },
      {
        title: 'Usability & Portfolio Projects',
        lessons: [
          'Usability Testing',
          'Design Iteration',
          'Responsive UI Design',
          'Developer Handoff',
          'Case Study Creation',
          'Build a UX Portfolio Case Study'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // NETWORKING
  // ----------------------------------------------------------

  {
    match: [
      'networking',
      'ccna'
    ],
    modules: [
      {
        title: 'Network Architecture',
        lessons: [
          'OSI Model',
          'TCP/IP Model',
          'Network Devices',
          'Ethernet',
          'LAN and WAN',
          'Network Architecture Practice'
        ]
      },
      {
        title: 'IP Addressing & Subnetting',
        lessons: [
          'IPv4 Addressing',
          'IPv6 Basics',
          'Subnet Masks',
          'CIDR',
          'Subnetting Practice',
          'Design an IP Addressing Plan'
        ]
      },
      {
        title: 'Routing & Switching',
        lessons: [
          'Routing Fundamentals',
          'Static Routing',
          'Dynamic Routing',
          'Switching Concepts',
          'VLANs',
          'Routing Practice'
        ]
      },
      {
        title: 'Network Security & Troubleshooting',
        lessons: [
          'Network Security',
          'Access Control',
          'Firewalls',
          'Network Troubleshooting',
          'Packet Analysis',
          'Troubleshoot a Network'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // LINUX
  // ----------------------------------------------------------

  {
    match: [
      'linux'
    ],
    modules: [
      {
        title: 'Linux Command Line',
        lessons: [
          'Linux File System',
          'Essential Commands',
          'File Permissions',
          'Processes',
          'Shell Redirection',
          'Command Line Practice'
        ]
      },
      {
        title: 'Linux Administration',
        lessons: [
          'Users and Groups',
          'Package Management',
          'Services',
          'Disk Management',
          'System Monitoring',
          'Linux Administration Practice'
        ]
      },
      {
        title: 'Linux Networking',
        lessons: [
          'Network Interfaces',
          'IP Configuration',
          'DNS',
          'SSH',
          'Firewall Configuration',
          'Linux Networking Practice'
        ]
      },
      {
        title: 'Linux Automation',
        lessons: [
          'Bash Scripting',
          'Shell Variables',
          'Conditional Logic',
          'Loops',
          'Cron Jobs',
          'Build a Linux Automation Script'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // TESTING
  // ----------------------------------------------------------

  {
    match: [
      'testing',
      'selenium',
      'qa automation',
      'jest'
    ],
    modules: [
      {
        title: 'Software Testing Fundamentals',
        lessons: [
          'Testing Principles',
          'Manual Testing',
          'Test Cases',
          'Bug Life Cycle',
          'Functional Testing',
          'Testing Practice'
        ]
      },
      {
        title: 'Automation Testing',
        lessons: [
          'Automation Testing Concepts',
          'Selenium WebDriver',
          'Locators',
          'Browser Automation',
          'Assertions',
          'Build a Selenium Test'
        ]
      },
      {
        title: 'Test Frameworks',
        lessons: [
          'Test Framework Architecture',
          'Fixtures',
          'Test Suites',
          'Parameterized Tests',
          'Reports',
          'Build an Automated Test Suite'
        ]
      },
      {
        title: 'Automation Framework Design',
        lessons: [
          'Page Object Model',
          'Reusable Test Utilities',
          'Data-Driven Testing',
          'CI Integration',
          'Test Reporting',
          'Build a Production Test Framework'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // TYPESCRIPT
  // ----------------------------------------------------------

  {
    match: [
      'typescript'
    ],
    modules: [
      {
        title: 'TypeScript Core Concepts',
        lessons: [
          'TypeScript Setup',
          'Primitive Types',
          'Arrays and Tuples',
          'Interfaces',
          'Type Aliases',
          'TypeScript Practice'
        ]
      },
      {
        title: 'Intermediate TypeScript',
        lessons: [
          'Union and Intersection Types',
          'Generics',
          'Enums',
          'Utility Types',
          'Type Guards',
          'Advanced Type Practice'
        ]
      },
      {
        title: 'Advanced TypeScript',
        lessons: [
          'Mapped Types',
          'Conditional Types',
          'Decorators',
          'Advanced Generics',
          'Declaration Files',
          'Build a Typed Application'
        ]
      },
      {
        title: 'TypeScript with React & Node',
        lessons: [
          'TypeScript with React',
          'Typing React Props',
          'Typing API Responses',
          'TypeScript with Express',
          'Shared Types',
          'Build a Full-Stack TypeScript App'
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  // GENERIC PROGRAMMING
  // ----------------------------------------------------------

  {
    match: [],
    modules: [
      {
        title: 'Core Concepts & Foundations',
        lessons: [
          'Core Concepts and Terminology',
          'Development Environment Setup',
          'Variables and Data Types',
          'Control Flow',
          'Functions and Reusable Code',
          'Foundational Practice'
        ]
      },
      {
        title: 'Intermediate Techniques',
        lessons: [
          'Collections and Data Handling',
          'Error Handling',
          'Modular Programming',
          'Object-Oriented Concepts',
          'Working with External Data',
          'Intermediate Practice'
        ]
      },
      {
        title: 'Advanced Concepts',
        lessons: [
          'Advanced Programming Patterns',
          'Performance Optimization',
          'Testing',
          'Debugging',
          'Security Considerations',
          'Advanced Practice'
        ]
      },
      {
        title: 'Projects & Practical Practice',
        lessons: [
          'Project Planning',
          'Application Architecture',
          'Feature Implementation',
          'Testing and Debugging',
          'Documentation',
          'Build a Complete Project'
        ]
      }
    ]
  }

];


// ============================================================
// FIND CORRECT BLUEPRINT
// ============================================================

const getBlueprint = (course) => {
  const title = cleanText(course.title);

  // ----------------------------------------------------------
  // IMPORTANT: SPECIFIC MATCHES FIRST
  // ----------------------------------------------------------

  // AI / Generative AI must be checked before generic Python.
  if (
    title.includes('generative ai') ||
    title.includes('large language') ||
    title.includes('llm') ||
    title.includes('rag ') ||
    title.includes('rag application') ||
    title.includes('ai agent') ||
    title.includes('agentic ai') ||
    title.includes('prompt engineering')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.some((m) => title.includes(m))
    );
  }

  // Deep learning / AI.
  if (
    title.includes('artificial intelligence') ||
    title.includes('deep learning') ||
    title.includes('tensorflow') ||
    title.includes('pytorch')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.some((m) => title.includes(m))
    );
  }

  // Machine Learning before Data Science.
  if (
    title.includes('machine learning') ||
    title.includes('mlops') ||
    title.includes('data science & machine learning')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.some((m) => title.includes(m))
    );
  }

  // React Native before React.
  if (title.includes('react native')) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('react native')
    );
  }

  // Next.js before generic JavaScript/Web.
  if (title.includes('next.js') || title.includes('nextjs')) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('next.js')
    );
  }

  // Vue.
  if (title.includes('vue.js') || title.includes('vue 3') || title.includes('vuejs')) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('vue.js')
    );
  }

  // Angular.
  if (title.includes('angular')) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('angular')
    );
  }

  // TypeScript before generic JavaScript.
  if (title.includes('typescript')) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('typescript')
    );
  }

  // JavaScript before Java.
  if (
    title.includes('javascript') &&
    !title.includes('java programming')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('modern javascript')
    );
  }

  // Java.
  if (
    title.includes('java programming') ||
    title === 'java' ||
    title.includes('spring boot')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('java programming')
    );
  }

  // C#.
  if (
    title.includes('c#') ||
    title.includes('asp.net') ||
    title.includes('.net')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('c# programming')
    );
  }

  // Python.
  if (
    title.includes('python programming') ||
    title.includes('python zero') ||
    title.includes('python for data analysis') ||
    title.includes('numpy') ||
    title.includes('pandas')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('python programming')
    );
  }

  // DSA.
  if (
    title.includes('data structures & algorithms') ||
    title.includes('data structures and algorithms') ||
    title.includes('competitive programming')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('data structures & algorithms')
    );
  }

  // Cybersecurity.
  if (
    title.includes('cybersecurity') ||
    title.includes('ethical hacking')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('cybersecurity')
    );
  }

  // DevOps / infrastructure.
  if (
    title.includes('devops') ||
    title.includes('docker') ||
    title.includes('kubernetes') ||
    title.includes('jenkins') ||
    title.includes('terraform') ||
    title.includes('ansible')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('devops')
    );
  }

  // Cloud.
  if (
    title.includes('aws') ||
    title.includes('azure') ||
    title.includes('google cloud') ||
    title.includes('gcp') ||
    title.includes('cloud computing')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('aws')
    );
  }

  // Git.
  if (
    title.includes('git') ||
    title.includes('github')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('git')
    );
  }

  // Database.
  if (
    title.includes('sql') ||
    title.includes('mysql') ||
    title.includes('postgresql') ||
    title.includes('oracle database') ||
    title.includes('database') ||
    title.includes('mongodb') ||
    title.includes('mongoose') ||
    title.includes('nosql') ||
    title.includes('redis')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('sql')
    );
  }

  // Testing.
  if (
    title.includes('testing') ||
    title.includes('selenium') ||
    title.includes('qa automation') ||
    title.includes('jest')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('testing')
    );
  }

  // Android/Kotlin.
  if (
    title.includes('android') ||
    title.includes('kotlin')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('android')
    );
  }

  // UI/UX.
  if (
    title.includes('ui/ux') ||
    title.includes('ui ux') ||
    title.includes('figma')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('ui/ux')
    );
  }

  // Networking.
  if (
    title.includes('networking') ||
    title.includes('ccna')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('networking')
    );
  }

  // Linux.
  if (title.includes('linux')) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('linux')
    );
  }

  // Node / backend.
  if (
    title.includes('node.js') ||
    title.includes('nodejs') ||
    title.includes('express') ||
    title.includes('nestjs')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('node.js')
    );
  }

  // React.
  if (
    title.includes('react.js') ||
    title.includes('react frontend') ||
    title.includes('react complete')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('react.js')
    );
  }

  // Full-stack.
  if (
    title.includes('full stack') ||
    title.includes('full-stack') ||
    title.includes('web development')
  ) {
    return BLUEPRINTS.find((b) =>
      b.match.includes('full stack web development')
    );
  }

  return BLUEPRINTS.find((b) => b.match.length === 0);
};


// ============================================================
// QUIZ QUESTIONS
// ============================================================

const quizQuestions = {

  'Advanced HTML, CSS & Responsive Design': [
    {
      question: 'Which CSS layout system is designed for two-dimensional layouts?',
      options: ['Flexbox', 'CSS Grid', 'Float', 'Position'],
      correctAnswer: 1
    },
    {
      question: 'What does semantic HTML improve?',
      options: [
        'Only page colors',
        'Accessibility and document structure',
        'Database performance',
        'Server CPU usage'
      ],
      correctAnswer: 1
    },
    {
      question: 'What is a mobile-first design approach?',
      options: [
        'Design only for tablets',
        'Design for mobile first and progressively enhance',
        'Disable responsive layouts',
        'Use only fixed pixel widths'
      ],
      correctAnswer: 1
    },
    {
      question: 'Which CSS feature is commonly used for responsive breakpoints?',
      options: [
        '@media',
        '@server',
        '@responsive',
        '@device'
      ],
      correctAnswer: 0
    }
  ],

  'Modern JavaScript & Browser APIs': [
    {
      question: 'Which keyword is commonly used with asynchronous functions?',
      options: ['async', 'wait', 'parallel', 'deferOnly'],
      correctAnswer: 0
    },
    {
      question: 'What does fetch() return?',
      options: [
        'A Promise',
        'A database',
        'A CSS file',
        'A DOM element'
      ],
      correctAnswer: 0
    },
    {
      question: 'Which syntax imports a named export?',
      options: [
        'import { name } from "./file.js"',
        'include name',
        'require named only',
        'load name'
      ],
      correctAnswer: 0
    },
    {
      question: 'What does localStorage provide?',
      options: [
        'Browser-side persistent key-value storage',
        'Server-side SQL storage',
        'CPU memory',
        'A cloud database'
      ],
      correctAnswer: 0
    }
  ],

  'Advanced React Components & Hooks': [
    {
      question: 'Which Hook is commonly used for local component state?',
      options: ['useState', 'useRoute', 'useClass', 'useServer'],
      correctAnswer: 0
    },
    {
      question: 'Which Hook handles side effects?',
      options: ['useEffect', 'useStyle', 'useHTML', 'useRouteOnly'],
      correctAnswer: 0
    },
    {
      question: 'What is a custom Hook?',
      options: [
        'A reusable function containing React Hook logic',
        'A CSS file',
        'A database table',
        'A browser extension'
      ],
      correctAnswer: 0
    },
    {
      question: 'Why are React components made reusable?',
      options: [
        'To reduce duplication and improve maintainability',
        'To disable state',
        'To remove JavaScript',
        'To prevent rendering'
      ],
      correctAnswer: 0
    }
  ],

  'Machine Learning Foundations': [
    {
      question: 'What is supervised learning?',
      options: [
        'Learning from labeled data',
        'Learning without any data',
        'Only clustering',
        'Only visualization'
      ],
      correctAnswer: 0
    },
    {
      question: 'Why is data preprocessing important?',
      options: [
        'To prepare data for effective model training',
        'To delete the model',
        'To replace evaluation',
        'To remove all features'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is a feature?',
      options: [
        'An input variable used by a model',
        'A final prediction only',
        'A server',
        'A database'
      ],
      correctAnswer: 0
    },
    {
      question: 'Why split data into training and test sets?',
      options: [
        'To evaluate generalization on unseen data',
        'To increase file size',
        'To remove labels',
        'To avoid preprocessing'
      ],
      correctAnswer: 0
    }
  ],

  'LLM Fundamentals': [
    {
      question: 'What does LLM stand for?',
      options: [
        'Large Language Model',
        'Local Logic Machine',
        'Language Learning Module',
        'Large Learning Memory'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is a token in an LLM?',
      options: [
        'A unit of text processed by the model',
        'A database password',
        'A web server',
        'A CSS property'
      ],
      correctAnswer: 0
    },
    {
      question: 'What are embeddings commonly used for?',
      options: [
        'Representing data as numerical vectors',
        'Styling web pages',
        'Compiling Java',
        'Creating CSS animations'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is RAG?',
      options: [
        'Retrieval Augmented Generation',
        'Random AI Generation',
        'Remote Application Gateway',
        'Recursive Agent Graph'
      ],
      correctAnswer: 0
    }
  ],

  'Advanced Arrays & Strings': [
    {
      question: 'Which technique is useful for many contiguous subarray problems?',
      options: [
        'Sliding Window',
        'Inheritance',
        'Recursion only',
        'Database joins'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is a prefix sum used for?',
      options: [
        'Efficient range-sum calculations',
        'Sorting strings only',
        'Creating classes',
        'Rendering UI'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is hashing commonly used for?',
      options: [
        'Fast lookup',
        'CSS styling',
        'Network routing only',
        'Image rendering'
      ],
      correctAnswer: 0
    },
    {
      question: 'Binary search requires what general property?',
      options: [
        'A searchable ordered structure',
        'A database connection',
        'A graph only',
        'A linked list only'
      ],
      correctAnswer: 0
    }
  ],

  'Database Queries': [
    {
      question: 'Which SQL clause filters grouped results?',
      options: ['HAVING', 'WHERE only', 'GROUP', 'FILTERBY'],
      correctAnswer: 0
    },
    {
      question: 'What is an index mainly used for?',
      options: [
        'Improving query lookup performance',
        'Deleting records',
        'Encrypting passwords',
        'Creating users'
      ],
      correctAnswer: 0
    },
    {
      question: 'What does ACID describe?',
      options: [
        'Properties of reliable database transactions',
        'A CSS framework',
        'A programming language',
        'A network protocol'
      ],
      correctAnswer: 0
    },
    {
      question: 'What is normalization used for?',
      options: [
        'Reducing redundancy and improving data organization',
        'Increasing duplicate data',
        'Rendering pages',
        'Compressing images'
      ],
      correctAnswer: 0
    }
  ]
};


// ============================================================
// GENERIC QUIZ GENERATOR
// ============================================================

const generateQuizQuestions = (moduleTitle) => {
  if (quizQuestions[moduleTitle]) {
    return quizQuestions[moduleTitle];
  }

  return [
    {
      question: `Which statement best describes ${moduleTitle}?`,
      options: [
        `It is an important concept covered in ${moduleTitle}`,
        'It is unrelated to software development',
        'It only applies to hardware repair',
        'It is only used for graphic design'
      ],
      correctAnswer: 0
    },
    {
      question: `Why should you practice ${moduleTitle}?`,
      options: [
        'To improve practical understanding',
        'To avoid learning the concepts',
        'To remove the need for testing',
        'To eliminate documentation'
      ],
      correctAnswer: 0
    },
    {
      question: `What is a good way to learn ${moduleTitle}?`,
      options: [
        'Study concepts and build practical examples',
        'Only memorize keywords',
        'Never practice',
        'Skip all exercises'
      ],
      correctAnswer: 0
    },
    {
      question: `What should you do after completing ${moduleTitle}?`,
      options: [
        'Review and solve practice problems',
        'Delete your project',
        'Ignore errors',
        'Skip the next topic permanently'
      ],
      correctAnswer: 0
    }
  ];
};


// ============================================================
// QUIZ UPSERT / REPAIR
// ============================================================

const upsertModuleQuiz = async (course, module, moduleNumber) => {

  const courseId = course._id;

  const title =
    `${course.title} - Module ${moduleNumber} Practice: ${module.title}`;

  const questions = generateQuizQuestions(module.title);

  // First try to find a quiz using the NEW correct title.
  let quiz = await Quiz.findOne({
    title,
    courseId
  });

  if (!quiz) {

    // If the previous version of this script created a quiz
    // for this module number, reuse it instead of creating
    // another quiz.
    const possiblePrefix =
      `${course.title} - Module ${moduleNumber} Practice:`;

    quiz = await Quiz.findOne({
      courseId,
      title: { $regex: `^${escapeRegex(possiblePrefix)}` }
    });
  }

  if (quiz) {

    quiz.title = title;
    quiz.courseTitle = course.title;
    quiz.courseId = courseId;
    quiz.durationMinutes = 10;
    quiz.passingScore = 60;
    quiz.questions = questions;

    await quiz.save();

    return {
      action: 'updated',
      title
    };
  }

  await Quiz.create({
    title,
    courseTitle: course.title,
    courseId,
    durationMinutes: 10,
    passingScore: 60,
    questions
  });

  return {
    action: 'added',
    title
  };
};


// Escape regex characters for MongoDB regex searches.
const escapeRegex = (value) => {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};


// ============================================================
// MAIN COURSE PROCESSOR
// ============================================================

const processCourse = async (course) => {

  const blueprint = getBlueprint(course);

  if (!blueprint || !blueprint.modules) {
    console.log(`! No blueprint found for: ${course.title}`);
    return {
      course: course.title,
      modulesAdded: 0,
      modulesUpdated: 0,
      quizzesAdded: 0,
      quizzesUpdated: 0
    };
  }

  const courseId = String(course._id);
  const moduleBlueprints = [...blueprint.modules, ...buildExtraBlueprints(course)];

  if (!Array.isArray(course.modules)) {
    course.modules = [];
  }

  let modulesAdded = 0;
  let modulesUpdated = 0;
  let quizzesAdded = 0;
  let quizzesUpdated = 0;

  // ----------------------------------------------------------
  // MODULES
  // ----------------------------------------------------------

  for (let i = 0; i < moduleBlueprints.length; i++) {

    const moduleNumber = i + 1;
    const moduleBlueprint = moduleBlueprints[i];

    const moduleId = `exp_${courseId}_${moduleNumber}`;

    let existingModule = course.modules.find(
      (module) =>
        String(module.moduleId || '') === moduleId
    );

    if (existingModule) {

      updateExistingModule(
        course,
        existingModule,
        moduleNumber,
        moduleBlueprint
      );

      modulesUpdated++;

      console.log(
        `~ Module repaired: ${course.title} -> Module ${moduleNumber}: ${moduleBlueprint.title}`
      );

    } else {

      const newModule = createModule(
        course,
        moduleNumber,
        moduleBlueprint
      );

      course.modules.push(newModule);

      modulesAdded++;

      console.log(
        `+ Module added: ${course.title} -> Module ${moduleNumber}: ${moduleBlueprint.title}`
      );
    }
  }

  // ----------------------------------------------------------
  // SAVE COURSE
  // ----------------------------------------------------------

  await course.save();

  // ----------------------------------------------------------
  // QUIZZES
  // ----------------------------------------------------------

  for (let i = 0; i < moduleBlueprints.length; i++) {

    const moduleNumber = i + 1;

    const moduleId =
      `exp_${courseId}_${moduleNumber}`;

    const module = course.modules.find(
      (item) =>
        String(item.moduleId || '') === moduleId
    );

    if (!module) {
      continue;
    }

    const quizResult = await upsertModuleQuiz(
      course,
      module,
      moduleNumber
    );

    if (quizResult.action === 'added') {
      quizzesAdded++;

      console.log(
        `+ Quiz added: ${quizResult.title}`
      );
    } else {
      quizzesUpdated++;

      console.log(
        `~ Quiz repaired: ${quizResult.title}`
      );
    }
  }

  return {
    course: course.title,
    modulesAdded,
    modulesUpdated,
    quizzesAdded,
    quizzesUpdated
  };
};


// ============================================================
// MAIN
// ============================================================

const run = async () => {

  try {

    console.log('');
    console.log('==============================================');
    console.log(' SAFE COURSE EXPANSION / REPAIR');
    console.log('==============================================');
    console.log('');
    console.log('No courses will be deleted.');
    console.log('No users will be deleted.');
    console.log('No existing quizzes will be deleted.');
    console.log('Existing expansion lesson IDs will be preserved.');
    console.log('');

    // Connect using the project's existing DB configuration.
    await connectDB();

    console.log('');
    console.log(
      `MongoDB database: ${mongoose.connection.name}`
    );

    const courses = await Course.find({});

    console.log(
      `Total courses found: ${courses.length}`
    );

    console.log('');

    let totalModulesAdded = 0;
    let totalModulesUpdated = 0;
    let totalQuizzesAdded = 0;
    let totalQuizzesUpdated = 0;

    // --------------------------------------------------------
    // PROCESS EVERY COURSE
    // --------------------------------------------------------

    for (const course of courses) {

      try {

        const result = await processCourse(course);

        totalModulesAdded += result.modulesAdded;
        totalModulesUpdated += result.modulesUpdated;
        totalQuizzesAdded += result.quizzesAdded;
        totalQuizzesUpdated += result.quizzesUpdated;

      } catch (courseError) {

        console.error('');
        console.error(
          `ERROR processing course: ${course.title}`
        );
        console.error(courseError.message);
        console.error('');

        // Continue processing the remaining courses.
        continue;
      }
    }

    // --------------------------------------------------------
    // SUMMARY
    // --------------------------------------------------------

    console.log('');
    console.log('==============================================');
    console.log(' COURSE EXPANSION COMPLETE');
    console.log('==============================================');
    console.log('');

    console.log(
      `Modules added   : ${totalModulesAdded}`
    );

    console.log(
      `Modules repaired: ${totalModulesUpdated}`
    );

    console.log(
      `Quizzes added   : ${totalQuizzesAdded}`
    );

    console.log(
      `Quizzes repaired: ${totalQuizzesUpdated}`
    );

    console.log('');

    console.log(
      'Existing courses, users and progress were NOT deleted.'
    );

    console.log('');

  } catch (error) {

    console.error('');
    console.error('==============================================');
    console.error(' COURSE EXPANSION FAILED');
    console.error('==============================================');
    console.error('');
    console.error(error);
    console.error('');

    process.exitCode = 1;

  } finally {

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      // Ignore connection-close errors.
    }
  }
};


// ============================================================
// START
// ============================================================

run();