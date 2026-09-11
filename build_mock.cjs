const fs = require('fs');
const path = require('path');

function write(filePath, content) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Successfully wrote:', filePath);
}

const mockDataContent = `

export const INITIAL_COURSES = [
  {
    id: 'c_fullstack',
    title: 'Full Stack Web Development Masterclass (MERN & Next.js)',
    category: 'Software Engineering',
    rating: 4.9,
    reviewsCount: 340,
    price: 499,
    originalPrice: 799,
    duration: '16 Weeks',
    level: 'Beginner to Advanced',
    instructor: 'Prof. Priya Menon',
    instructorId: 'usr_trainer',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80',
    description: 'Master modern frontend & backend development from scratch. Build production-ready scalable cloud applications with React, Next.js, Node.js, Express, MongoDB, and Tailwind CSS.',
    enrolledCount: 1250,
    modules: [
      {
        id: 'fs_m1',
        title: 'Module 1: HTML5, Modern CSS & Tailwind Framework',
        lessons: [
          { id: 'fs_m1_l1', title: '1. Semantic HTML & DOM Anatomy', duration: '22 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/kUMe1FH4CHE', resources: ['Cheatsheet.pdf', 'Starter-Code.zip'] },
          { id: 'fs_m1_l2', title: '2. Flexbox, CSS Grid & Responsive Design', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/fYq5PXgSsbE', resources: ['Layout-Guide.pdf'] },
          { id: 'fs_m1_l3', title: '3. Tailwind CSS in Action', duration: '40 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/dFgzHOX84xQ', resources: ['Tailwind-Config.json'] }
        ]
      },
      {
        id: 'fs_m2',
        title: 'Module 2: JavaScript Mastery & ES6+',
        lessons: [
          { id: 'fs_m2_l1', title: '4. Async JavaScript, Promises & Event Loop', duration: '45 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/PoRJizFvM7s', resources: ['Async-Notes.pdf'] },
          { id: 'fs_m2_l2', title: '5. Functional Programming & Array Methods', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c', resources: ['Exercises.js'] }
        ]
      },
      {
        id: 'fs_m3',
        title: 'Module 3: React 18, State, & Fullstack Architecture',
        lessons: [
          { id: 'fs_m3_l1', title: '6. Component Architecture & Custom Hooks', duration: '50 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8', resources: ['React-Best-Practices.pdf'] },
          { id: 'fs_m3_l2', title: '7. REST APIs & Fullstack Node Integration', duration: '60 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE', resources: ['API-Boilerplate.zip'] }
        ]
      }
    ]
  },
  {
    id: 'c_ai',
    title: 'Applied AI & Data Science with Python & LLMs',
    category: 'Artificial Intelligence',
    rating: 4.95,
    reviewsCount: 412,
    price: 599,
    originalPrice: 899,
    duration: '14 Weeks',
    level: 'Intermediate',
    instructor: 'Prof. Priya Menon',
    instructorId: 'usr_trainer',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=80',
    description: 'Practical training on Machine Learning, Deep Neural Networks, Generative AI, LangChain, embeddings, and fine-tuning transformer models.',
    enrolledCount: 980,
    modules: [
      {
        id: 'ai_m1',
        title: 'Module 1: Python for Data Science & NumPy',
        lessons: [
          { id: 'ai_m1_l1', title: '1. NumPy & Vectorized Computations', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/QUT1VHiLmmI', resources: ['Numpy_Tutorial.ipynb'] },
          { id: 'ai_m1_l2', title: '2. Pandas Data Wrangling & Cleaning', duration: '45 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg', resources: ['Datasets.zip'] }
        ]
      },
      {
        id: 'ai_m2',
        title: 'Module 2: Machine Learning Algorithms',
        lessons: [
          { id: 'ai_m2_l1', title: '3. Regression & Classification with Scikit-Learn', duration: '50 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/0Lt9w-BxKFQ', resources: ['ML_Cheatsheet.pdf'] }
        ]
      }
    ]
  },
  {
    id: 'c_devops',
    title: 'Cloud Computing & DevOps: AWS, Docker, Kubernetes & CI/CD',
    category: 'Cloud & Infrastructure',
    rating: 4.85,
    reviewsCount: 220,
    price: 549,
    originalPrice: 750,
    duration: '12 Weeks',
    level: 'Intermediate to Advanced',
    instructor: 'David Vance',
    instructorId: 'usr_trainer',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80',
    description: 'Learn containerization, Kubernetes orchestration, Infrastructure as Code with Terraform, and robust automated GitHub Actions CI/CD pipelines on AWS.',
    enrolledCount: 760,
    modules: [
      {
        id: 'devops_m1',
        title: 'Module 1: Docker Containers & Multi-stage Builds',
        lessons: [
          { id: 'devops_m1_l1', title: '1. Container Fundamentals & Dockerfile', duration: '40 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/fqMOX6JJhGo', resources: ['Docker_Commands.pdf'] }
        ]
      }
    ]
  },
  {
    id: 'c_uiux',
    title: 'UI/UX Design Systems & Product Strategy (Figma to Code)',
    category: 'Design & Product',
    rating: 4.88,
    reviewsCount: 195,
    price: 399,
    originalPrice: 599,
    duration: '10 Weeks',
    level: 'All Levels',
    instructor: 'Elena Rostova',
    instructorId: 'usr_trainer',
    thumbnail: 'https://images.unsplash.com/photo-1581291518655-9523c932deda?w=600&auto=format&fit=crop&q=80',
    description: 'Master human-centered UI/UX design principles, design tokens, Figma auto-layout, wireframing, high-fidelity prototypes, and user usability testing.',
    enrolledCount: 610,
    modules: [
      {
        id: 'ui_m1',
        title: 'Module 1: Design Thinking & Wireframing',
        lessons: [
          { id: 'ui_m1_l1', title: '1. User Journey Mapping & Heuristics', duration: '30 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU', resources: ['Figma_Kit.fig'] }
        ]
      }
    ]
  },
  {
    id: 'c_security',
    title: 'Cyber Security, Ethical Hacking & Network Defense',
    category: 'Security',
    rating: 4.92,
    reviewsCount: 280,
    price: 499,
    originalPrice: 699,
    duration: '12 Weeks',
    level: 'Intermediate',
    instructor: 'Marcus Brody',
    instructorId: 'usr_trainer',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    description: 'Comprehensive cybersecurity foundations, OWASP Top 10 vulnerabilities, penetration testing methodologies, network packet analysis with Wireshark, and defensive cryptography.',
    enrolledCount: 540,
    modules: [
      {
        id: 'sec_m1',
        title: 'Module 1: Network Security & Port Scanning',
        lessons: [
          { id: 'sec_m1_l1', title: '1. TCP/IP Handshakes & Wireshark Analysis', duration: '35 min', type: 'video', videoUrl: 'https://www.youtube.com/embed/4_Z124q7a_8', resources: ['Network_Sec.pdf'] }
        ]
      }
    ]
  }
];

export const INITIAL_BATCHES = [
  {
    id: 'b_fs_2026_a',
    name: 'Batch FS-2026-A (Morning Cohort)',
    courseId: 'c_fullstack',
    courseName: 'Full Stack Web Development',
    trainerName: 'Prof. Priya Menon',
    trainerId: 'usr_trainer',
    studentsCount: 28,
    schedule: 'Mon, Wed, Fri (09:00 AM - 11:00 AM IST)',
    startDate: '2026-02-01',
    endDate: '2026-05-30',
    status: 'In Progress',
    roomLink: 'https://meet.google.com/lms-fs-2026',
    attendance: [
      { studentId: 'usr_student', studentName: 'Aarav Patel', rollNo: 'LMS-2026-001', present: 24, total: 25, percentage: 96 },
      { studentId: 'usr_stu2', studentName: 'Sneha Verma', rollNo: 'LMS-2026-002', present: 23, total: 25, percentage: 92 },
      { studentId: 'usr_stu3', studentName: 'Rohan Deshmukh', rollNo: 'LMS-2026-003', present: 20, total: 25, percentage: 80 },
      { studentId: 'usr_stu4', studentName: 'Ananya Iyer', rollNo: 'LMS-2026-004', present: 25, total: 25, percentage: 100 }
    ]
  },
  {
    id: 'b_ai_2026_b',
    name: 'Batch AI-2026-B (Evening Fastrack)',
    courseId: 'c_ai',
    courseName: 'Applied AI & Data Science',
    trainerName: 'Prof. Priya Menon',
    trainerId: 'usr_trainer',
    studentsCount: 22,
    schedule: 'Tue, Thu, Sat (06:30 PM - 08:30 PM IST)',
    startDate: '2026-03-01',
    endDate: '2026-06-15',
    status: 'In Progress',
    roomLink: 'https://meet.google.com/lms-ai-2026',
    attendance: [
      { studentId: 'usr_student', studentName: 'Aarav Patel', rollNo: 'LMS-2026-001', present: 18, total: 20, percentage: 90 },
      { studentId: 'usr_stu5', studentName: 'Karthik Raja', rollNo: 'LMS-2026-005', present: 19, total: 20, percentage: 95 }
    ]
  }
];

export const INITIAL_QUIZZES = [
  {
    id: 'q_react_core',
    title: 'React 18 & State Architecture Assessment',
    courseId: 'c_fullstack',
    courseTitle: 'Full Stack Web Development',
    durationMinutes: 15,
    totalQuestions: 5,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is the primary benefit of React Virtual DOM reconciler (Fiber)?',
        options: [
          'Directly executes code in native assembly for 100x speed',
          'Computes minimal DOM diffs to avoid expensive real DOM manipulations',
          'Stores all browser history in LocalStorage automatically',
          'Replaces all CSS stylesheets with inline SVG styles'
        ],
        correctAnswer: 1,
        explanation: 'The Virtual DOM allows React to compute changes in memory and update only the specific DOM nodes that changed.'
      },
      {
        id: 2,
        question: 'Which React Hook should be utilized to perform side effects such as fetching data?',
        options: ['useMemo', 'useReducer', 'useEffect', 'useCallback'],
        correctAnswer: 2,
        explanation: 'useEffect is specifically designed for side effects like API requests, subscriptions, and DOM updates.'
      },
      {
        id: 3,
        question: 'What does the dependency array in useEffect do when passed an empty array []?',
        options: [
          'Runs the effect on every single component re-render',
          'Disables the effect permanently',
          'Runs the effect only once when the component mounts',
          'Causes an immediate infinite render loop'
        ],
        correctAnswer: 2,
        explanation: 'An empty dependency array indicates the effect depends on no state variables and only executes upon mounting.'
      },
      {
        id: 4,
        question: 'In Tailwind CSS, which class applies a flexbox container with centered items both vertically and horizontally?',
        options: ['flex justify-center items-center', 'display-flex center-all', 'grid place-none', 'flex-align-all'],
        correctAnswer: 0,
        explanation: 'flex justify-center items-center aligns items along both the primary and cross axes in Tailwind.'
      },
      {
        id: 5,
        question: 'What is the purpose of CORS headers in Node.js Express server?',
        options: [
          'Compresses JSON responses for high bandwidth',
          'Allows or restricts requested resources on a web server depending on the requester origin domain',
          'Encrypts SQL queries using AES-256',
          'Increases RAM speed on Linux servers'
        ],
        correctAnswer: 1,
        explanation: 'CORS (Cross-Origin Resource Sharing) is a security mechanism that allows or restricts cross-domain HTTP requests.'
      }
    ]
  },
  {
    id: 'q_python_ai',
    title: 'Python, NumPy & Vector Math Assessment',
    courseId: 'c_ai',
    courseTitle: 'Applied AI & Data Science',
    durationMinutes: 12,
    totalQuestions: 4,
    passingScore: 75,
    questions: [
      {
        id: 1,
        question: 'Why is NumPy significantly faster than native Python lists for array calculations?',
        options: [
          'NumPy uses contiguous C memory buffers and vectorized CPU SIMD instructions',
          'NumPy converts all numbers into strings behind the scenes',
          'Python lists do not support integer math',
          'NumPy requires cloud GPU execution for every operation'
        ],
        correctAnswer: 0,
        explanation: 'NumPy executes calculations in compiled C routines using contiguous memory blocks without Python interpreter overhead.'
      },
      {
        id: 2,
        question: 'In supervised learning, what metric is typically minimized in linear regression?',
        options: ['Cross-Entropy Loss', 'Mean Squared Error (MSE)', 'Gini Impurity', 'BLEU Score'],
        correctAnswer: 1,
        explanation: 'Linear regression finds line weights that minimize the Mean Squared Error (MSE) between actual and predicted values.'
      },
      {
        id: 3,
        question: 'What is overfitting in machine learning models?',
        options: [
          'Model performs exceptionally on training data but poorly on unseen test data',
          'Model learns too slowly during gradient descent',
          'Model has too few parameters to capture simple patterns',
          'Model crashes when given GPU memory'
        ],
        correctAnswer: 0,
        explanation: 'Overfitting occurs when a model memorizes noise in training data instead of generalizing true patterns.'
      },
      {
        id: 4,
        question: 'What is the function of the activation function (like ReLU) in Deep Neural Networks?',
        options: [
          'It introduces non-linearity, enabling the network to learn complex non-linear patterns',
          'It resets all weights to zero at every epoch',
          'It translates Python code into JavaScript',
          'It generates PDF report summaries automatically'
        ],
        correctAnswer: 0,
        explanation: 'Without non-linear activations like ReLU, deep neural networks would collapse into a single linear transformation.'
      }
    ]
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg_1',
    title: 'Build a Fullstack REST API with JWT Authentication',
    courseId: 'c_fullstack',
    courseName: 'Full Stack Web Development',
    dueDate: '2026-08-30',
    totalPoints: 100,
    description: 'Develop an Express.js backend with user registration, login, bcrypt password hashing, and JWT bearer token middleware protection.',
    submissions: [
      {
        studentId: 'usr_student',
        studentName: 'Aarav Patel',
        submittedAt: '2026-08-24T14:30:00Z',
        githubUrl: 'https://github.com/aarav/jwt-auth-express',
        status: 'Graded',
        score: 95,
        feedback: 'Excellent code structure and clean middleware implementation. Unit tests with Jest covered all edge cases!'
      }
    ]
  },
  {
    id: 'asg_2',
    title: 'Predict House Prices using Scikit-Learn & Feature Engineering',
    courseId: 'c_ai',
    courseName: 'Applied AI & Data Science',
    dueDate: '2026-09-05',
    totalPoints: 100,
    description: 'Clean missing data, perform one-hot encoding on categorical features, and train Random Forest & XGBoost models with cross-validation.',
    submissions: [
      {
        studentId: 'usr_student',
        studentName: 'Aarav Patel',
        submittedAt: '2026-08-25T11:00:00Z',
        githubUrl: 'https://github.com/aarav/house-price-prediction-ml',
        status: 'Submitted (Pending Review)',
        score: null,
        feedback: null
      }
    ]
  }
];

export const INITIAL_FEES = [
  {
    invoiceId: 'INV-2026-0891',
    studentId: 'usr_student',
    studentName: 'Aarav Patel',
    courseName: 'Full Stack Web Development',
    amount: 499,
    discount: 50,
    paidAmount: 449,
    status: 'Paid',
    dueDate: '2026-02-15',
    paidDate: '2026-02-14',
    paymentMethod: 'UPI / Razorpay',
    transactionId: 'TXN_9874129841'
  },
  {
    invoiceId: 'INV-2026-0902',
    studentId: 'usr_student',
    studentName: 'Aarav Patel',
    courseName: 'Applied AI & Data Science Masterclass',
    amount: 599,
    discount: 0,
    paidAmount: 599,
    status: 'Paid',
    dueDate: '2026-03-10',
    paidDate: '2026-03-08',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN_1092837461'
  },
  {
    invoiceId: 'INV-2026-1044',
    studentId: 'usr_stu2',
    studentName: 'Sneha Verma',
    courseName: 'Cloud Computing & DevOps: AWS & K8s',
    amount: 549,
    discount: 49,
    paidAmount: 0,
    status: 'Pending',
    dueDate: '2026-09-01',
    paidDate: null,
    paymentMethod: null,
    transactionId: null
  }
];

export const INITIAL_CERTIFICATES = [
  {
    certificateId: 'LMS-CERT-2026-8841',
    studentId: 'usr_student',
    studentName: 'Aarav Patel',
    courseId: 'c_fullstack',
    courseName: 'Full Stack Web Development Masterclass',
    issueDate: '2026-08-20',
    score: '96%',
    grade: 'A+ (Distinction)',
    instructor: 'Prof. Priya Menon',
    verified: true,
    verificationUrl: 'https://lms.edu/verify/LMS-CERT-2026-8841'
  }
];

export const INITIAL_LEADS = [
  {
    id: 'lead_1',
    name: 'Rohan Kulkarni',
    email: 'rohan.k@gmail.com',
    phone: '+91 98234 11223',
    courseInterest: 'Applied AI & Data Science',
    stage: 'Demo Scheduled',
    counselor: 'Dr. Rajesh Sharma',
    notes: 'Requested weekend batch. Scheduled demo class for Saturday 10 AM.',
    createdDate: '2026-08-22'
  },
  {
    id: 'lead_2',
    name: 'Meera Nambiar',
    email: 'meera.n@yahoo.com',
    phone: '+91 97456 99881',
    courseInterest: 'Full Stack Web Development',
    stage: 'Contacted',
    counselor: 'Dr. Rajesh Sharma',
    notes: 'Interested in placement assistance. Sent syllabus brochure via WhatsApp.',
    createdDate: '2026-08-24'
  },
  {
    id: 'lead_3',
    name: 'Tanmay Bhattacharya',
    email: 'tanmay.b@outlook.com',
    phone: '+91 99100 44321',
    courseInterest: 'Cloud Computing & DevOps',
    stage: 'Enrolled',
    counselor: 'Dr. Rajesh Sharma',
    notes: 'Fee paid in full. Assigned to Batch CLOUD-2026-C.',
    createdDate: '2026-08-20'
  }
];

export const INITIAL_PLACEMENTS = [
  {
    id: 'job_1',
    company: 'Google Cloud Partner Labs',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&auto=format&fit=crop&q=80',
    role: 'Associate Cloud Software Engineer',
    location: 'Bangalore / Remote',
    package: '14 - 18 LPA',
    deadline: '2026-09-15',
    eligibility: 'Min 80% in Full Stack / DevOps, No active backlogs',
    openings: 8,
    applicants: [
      { studentId: 'usr_student', studentName: 'Aarav Patel', appliedDate: '2026-08-23', status: 'Interview Shortlisted' }
    ]
  },
  {
    id: 'job_2',
    company: 'Microsoft AI Center',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    role: 'Junior Machine Learning Engineer',
    location: 'Hyderabad / Hybrid',
    package: '16 - 22 LPA',
    deadline: '2026-09-20',
    eligibility: 'Min 85% in AI Masterclass, Python & Deep Learning proficiency',
    openings: 5,
    applicants: [
      { studentId: 'usr_student', studentName: 'Aarav Patel', appliedDate: '2026-08-24', status: 'Under Review' }
    ]
  },
  {
    id: 'job_3',
    company: 'Infosys FinTech Solutions',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    role: 'React / Next.js Frontend Specialist',
    location: 'Pune / Chennai',
    package: '9 - 12 LPA',
    deadline: '2026-09-10',
    eligibility: 'Certified Fullstack graduate',
    openings: 15,
    applicants: []
  }
];

export const INITIAL_DISCUSSIONS = [
  {
    id: 'disc_1',
    author: 'Aarav Patel',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    courseId: 'c_fullstack',
    title: 'How to optimize Next.js Server Component re-renders with caching?',
    content: 'I noticed my fetch request was re-executing despite having revalidate set. Should I use unstable_cache or React cache()?',
    upvotes: 14,
    tags: ['Next.js', 'Performance', 'React18'],
    createdAt: '2 Hours ago',
    replies: [
      {
        author: 'Prof. Priya Menon (Trainer)',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        content: 'Great question Aarav! Next.js fetch() is cached by default in Data Cache unless you specify cache: "no-store". For non-fetch database calls, use React cache() wrapped around your ORM query.',
        createdAt: '1 Hour ago'
      }
    ]
  },
  {
    id: 'disc_2',
    author: 'Sneha Verma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    courseId: 'c_ai',
    title: 'Understanding Loss divergence in Adam Optimizer vs SGD',
    content: 'When training my neural network with learning rate 0.01, Adam diverges while SGD with momentum converges smoothly. Why?',
    upvotes: 8,
    tags: ['Deep Learning', 'PyTorch', 'Optimizers'],
    createdAt: 'Yesterday',
    replies: []
  }
];

export const INITIAL_TICKETS = [
  {
    id: 'TCK-1082',
    subject: 'Request for Live Class Recording Access from last Friday',
    studentName: 'Aarav Patel',
    studentId: 'usr_student',
    category: 'Academic / Recordings',
    priority: 'Normal',
    status: 'Resolved',
    createdAt: '2026-08-22',
    resolutionNotes: 'Updated LMS video drive access link in your student dashboard.'
  },
  {
    id: 'TCK-1090',
    subject: 'Invoice GST details update for corporate reimbursement',
    studentName: 'Sneha Verma',
    studentId: 'usr_stu2',
    category: 'Billing & Accounts',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-08-25',
    resolutionNotes: 'Under review by Accounts department.'
  }
];

export const INITIAL_LIVE_CLASSES = [
  {
    id: 'live_1',
    batchId: 'b_fs_2026_a',
    title: 'Live Workshop: Building High-Performance Microservices with Node.js & Redis',
    trainer: 'Prof. Priya Menon',
    date: 'Today, 04:00 PM - 06:00 PM IST',
    status: 'Live Now',
    joinUrl: 'https://meet.google.com/lms-live-demo',
    agenda: 'Architecture breakdown, pub/sub queues, rate limiting, and live coding.',
    attendees: 32
  },
  {
    id: 'live_2',
    batchId: 'b_ai_2026_b',
    title: 'Q&A & Hands-on: Fine-Tuning Llama 3 with LoRA & Hugging Face',
    trainer: 'Prof. Priya Menon',
    date: 'Tomorrow, 06:00 PM - 08:00 PM IST',
    status: 'Scheduled',
    joinUrl: 'https://meet.google.com/lms-ai-live',
    agenda: 'Parameter efficient fine tuning, dataset preparation, and evaluation loss.',
    attendees: 28
  }
];
`;

write('src/data/mockData.js', mockDataContent);
console.log('Finished writing mock data.');
