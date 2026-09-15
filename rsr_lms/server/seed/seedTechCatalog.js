// SAFE TECH CATALOG RESTORE
// Adds missing courses only. It NEVER deletes users, enrollments, progress,
// certificates, quizzes, jobs, assignments, or existing courses.
// Run with: npm run seed:tech
require('dotenv').config();

const connectDB = require('../config/db');
const Course = require('../models/Course');
const { SEED_COURSES } = require('./Courseseeddata');

const extraCourses = [["HTML5 & CSS3 From Zero to Responsive Websites", "Web Development"], ["Modern JavaScript ES2025", "Programming"], ["TypeScript Complete Developer Guide", "Programming"], ["React.js Complete Frontend Development", "Web Development"], ["Next.js Full Stack Development", "Web Development"], ["Vue.js 3 & Composition API", "Web Development"], ["Angular Complete Guide", "Web Development"], ["Node.js & Express REST API Development", "Web Development"], ["NestJS Backend Development", "Web Development"], ["Django Full Stack Development with Python", "Web Development"], ["Flask Web Development with Python", "Web Development"], ["Spring Boot REST API with Java", "Web Development"], ["ASP.NET Core Web API with C#", "Web Development"], ["PHP & Laravel Web Development", "Web Development"], ["GraphQL API Development", "Web Development"], ["WebSockets & Real-Time Applications", "Web Development"], ["Responsive Web Design & Accessibility", "Web Development"], ["Tailwind CSS Modern UI Development", "Web Development"], ["Bootstrap 5 Web Development", "Web Development"], ["JavaScript Testing with Jest & React Testing Library", "Software Testing"], ["Data Structures & Algorithms in Java", "Programming"], ["Data Structures & Algorithms in Python", "Programming"], ["Data Structures & Algorithms in C++", "Programming"], ["Competitive Programming Fundamentals", "Programming"], ["Python Programming Zero to Advanced", "Programming"], ["C++ Programming Complete Course", "Programming"], ["C Programming Fundamentals", "Programming"], ["Go Programming Language Complete Guide", "Programming"], ["Rust Programming Fundamentals", "Programming"], ["Kotlin Programming for Developers", "Programming"], ["Swift Programming & iOS Development", "Mobile Development"], ["Flutter & Dart App Development", "Mobile Development"], ["Android Development with Kotlin", "Mobile Development"], ["React Native Cross-Platform Development", "Mobile Development"], ["Python for Data Analysis with Pandas", "Data Science"], ["NumPy for Data Science", "Data Science"], ["SQL for Data Analysis", "Data Science"], ["Power BI Data Analytics", "Data Science"], ["Tableau Data Visualization", "Data Science"], ["Statistics for Data Science", "Data Science"], ["Machine Learning with Python", "AI & Machine Learning"], ["Deep Learning with TensorFlow", "AI & Machine Learning"], ["Deep Learning with PyTorch", "AI & Machine Learning"], ["Natural Language Processing with Python", "AI & Machine Learning"], ["Computer Vision with OpenCV", "AI & Machine Learning"], ["Generative AI & LLM Application Development", "AI & Machine Learning"], ["Prompt Engineering & AI Productivity", "AI & Machine Learning"], ["RAG Applications with Vector Databases", "AI & Machine Learning"], ["AI Agents & Agentic AI Development", "AI & Machine Learning"], ["MLOps & Machine Learning Deployment", "AI & Machine Learning"], ["MySQL Complete Database Course", "Databases"], ["PostgreSQL Complete Developer Guide", "Databases"], ["MongoDB & Mongoose Development", "Databases"], ["Redis Caching & Data Structures", "Databases"], ["Database Design & SQL Optimization", "Databases"], ["Oracle Database & SQL Fundamentals", "Databases"], ["AWS Cloud Practitioner & Cloud Fundamentals", "Cloud & DevOps"], ["AWS Solutions Architect Fundamentals", "Cloud & DevOps"], ["Microsoft Azure Fundamentals", "Cloud & DevOps"], ["Google Cloud Platform Fundamentals", "Cloud & DevOps"], ["Docker & Containerization", "Cloud & DevOps"], ["Kubernetes for Developers", "Cloud & DevOps"], ["Jenkins CI/CD Pipeline Development", "Cloud & DevOps"], ["GitHub Actions CI/CD", "Cloud & DevOps"], ["Terraform Infrastructure as Code", "Cloud & DevOps"], ["Ansible Automation", "Cloud & DevOps"], ["Linux Administration", "Cloud & DevOps"], ["DevOps Engineering Complete Guide", "Cloud & DevOps"], ["Cybersecurity Fundamentals", "Cybersecurity"], ["Ethical Hacking & Penetration Testing", "Cybersecurity"], ["Network Security Fundamentals", "Cybersecurity"], ["Web Application Security", "Cybersecurity"], ["OWASP Top 10 Security", "Cybersecurity"], ["Digital Forensics Fundamentals", "Cybersecurity"], ["CompTIA Security+ Preparation", "Cybersecurity"], ["Network Fundamentals & TCP/IP", "Networking"], ["Cisco CCNA Networking Fundamentals", "Networking"], ["System Design for Software Engineers", "Software Engineering"], ["Object-Oriented Design & Design Patterns", "Software Engineering"], ["Software Architecture Fundamentals", "Software Engineering"], ["Agile & Scrum for Software Teams", "Software Engineering"], ["Git & GitHub Complete Developer Guide", "Developer Tools"], ["VS Code Complete Developer Guide", "Developer Tools"], ["Postman API Testing & Development", "Developer Tools"], ["Linux Command Line for Developers", "Developer Tools"], ["Figma UI/UX Design Fundamentals", "UI/UX Design"], ["User Experience Design Fundamentals", "UI/UX Design"], ["Software Testing & QA Automation", "Software Testing"], ["Selenium WebDriver with Java", "Software Testing"], ["Playwright End-to-End Testing", "Software Testing"], ["Cypress Modern Web Testing", "Software Testing"]];

const imagePool = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
];

const slug = (value) => value
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const makeModules = (title, id) => {
  const topics = [
    `Getting Started with ${title}`,
    `${title}: Core Concepts`,
    `${title}: Practical Development`,
    `${title}: Real-World Project`
  ];

  return topics.map((moduleTitle, moduleIndex) => ({
    moduleId: `${id}-m${moduleIndex + 1}`,
    title: `Module ${moduleIndex + 1}: ${moduleTitle}`,
    lessons: [
      {
        lessonId: `${id}-m${moduleIndex + 1}-l1`,
        title: `${moduleTitle} — Fundamentals`,
        duration: '25 min',
        videoUrl: '',
        notes: `Learn the essential concepts and terminology for ${title}.`,
        resources: []
      },
      {
        lessonId: `${id}-m${moduleIndex + 1}-l2`,
        title: `${moduleTitle} — Hands-on Practice`,
        duration: '35 min',
        videoUrl: '',
        notes: `Practice ${title} through guided examples and exercises.`,
        resources: []
      },
      {
        lessonId: `${id}-m${moduleIndex + 1}-l3`,
        title: `${moduleTitle} — Interview & Project Skills`,
        duration: '30 min',
        videoUrl: '',
        notes: `Apply what you learned in interview questions and project tasks.`,
        resources: []
      }
    ]
  }));
};

const buildExtraCourse = ([title, category], index) => {
  const id = `tech-${slug(title)}`;
  return {
    title,
    category,
    description: `Career-focused ${category.toLowerCase()} course covering ${title}. Learn concepts, practical workflows, interview skills, and project-based techniques.`,
    duration: index % 3 === 0 ? '10 Weeks' : index % 3 === 1 ? '8 Weeks' : '12 Weeks',
    level: index % 4 === 0 ? 'Beginner' : 'Beginner to Advanced',
    instructor: 'RSR LMS Instructor',
    instructorId: 'usr_admin',
    thumbnail: imagePool[index % imagePool.length],
    price: index % 5 === 0 ? 0 : [499, 699, 899, 999][index % 4],
    originalPrice: index % 5 === 0 ? 0 : 1999,
    enrolledCount: 25 + ((index * 17) % 900),
    rating: Number((4.4 + ((index * 7) % 6) / 10).toFixed(1)),
    reviewsCount: 40 + ((index * 37) % 900),
    modules: makeModules(title, id)
  };
};

const run = async () => {
  await connectDB();

  let added = 0;
  let existing = 0;

  // First restore any of the original 21 catalog courses that are missing.
  for (const source of SEED_COURSES) {
    const { mockId, ...course } = source;
    const found = await Course.findOne({ title: course.title });
    if (found) {
      existing++;
      continue;
    }

    await Course.create(course);
    added++;
    console.log(`Added original course: ${course.title}`);
  }

  // Then add the expanded technology catalog.
  for (let i = 0; i < extraCourses.length; i++) {
    const course = buildExtraCourse(extraCourses[i], i);
    const found = await Course.findOne({ title: course.title });

    if (found) {
      existing++;
      continue;
    }

    await Course.create(course);
    added++;
    console.log(`Added tech course: ${course.title}`);
  }

  const total = await Course.countDocuments();

  console.log('\n======================================');
  console.log('RSR LMS TECH CATALOG RESTORE COMPLETE');
  console.log('======================================');
  console.log(`New courses added : ${added}`);
  console.log(`Already existed   : ${existing}`);
  console.log(`Total courses now  : ${total}`);
  console.log('NO existing records were deleted.');
  console.log('======================================\n');

  process.exit(0);
};

run().catch((err) => {
  console.error('Tech catalog restore failed:', err);
  process.exit(1);
});
