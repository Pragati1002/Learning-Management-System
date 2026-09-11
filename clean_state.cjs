const fs = require('fs');
const path = require('path');

function save(relPath, content) {
  const p = path.join(__dirname, relPath);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('Saved:', relPath);
}

// 1. Clean mockData.js with zero pre-awarded certificates and zero pre-completed lessons
save('src/data/mockData.js', `

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
`);

console.log('mockData.js updated with clean state.');
