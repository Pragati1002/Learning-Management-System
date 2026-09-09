export const INITIAL_USERS = [
  {
    id: 'usr_admin',
    name: 'Administrator',
    email: 'admin@lms.com',
    password: 'admin',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    title: 'Platform Administrator & Instructor'
  },
  {
    id: 'usr_student',
    name: 'Student Learner',
    email: 'student@lms.com',
    password: 'student',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    title: 'Registered Student',
    enrolledCourses: ['c_webdev', 'c_python'],
    completedLessons: [],
    points: 0
  }
];

export const INITIAL_COURSES = [
  {
    id: 'c_webdev',
    title: 'Full Stack Web Development: Zero to Hero',
    category: 'Web Development',
    rating: 4.9,
    reviewsCount: 120,
    price: 0,
    originalPrice: 0,
    duration: '12 Weeks',
    level: 'Beginner to Advanced',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
    description: 'Learn modern web development: HTML5 semantic structure, CSS3 responsive layout, JavaScript ES6+, and React state architecture.',
    enrolledCount: 45,
    modules: [
      {
        id: 'web_m1',
        title: 'Module 1: HTML5 & Modern CSS Fundamentals',
        lessons: [
          { 
            id: 'web_m1_l1', 
            title: '1. Semantic HTML5 & Document Structure', 
            duration: '20 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE', 
            resources: ['HTML5_CheatSheet.pdf'] 
          },
          { 
            id: 'web_m1_l2', 
            title: '2. Modern CSS: Flexbox & Grid Layouts', 
            duration: '35 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/fYq5PXgSsbE', 
            resources: ['CSS_Layout_Guide.pdf'] 
          }
        ]
      },
      {
        id: 'web_m2',
        title: 'Module 2: JavaScript & React Foundations',
        lessons: [
          { 
            id: 'web_m2_l1', 
            title: '3. JavaScript ES6+ & Async Fetch API', 
            duration: '40 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/PoRJizFvM7s', 
            resources: ['Async_Notes.pdf'] 
          },
          { 
            id: 'web_m2_l2', 
            title: '4. React Components & useState Hook', 
            duration: '45 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8', 
            resources: ['React_Guide.pdf'] 
          }
        ]
      }
    ]
  },
  {
  id: 'c_java',
  title: 'Java Programming & OOP',
  category: 'Programming',
  rating: 4.5,
  reviewsCount: 28,
  price: 0,
  originalPrice: 0,
  duration: '10 Weeks',
  level: 'Beginner to Intermediate',
  instructor: 'Administrator',
  instructorId: 'usr_admin',
  thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
  description: 'Master core Java: syntax, OOP principles, collections, and exception handling — with interview-focused practice.',
  enrolledCount: 0,
  modules: [
    {
      id: 'java_m1',
      title: 'Module 1: Java Fundamentals',
      lessons: [
        { id: 'java_m1_l1', title: '1. Variables, Data Types & Operators', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34', resources: [] },
        { id: 'java_m1_l2', title: '2. Control Flow & Loops', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34', resources: [] }
      ]
    },
    {
      id: 'java_m2',
      title: 'Module 2: Object-Oriented Programming',
      lessons: [
        { id: 'java_m2_l1', title: '1. Classes, Objects & Constructors', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34', resources: [] },
        { id: 'java_m2_l2', title: '2. Inheritance, Interfaces & Polymorphism', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34', resources: [] }
      ]
    }
  ]
},
{
  id: 'c_csharp',
  title: 'C# Programming & .NET Basics',
  category: 'Programming',
  rating: 4.4,
  reviewsCount: 19,
  price: 0,
  originalPrice: 0,
  duration: '8 Weeks',
  level: 'Beginner',
  instructor: 'Administrator',
  instructorId: 'usr_admin',
  thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
  description: 'Get started with C# and the .NET ecosystem: syntax, OOP, and building simple console applications.',
  enrolledCount: 0,
  modules: [
    {
      id: 'cs_m1',
      title: 'Module 1: C# Basics',
      lessons: [
        { id: 'cs_m1_l1', title: '1. Setting Up .NET & Your First Program', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/GhQdlIFylQ8', resources: [] },
        { id: 'cs_m1_l2', title: '2. Variables, Types & Control Flow', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/GhQdlIFylQ8', resources: [] }
      ]
    }
  ]
},
  {
    id: 'c_python',
    title: 'Python Programming & Data Science Masterclass',
    category: 'Python & AI',
    rating: 4.9,
    reviewsCount: 95,
    price: 0,
    originalPrice: 0,
    duration: '10 Weeks',
    level: 'Beginner to Intermediate',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    description: 'A comprehensive guide to Python programming, data structures, and data analysis with NumPy and Pandas.',
    enrolledCount: 38,
    modules: [
      {
        id: 'py_m1',
        title: 'Module 1: Python Core Syntax',
        lessons: [
          { 
            id: 'py_m1_l1', 
            title: '1. Python Variables, Lists & Functions', 
            duration: '25 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8', 
            resources: ['Python_Basics.py'] 
          },
          { 
            id: 'py_m1_l2', 
            title: '2. NumPy Arrays & Pandas DataFrames', 
            duration: '40 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/QUT1VHiLmmI', 
            resources: ['Data_Analysis.ipynb'] 
          }
        ]
      }
    ]
  },
  {
    id: 'c_cpp',
    title: 'C++ Programming: Beginner to Advanced',
    category: 'Programming',
    rating: 4.6,
    reviewsCount: 41,
    price: 0,
    originalPrice: 0,
    duration: '10 Weeks',
    level: 'Beginner to Advanced',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80',
    description: 'Learn C++ from the ground up: syntax, pointers, memory management, OOP, and STL containers used across real interview questions.',
    enrolledCount: 0,
    modules: [
      {
        id: 'cpp_m1',
        title: 'Module 1: C++ Fundamentals',
        lessons: [
          { id: 'cpp_m1_l1', title: '1. Setup, Syntax & Data Types', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y', resources: [] },
          { id: 'cpp_m1_l2', title: '2. Pointers & Memory Management', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y', resources: [] }
        ]
      },
      {
        id: 'cpp_m2',
        title: 'Module 2: OOP & STL',
        lessons: [
          { id: 'cpp_m2_l1', title: '1. Classes, Objects & Constructors', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y', resources: [] },
          { id: 'cpp_m2_l2', title: '2. STL: Vectors, Maps & Iterators', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y', resources: [] }
        ]
      }
    ]
  },
  {
    id: 'c_dsa',
    title: 'Data Structures & Algorithms',
    category: 'Programming',
    rating: 4.8,
    reviewsCount: 67,
    price: 0,
    originalPrice: 0,
    duration: '12 Weeks',
    level: 'Intermediate',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
    description: 'Build a strong foundation in DSA — arrays, linked lists, trees, graphs, and common problem-solving patterns — for coding interviews.',
    enrolledCount: 0,
    modules: [
      {
        id: 'dsa_m1',
        title: 'Module 1: Arrays, Strings & Complexity',
        lessons: [
          { id: 'dsa_m1_l1', title: '1. Time & Space Complexity (Big O)', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/Mo4vesaut8g', resources: [] },
          { id: 'dsa_m1_l2', title: '2. Array & String Techniques', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/Mo4vesaut8g', resources: [] }
        ]
      },
      {
        id: 'dsa_m2',
        title: 'Module 2: Trees, Graphs & Patterns',
        lessons: [
          { id: 'dsa_m2_l1', title: '1. Binary Trees & Traversals', duration: '40 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/Mo4vesaut8g', resources: [] },
          { id: 'dsa_m2_l2', title: '2. BFS/DFS & Graph Basics', duration: '40 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/Mo4vesaut8g', resources: [] }
        ]
      }
    ]
  },
  {
    id: 'c_php',
    title: 'PHP & MySQL Web Development',
    category: 'Web Development',
    rating: 4.4,
    reviewsCount: 33,
    price: 0,
    originalPrice: 0,
    duration: '8 Weeks',
    level: 'Beginner',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&auto=format&fit=crop&q=80',
    description: 'Build dynamic, database-driven websites with PHP and MySQL — forms, sessions, CRUD operations, and basic OOP in PHP.',
    enrolledCount: 0,
    modules: [
      {
        id: 'php_m1',
        title: 'Module 1: PHP Basics',
        lessons: [
          { id: 'php_m1_l1', title: '1. PHP Syntax, Variables & Superglobals', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/OK_JCtrrv-c', resources: [] },
          { id: 'php_m1_l2', title: '2. Forms, Sessions & Cookies', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/OK_JCtrrv-c', resources: [] }
        ]
      },
      {
        id: 'php_m2',
        title: 'Module 2: MySQL & CRUD',
        lessons: [
          { id: 'php_m2_l1', title: '1. Connecting PHP to MySQL', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/OK_JCtrrv-c', resources: [] },
          { id: 'php_m2_l2', title: '2. Building CRUD Operations', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/OK_JCtrrv-c', resources: [] }
        ]
      }
    ]
  },
  {
    id: 'c_sql',
    title: 'SQL & Database Design',
    category: 'Databases',
    rating: 4.7,
    reviewsCount: 52,
    price: 0,
    originalPrice: 0,
    duration: '6 Weeks',
    level: 'Beginner to Intermediate',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80',
    description: 'Learn relational database design, SQL queries, joins, indexing, and normalization — essential for any backend developer.',
    enrolledCount: 0,
    modules: [
      {
        id: 'sql_m1',
        title: 'Module 1: SQL Fundamentals',
        lessons: [
          { id: 'sql_m1_l1', title: '1. SELECT, WHERE & Filtering Data', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY', resources: [] },
          { id: 'sql_m1_l2', title: '2. JOINs Explained', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY', resources: [] }
        ]
      },
      {
        id: 'sql_m2',
        title: 'Module 2: Database Design',
        lessons: [
          { id: 'sql_m2_l1', title: '1. Normalization & Schema Design', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY', resources: [] }
        ]
      }
    ]
  },
  {
    id: 'c_git',
    title: 'Git & GitHub for Developers',
    category: 'Developer Tools',
    rating: 4.8,
    reviewsCount: 44,
    price: 0,
    originalPrice: 0,
    duration: '3 Weeks',
    level: 'Beginner',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80',
    description: 'Master version control with Git and collaborative workflows on GitHub — branches, merges, pull requests, and resolving conflicts.',
    enrolledCount: 0,
    modules: [
      {
        id: 'git_m1',
        title: 'Module 1: Git Basics',
        lessons: [
          { id: 'git_m1_l1', title: '1. Init, Commit, Push & Pull', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk', resources: [] },
          { id: 'git_m1_l2', title: '2. Branching & Merging', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk', resources: [] }
        ]
      },
      {
        id: 'git_m2',
        title: 'Module 2: Collaborating on GitHub',
        lessons: [
          { id: 'git_m2_l1', title: '1. Pull Requests & Code Review', duration: '25 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk', resources: [] },
          { id: 'git_m2_l2', title: '2. Resolving Merge Conflicts', duration: '20 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk', resources: [] }
        ]
      }
    ]
  }
];

// Admin created quizzes associated with courses
export const INITIAL_QUIZZES = [
  {
    id: 'q_webdev_admin',
    title: 'Web Development Mastery Assessment (Admin Added)',
    courseId: 'c_webdev',
    courseTitle: 'Full Stack Web Development: Zero to Hero',
    durationMinutes: 15,
    totalQuestions: 3,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which HTML5 tag is used to specify navigation links?',
        options: ['<nav>', '<navigate>', '<links>', '<menu-bar>'],
        correctAnswer: 0,
        explanation: '<nav> is the standard semantic tag for website navigation links.'
      },
      {
        id: 2,
        question: 'In CSS, which display property activates Flexbox container alignment?',
        options: ['display: flex', 'display: box', 'display: inline-grid', 'display: block-flex'],
        correctAnswer: 0,
        explanation: 'display: flex activates the Flexbox formatting context.'
      },
      {
        id: 3,
        question: 'In React, what Hook manages state variables in functional components?',
        options: ['useState', 'useDOM', 'useVariable', 'useGlobal'],
        correctAnswer: 0,
        explanation: 'useState is the core React Hook for local component state.'
      }
    ]
  },
  {
    id: 'q_java',
    title: 'Java Fundamentals Quiz',
    courseId: 'c_java',
    courseTitle: 'Java Programming & OOP',
    durationMinutes: 10,
    totalQuestions: 3,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which keyword is used to inherit a class in Java?',
        options: ['implements', 'extends', 'inherits', 'super'],
        correctAnswer: 1,
        explanation: 'extends is used for class inheritance in Java; implements is for interfaces.'
      },
      {
        id: 2,
        question: 'What is the default value of a boolean variable in Java?',
        options: ['true', 'false', '0', 'null'],
        correctAnswer: 1,
        explanation: 'Uninitialized boolean instance variables default to false.'
      },
      {
        id: 3,
        question: 'Which method is the entry point of a Java program?',
        options: ['start()', 'run()', 'main()', 'init()'],
        correctAnswer: 2,
        explanation: 'public static void main(String[] args) is where JVM execution begins.'
      }
    ]
  },
  {
    id: 'q_csharp',
    title: 'C# Basics Quiz',
    courseId: 'c_csharp',
    courseTitle: 'C# Programming & .NET Basics',
    durationMinutes: 10,
    totalQuestions: 3,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which keyword declares a constant in C#?',
        options: ['final', 'const', 'static', 'readonly-only'],
        correctAnswer: 1,
        explanation: 'const declares a compile-time constant in C#.'
      },
      {
        id: 2,
        question: 'What is the correct file extension for a C# source file?',
        options: ['.java', '.cshp', '.cs', '.csx'],
        correctAnswer: 2,
        explanation: 'C# source files use the .cs extension.'
      },
      {
        id: 3,
        question: 'Which of these is NOT a value type in C#?',
        options: ['int', 'struct', 'string', 'bool'],
        correctAnswer: 2,
        explanation: 'string is a reference type in C#, even though it behaves immutably like a value type.'
      }
    ]
  }
];

export const INITIAL_BATCHES = [
  {
    id: 'b_active_cohort',
    name: 'Main Learning Cohort 2026',
    courseId: 'c_webdev',
    courseName: 'Full Stack Web Development',
    trainerName: 'Administrator',
    studentsCount: 1,
    schedule: 'Mon & Wed (06:00 PM - 07:30 PM)',
    status: 'Active',
    attendance: [
      { studentId: 'usr_student', studentName: 'Student Learner', rollNo: 'LMS-001', present: 0, total: 0, percentage: 100 }
    ]
  }
];

// Zero pre-awarded certificates: must be earned by completing 100% course lessons
export const INITIAL_CERTIFICATES = [];

export const INITIAL_MOCK_TESTS = [
  {
    id: 'mt_aptitude_1',
    title: 'Aptitude Mock Test 1',
    totalMarks: 50,
    sections: [
      {
        id: 'mt1_quant',
        title: 'Quantitative Aptitude',
        durationMinutes: 15,
        questions: [
          { id: 'mt1_q1', question: 'A train travels 60 km in 45 minutes. What is its speed in km/h?', options: ['70 km/h', '80 km/h', '75 km/h', '90 km/h'], correctAnswer: 1 },
          { id: 'mt1_q2', question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correctAnswer: 2 },
          { id: 'mt1_q3', question: 'If x + 5 = 12, what is x?', options: ['5', '6', '7', '8'], correctAnswer: 2 }
        ]
      },
      {
        id: 'mt1_reasoning',
        title: 'Reasoning Ability',
        durationMinutes: 15,
        questions: [
          { id: 'mt1_q4', question: 'Find the odd one out: Apple, Mango, Carrot, Banana', options: ['Apple', 'Mango', 'Carrot', 'Banana'], correctAnswer: 2 },
          { id: 'mt1_q5', question: 'Complete the series: 2, 4, 8, 16, __', options: ['20', '24', '32', '30'], correctAnswer: 2 }
        ]
      },
      {
        id: 'mt1_english',
        title: 'English Language',
        durationMinutes: 10,
        questions: [
          { id: 'mt1_q6', question: 'Choose the correctly spelled word:', options: ['Recieve', 'Receive', 'Receeve', 'Receve'], correctAnswer: 1 }
        ]
      },
      {
        id: 'mt1_gk',
        title: 'General Awareness',
        durationMinutes: 10,
        questions: [
          { id: 'mt1_q7', question: 'Which is the capital of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], correctAnswer: 2 }
        ]
      }
    ]
  }
];

export const INITIAL_INTERVIEW_TRACKS = [
  {
    id: 'iv_java_dev',
    role: 'Java Developer',
    interviewerName: 'AI Interviewer',
    questions: [
      { id: 'iv_j_q1', question: 'Tell me about yourself and your experience with Java.' },
      { id: 'iv_j_q2', question: 'What is the difference between == and .equals() in Java?' },
      { id: 'iv_j_q3', question: 'Explain the concept of inheritance with an example.' },
      { id: 'iv_j_q4', question: 'What are the differences between an interface and an abstract class?' },
      { id: 'iv_j_q5', question: 'How does exception handling work in Java?' }
    ]
  },
  {
    id: 'iv_fullstack_dev',
    role: 'Full Stack Developer',
    interviewerName: 'AI Interviewer',
    questions: [
      { id: 'iv_f_q1', question: 'Walk me through a recent project you built end-to-end.' },
      { id: 'iv_f_q2', question: 'What is the difference between == and === in JavaScript?' },
      { id: 'iv_f_q3', question: 'How would you optimize a slow-loading React page?' },
      { id: 'iv_f_q4', question: 'Explain how you would design a REST API for a course catalog.' },
      { id: 'iv_f_q5', question: 'What is the difference between SQL and NoSQL databases?' }
    ]
  }
];

export const INITIAL_JOBS = [
  { id: 'job_1', title: 'Full Stack Developer', company: 'TCS', location: 'Bangalore', type: 'Full-time', postedTime: '2h ago', skills: ['React', 'Node.js', 'MongoDB'] },
  { id: 'job_2', title: 'Frontend Developer', company: 'Infosys', location: 'Bangalore', type: 'Full-time', postedTime: '5h ago', skills: ['React', 'CSS', 'JavaScript'] },
  { id: 'job_3', title: 'React Developer', company: 'Wipro', location: 'Hyderabad', type: 'Full-time', postedTime: '1d ago', skills: ['React', 'Redux', 'Tailwind'] },
  { id: 'job_4', title: 'Node JS Developer', company: 'Tech Mahindra', location: 'Pune', type: 'Full-time', postedTime: '1d ago', skills: ['Node.js', 'Express', 'MySQL'] },
  { id: 'job_5', title: 'Junior Software Engineer', company: 'Capgemini', location: 'Bangalore', type: 'Full-time', postedTime: '3d ago', skills: ['Java', 'Spring Boot', 'SQL'] },
  { id: 'job_6', title: 'MERN Stack Developer', company: 'Accenture', location: 'Remote', type: 'Full-time', postedTime: '4d ago', skills: ['MongoDB', 'Express', 'React', 'Node.js'] }
];

export const INITIAL_LIVE_CLASSES = [
  {
    id: 'lc_1',
    courseId: 'c_webdev',
    courseTitle: 'Full Stack Web Development: Zero to Hero',
    title: 'Live Doubt-Clearing: React Hooks',
    instructor: 'Administrator',
    date: '2026-09-10',
    time: '6:00 PM - 7:00 PM',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/new'
  },
  {
    id: 'lc_2',
    courseId: 'c_java',
    courseTitle: 'Java Programming & OOP',
    title: 'Live Session: OOP Concepts Deep Dive',
    instructor: 'Administrator',
    date: '2026-09-11',
    time: '7:00 PM - 8:00 PM',
    platform: 'Zoom',
    meetingLink: 'https://zoom.us/j/1234567890'
  },
  {
    id: 'lc_3',
    courseId: 'c_python',
    courseTitle: 'Python Programming & Data Science Masterclass',
    title: 'Live Session: Pandas for Data Analysis',
    instructor: 'Administrator',
    date: '2026-09-12',
    time: '6:30 PM - 7:30 PM',
    platform: 'Google Meet',
    meetingLink: 'https://meet.google.com/new'
  }
];

export const INITIAL_DISCUSSIONS = [
  {
    id: 'disc_1',
    author: 'Student Learner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    courseId: 'c_webdev',
    title: 'How does React useState trigger component re-renders?',
    content: 'When setState is called, how does React update the Virtual DOM?',
    upvotes: 2,
    tags: ['React', 'Frontend'],
    createdAt: 'Today',
    replies: [
      {
        author: 'Administrator',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        content: 'React schedules a render pass for that component, computes the Virtual DOM diff, and commits minimal changes to the real DOM.',
        createdAt: '1 hour ago'
      }
    ]
  }
];

// Student-submitted course reviews. Ratings/reviewsCount on INITIAL_COURSES are the
// starting display numbers; getCourseReviews() in LMSContext recalculates the live
// average once real reviews exist for a course.
export const INITIAL_REVIEWS = [
  {
    id: 'rev_1',
    courseId: 'c_webdev',
    studentId: 'usr_student',
    studentName: 'Student Learner',
    rating: 5,
    comment: 'Really well structured — the React section finally made hooks click for me.',
    createdAt: '2026-08-20'
  }
];
