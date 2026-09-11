const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. Cleaned up mockData.js with real educational courses & clean accounts
save('src/data/mockData.js', `


export const INITIAL_COURSES = [
  {
    id: 'c_webdev',
    title: 'Full Stack Web Development',
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
    description: 'Learn modern web development from the ground up: HTML5 semantic structure, CSS3 responsive layouts, JavaScript ES6+, and React application architecture.',
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
            resources: ['HTML5_CheatSheet.pdf', 'Starter_Template.html'] 
          },
          { 
            id: 'web_m1_l2', 
            title: '2. Modern CSS: Flexbox & Grid Layouts', 
            duration: '35 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/fYq5PXgSsbE', 
            resources: ['CSS_Layout_Guide.pdf'] 
          },
          { 
            id: 'web_m1_l3', 
            title: '3. Responsive Web Design & Media Queries', 
            duration: '28 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/srvUrASNj0s', 
            resources: ['Responsive_Breakpoints.pdf'] 
          }
        ]
      },
      {
        id: 'web_m2',
        title: 'Module 2: JavaScript Essentials & DOM Manipulation',
        lessons: [
          { 
            id: 'web_m2_l1', 
            title: '4. JavaScript Variables, Data Types & Functions', 
            duration: '30 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk', 
            resources: ['JS_Basics.js'] 
          },
          { 
            id: 'web_m2_l2', 
            title: '5. Asynchronous JavaScript, Promises & Fetch API', 
            duration: '40 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/PoRJizFvM7s', 
            resources: ['Async_Programming.pdf'] 
          }
        ]
      },
      {
        id: 'web_m3',
        title: 'Module 3: React Fundamentals & Component State',
        lessons: [
          { 
            id: 'web_m3_l1', 
            title: '6. React Components, Props, and useState', 
            duration: '45 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8', 
            resources: ['React_Quickstart.pdf'] 
          },
          { 
            id: 'web_m3_l2', 
            title: '7. React Hooks: useEffect & Context API', 
            duration: '50 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/00lxm_doFYw', 
            resources: ['Hooks_Reference.pdf'] 
          }
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
    description: 'A comprehensive guide to Python programming, data structures, object-oriented concepts, NumPy arrays, and Pandas data analysis.',
    enrolledCount: 38,
    modules: [
      {
        id: 'py_m1',
        title: 'Module 1: Python Core Syntax & Data Structures',
        lessons: [
          { 
            id: 'py_m1_l1', 
            title: '1. Python Setup, Variables, Lists & Dictionaries', 
            duration: '25 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8', 
            resources: ['Python_Basics.py'] 
          },
          { 
            id: 'py_m1_l2', 
            title: '2. Control Flow, Loops, and Functions', 
            duration: '35 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/9Os0o3wzS_I', 
            resources: ['Functions_Practice.py'] 
          }
        ]
      },
      {
        id: 'py_m2',
        title: 'Module 2: Data Analysis with NumPy & Pandas',
        lessons: [
          { 
            id: 'py_m2_l1', 
            title: '3. NumPy Arrays & Vectorized Calculations', 
            duration: '40 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/QUT1VHiLmmI', 
            resources: ['NumPy_Notebook.ipynb'] 
          },
          { 
            id: 'py_m2_l2', 
            title: '4. Pandas DataFrames & Data Cleaning', 
            duration: '45 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg', 
            resources: ['Sample_Dataset.csv'] 
          }
        ]
      }
    ]
  },
  {
    id: 'c_git',
    title: 'Git, GitHub & Modern DevOps Workflows',
    category: 'Tools & DevOps',
    rating: 4.8,
    reviewsCount: 60,
    price: 0,
    originalPrice: 0,
    duration: '4 Weeks',
    level: 'Beginner',
    instructor: 'Administrator',
    instructorId: 'usr_admin',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80',
    description: 'Master version control with Git, branching strategies, collaborative workflows on GitHub, Pull Requests, and automated CI/CD pipelines.',
    enrolledCount: 29,
    modules: [
      {
        id: 'git_m1',
        title: 'Module 1: Version Control with Git',
        lessons: [
          { 
            id: 'git_m1_l1', 
            title: '1. Git Basics: Init, Commit, Branch, and Merge', 
            duration: '30 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/RGOj5yH7evk', 
            resources: ['Git_Cheatsheet.pdf'] 
          },
          { 
            id: 'git_m1_l2', 
            title: '2. GitHub Collaboration, PRs & Merge Conflicts', 
            duration: '35 min', 
            type: 'video', 
            videoUrl: 'https://www.youtube.com/embed/HkdAHXoRtos', 
            resources: ['Workflow_Guide.pdf'] 
          }
        ]
      }
    ]
  }
];

export const INITIAL_QUIZZES = [
  {
    id: 'q_webdev_cert',
    title: 'Web Development Core Certification Quiz',
    courseId: 'c_webdev',
    courseTitle: 'Full Stack Web Development',
    durationMinutes: 15,
    totalQuestions: 4,
    passingScore: 75,
    questions: [
      {
        id: 1,
        question: 'Which HTML5 tag is used to specify a header for a document or section?',
        options: ['<head>', '<header>', '<top>', '<section-head>'],
        correctAnswer: 1,
        explanation: '<header> represents introductory content or navigation links.'
      },
      {
        id: 2,
        question: 'What is the key advantage of CSS Flexbox for one-dimensional layouts?',
        options: [
          'It replaces JavaScript completely',
          'It automatically distributes space and aligns items along a single axis',
          'It only works in desktop browsers',
          'It forces every element to have absolute positioning'
        ],
        correctAnswer: 1,
        explanation: 'Flexbox is designed for one-dimensional layouts and dynamically calculates space and alignment.'
      },
      {
        id: 3,
        question: 'In JavaScript, which method is used to parse a JSON string into a JavaScript object?',
        options: ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'parseJSON()'],
        correctAnswer: 1,
        explanation: 'JSON.parse() converts a valid JSON string into a corresponding JavaScript object.'
      },
      {
        id: 4,
        question: 'In React, what Hook is used to maintain local state in a functional component?',
        options: ['useState', 'useRef', 'useContext', 'useMemo'],
        correctAnswer: 0,
        explanation: 'useState allows functional components to declare and update state variables.'
      }
    ]
  },
  {
    id: 'q_python_cert',
    title: 'Python Programming Fundamentals Quiz',
    courseId: 'c_python',
    courseTitle: 'Python Programming & Data Science',
    durationMinutes: 12,
    totalQuestions: 3,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'Which data type in Python is mutable and ordered?',
        options: ['Tuple', 'List', 'String', 'Set'],
        correctAnswer: 1,
        explanation: 'Lists in Python are ordered and mutable sequences.'
      },
      {
        id: 2,
        question: 'What is the correct syntax to define a function in Python?',
        options: ['function myFunc():', 'def myFunc():', 'fn myFunc():', 'define myFunc():'],
        correctAnswer: 1,
        explanation: 'Python uses the "def" keyword to define functions.'
      },
      {
        id: 3,
        question: 'What library is primarily used for tabular data manipulation in Python?',
        options: ['Pandas', 'Flask', 'Django', 'Requests'],
        correctAnswer: 0,
        explanation: 'Pandas provides DataFrames and tools for analyzing and cleaning structured data.'
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
    studentsCount: 15,
    schedule: 'Mon & Wed (06:00 PM - 07:30 PM)',
    status: 'Active',
    attendance: [
      { studentId: 'usr_student', studentName: 'Student Learner', rollNo: 'LMS-001', present: 12, total: 12, percentage: 100 }
    ]
  }
];

export const INITIAL_CERTIFICATES = [
  {
    certificateId: 'LMS-CERT-2026-101',
    studentId: 'usr_student',
    studentName: 'Student Learner',
    courseId: 'c_webdev',
    courseName: 'Full Stack Web Development',
    issueDate: '2026-08-26',
    score: '95%',
    grade: 'A+ (Excellence)',
    instructor: 'Administrator',
    verified: true
  }
];

export const INITIAL_DISCUSSIONS = [
  {
    id: 'disc_1',
    author: 'Student Learner',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    courseId: 'c_webdev',
    title: 'How does React useState trigger component re-renders?',
    content: 'When I update state via setState, does React re-render only the child components or the entire component tree?',
    upvotes: 4,
    tags: ['React', 'State', 'Frontend'],
    createdAt: 'Today',
    replies: [
      {
        author: 'Administrator',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        content: 'When setState is called, React schedules a re-render for that specific component and its children (unless optimized with React.memo).',
        createdAt: '1 hour ago'
      }
    ]
  }
];
`);

console.log('Cleaned mockData.js written.');
