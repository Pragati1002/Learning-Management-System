// RSR LMS mock/fallback data.
// NOTE: at runtime, courses/batches/reviews here are only used as an
// initial placeholder before the real backend data loads (see LMSContext.jsx).
// The authoritative catalog lives in the database via server/seed/seed.js.

export const INITIAL_COURSES = [
  {
    "id": "c_webdev",
    "title": "Full Stack Web Development",
    "category": "Web Development",
    "rating": 4.9,
    "reviewsCount": 120,
    "price": 0,
    "originalPrice": 0,
    "duration": "12 Weeks",
    "level": "Beginner to Advanced",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80",
    "description": "Learn modern web development: HTML5 semantic structure, CSS3 responsive layout, JavaScript ES6+, and React state architecture.",
    "enrolledCount": 45,
    "modules": [
      {
        "id": "web_m1",
        "title": "Module 1: HTML5 & Modern CSS Fundamentals",
        "lessons": [
          {
            "id": "web_m1_l1",
            "title": "1. Semantic HTML5 & Document Structure",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": [
              "HTML5_CheatSheet.pdf"
            ]
          },
          {
            "id": "web_m1_l2",
            "title": "2. Modern CSS: Flexbox & Grid Layouts",
            "duration": "35 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": [
              "CSS_Layout_Guide.pdf"
            ]
          }
        ]
      },
      {
        "id": "web_m2",
        "title": "Module 2: JavaScript & React Foundations",
        "lessons": [
          {
            "id": "web_m2_l1",
            "title": "3. JavaScript ES6+ & Async Fetch API",
            "duration": "40 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": [
              "Async_Notes.pdf"
            ]
          },
          {
            "id": "web_m2_l2",
            "title": "4. React Components & useState Hook",
            "duration": "45 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": [
              "React_Guide.pdf"
            ]
          }
        ]
      },
      {
        "id": "c_webdev_m3",
        "title": "Module 3: Backend with Node.js & Express",
        "lessons": [
          {
            "id": "c_webdev_m3_l1",
            "title": "5. Building REST APIs with Express",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          },
          {
            "id": "c_webdev_m3_l2",
            "title": "6. Connecting to MongoDB with Mongoose",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      },
      {
        "id": "c_webdev_m4",
        "title": "Module 4: Deployment & Real-World Project",
        "lessons": [
          {
            "id": "c_webdev_m4_l1",
            "title": "7. Authentication with JWT",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "c_webdev_m4_l2",
            "title": "8. Deploying Your Full Stack App",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_java",
    "title": "Java Programming & OOP",
    "category": "Programming",
    "rating": 4.5,
    "reviewsCount": 28,
    "price": 0,
    "originalPrice": 0,
    "duration": "10 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    "description": "Master core Java: syntax, OOP principles, collections, and exception handling — with interview-focused practice.",
    "enrolledCount": 0,
    "modules": [
      {
        "id": "java_m1",
        "title": "Module 1: Java Fundamentals",
        "lessons": [
          {
            "id": "java_m1_l1",
            "title": "1. Variables, Data Types & Operators",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          },
          {
            "id": "java_m1_l2",
            "title": "2. Control Flow & Loops",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      },
      {
        "id": "java_m2",
        "title": "Module 2: Object-Oriented Programming",
        "lessons": [
          {
            "id": "java_m2_l1",
            "title": "1. Classes, Objects & Constructors",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          },
          {
            "id": "java_m2_l2",
            "title": "2. Inheritance, Interfaces & Polymorphism",
            "duration": "35 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      },
      {
        "id": "c_java_m3",
        "title": "Module 3: Collections & Exception Handling",
        "lessons": [
          {
            "id": "c_java_m3_l1",
            "title": "5. ArrayList, HashMap & Collections Framework",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          },
          {
            "id": "c_java_m3_l2",
            "title": "6. Try-Catch, Custom Exceptions & Finally",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          }
        ]
      },
      {
        "id": "c_java_m4",
        "title": "Module 4: File I/O & Interview Prep",
        "lessons": [
          {
            "id": "c_java_m4_l1",
            "title": "7. File Handling & Streams in Java",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "c_java_m4_l2",
            "title": "8. Common Java Interview Coding Problems",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_csharp",
    "title": "C# Programming & .NET Basics",
    "category": "Programming",
    "rating": 4.4,
    "reviewsCount": 19,
    "price": 0,
    "originalPrice": 0,
    "duration": "8 Weeks",
    "level": "Beginner",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80",
    "description": "Get started with C# and the .NET ecosystem: syntax, OOP, and building simple console applications.",
    "enrolledCount": 0,
    "modules": [
      {
        "id": "cs_m1",
        "title": "Module 1: C# Basics",
        "lessons": [
          {
            "id": "cs_m1_l1",
            "title": "1. Setting Up .NET & Your First Program",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          },
          {
            "id": "cs_m1_l2",
            "title": "2. Variables, Types & Control Flow",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_csharp_m2",
        "title": "Module 2: Object-Oriented C#",
        "lessons": [
          {
            "id": "c_csharp_m2_l1",
            "title": "3. Classes, Objects & Constructors",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          },
          {
            "id": "c_csharp_m2_l2",
            "title": "4. Inheritance & Polymorphism in C#",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_csharp_m3",
        "title": "Module 3: Collections & LINQ",
        "lessons": [
          {
            "id": "c_csharp_m3_l1",
            "title": "5. Lists, Dictionaries & Arrays",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          },
          {
            "id": "c_csharp_m3_l2",
            "title": "6. Querying Data with LINQ",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          }
        ]
      },
      {
        "id": "c_csharp_m4",
        "title": "Module 4: Building Console Applications",
        "lessons": [
          {
            "id": "c_csharp_m4_l1",
            "title": "7. Exception Handling in .NET",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          },
          {
            "id": "c_csharp_m4_l2",
            "title": "8. Building a Mini Console Project",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_python",
    "title": "Python Programming & Data Science Masterclass",
    "category": "Python & AI",
    "rating": 4.9,
    "reviewsCount": 95,
    "price": 0,
    "originalPrice": 0,
    "duration": "10 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "description": "A comprehensive guide to Python programming, data structures, and data analysis with NumPy and Pandas.",
    "enrolledCount": 38,
    "modules": [
      {
        "id": "py_m1",
        "title": "Module 1: Python Core Syntax",
        "lessons": [
          {
            "id": "py_m1_l1",
            "title": "1. Python Variables, Lists & Functions",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": [
              "Python_Basics.py"
            ]
          },
          {
            "id": "py_m1_l2",
            "title": "2. NumPy Arrays & Pandas DataFrames",
            "duration": "40 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": [
              "Data_Analysis.ipynb"
            ]
          }
        ]
      },
      {
        "id": "c_python_m2",
        "title": "Module 2: Data Structures & Functions",
        "lessons": [
          {
            "id": "c_python_m2_l1",
            "title": "3. Lists, Dictionaries, Tuples & Sets",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          },
          {
            "id": "c_python_m2_l2",
            "title": "4. Functions, Lambdas & Modules",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          }
        ]
      },
      {
        "id": "c_python_m3",
        "title": "Module 3: NumPy & Pandas for Data Science",
        "lessons": [
          {
            "id": "c_python_m3_l1",
            "title": "5. NumPy Arrays & Vectorized Operations",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          },
          {
            "id": "c_python_m3_l2",
            "title": "6. Data Analysis with Pandas DataFrames",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          }
        ]
      },
      {
        "id": "c_python_m4",
        "title": "Module 4: Data Visualization & Mini Project",
        "lessons": [
          {
            "id": "c_python_m4_l1",
            "title": "7. Data Visualization with Matplotlib",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          },
          {
            "id": "c_python_m4_l2",
            "title": "8. End-to-End Data Analysis Project",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_cpp",
    "title": "C++ Programming: Beginner to Advanced",
    "category": "Programming",
    "rating": 4.6,
    "reviewsCount": 41,
    "price": 0,
    "originalPrice": 0,
    "duration": "10 Weeks",
    "level": "Beginner to Advanced",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=80",
    "description": "Learn C++ from the ground up: syntax, pointers, memory management, OOP, and STL containers used across real interview questions.",
    "enrolledCount": 0,
    "modules": [
      {
        "id": "cpp_m1",
        "title": "Module 1: C++ Fundamentals",
        "lessons": [
          {
            "id": "cpp_m1_l1",
            "title": "1. Setup, Syntax & Data Types",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          },
          {
            "id": "cpp_m1_l2",
            "title": "2. Pointers & Memory Management",
            "duration": "35 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          }
        ]
      },
      {
        "id": "cpp_m2",
        "title": "Module 2: OOP & STL",
        "lessons": [
          {
            "id": "cpp_m2_l1",
            "title": "1. Classes, Objects & Constructors",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          },
          {
            "id": "cpp_m2_l2",
            "title": "2. STL: Vectors, Maps & Iterators",
            "duration": "35 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          }
        ]
      },
      {
        "id": "c_cpp_m3",
        "title": "Module 3: OOP & Memory Management",
        "lessons": [
          {
            "id": "c_cpp_m3_l1",
            "title": "5. Classes, Constructors & Destructors",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          },
          {
            "id": "c_cpp_m3_l2",
            "title": "6. Pointers, References & Dynamic Memory",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_cpp_m4",
        "title": "Module 4: STL & Advanced Concepts",
        "lessons": [
          {
            "id": "c_cpp_m4_l1",
            "title": "7. Standard Template Library (STL)",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          },
          {
            "id": "c_cpp_m4_l2",
            "title": "8. Templates & Operator Overloading",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_dsa",
    "title": "Data Structures & Algorithms",
    "category": "Programming",
    "rating": 4.8,
    "reviewsCount": 67,
    "price": 0,
    "originalPrice": 0,
    "duration": "12 Weeks",
    "level": "Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    "description": "Build a strong foundation in DSA — arrays, linked lists, trees, graphs, and common problem-solving patterns — for coding interviews.",
    "enrolledCount": 0,
    "modules": [
      {
        "id": "dsa_m1",
        "title": "Module 1: Arrays, Strings & Complexity",
        "lessons": [
          {
            "id": "dsa_m1_l1",
            "title": "1. Time & Space Complexity (Big O)",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "dsa_m1_l2",
            "title": "2. Array & String Techniques",
            "duration": "35 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          }
        ]
      },
      {
        "id": "dsa_m2",
        "title": "Module 2: Trees, Graphs & Patterns",
        "lessons": [
          {
            "id": "dsa_m2_l1",
            "title": "1. Binary Trees & Traversals",
            "duration": "40 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "dsa_m2_l2",
            "title": "2. BFS/DFS & Graph Basics",
            "duration": "40 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          }
        ]
      },
      {
        "id": "c_dsa_m3",
        "title": "Module 3: Trees & Graphs",
        "lessons": [
          {
            "id": "c_dsa_m3_l1",
            "title": "5. Binary Trees & Binary Search Trees",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          },
          {
            "id": "c_dsa_m3_l2",
            "title": "6. Graph Representations & Traversals (BFS/DFS)",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_dsa_m4",
        "title": "Module 4: Dynamic Programming & Interview Prep",
        "lessons": [
          {
            "id": "c_dsa_m4_l1",
            "title": "7. Dynamic Programming Fundamentals",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          },
          {
            "id": "c_dsa_m4_l2",
            "title": "8. Top Interview Problems Walkthrough",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_php",
    "title": "PHP & MySQL Web Development",
    "category": "Web Development",
    "rating": 4.4,
    "reviewsCount": 33,
    "price": 0,
    "originalPrice": 0,
    "duration": "8 Weeks",
    "level": "Beginner",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?w=600&auto=format&fit=crop&q=80",
    "description": "Build dynamic, database-driven websites with PHP and MySQL — forms, sessions, CRUD operations, and basic OOP in PHP.",
    "enrolledCount": 0,
    "modules": [
      {
        "id": "php_m1",
        "title": "Module 1: PHP Basics",
        "lessons": [
          {
            "id": "php_m1_l1",
            "title": "1. PHP Syntax, Variables & Superglobals",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          },
          {
            "id": "php_m1_l2",
            "title": "2. Forms, Sessions & Cookies",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      },
      {
        "id": "php_m2",
        "title": "Module 2: MySQL & CRUD",
        "lessons": [
          {
            "id": "php_m2_l1",
            "title": "1. Connecting PHP to MySQL",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          },
          {
            "id": "php_m2_l2",
            "title": "2. Building CRUD Operations",
            "duration": "35 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      },
      {
        "id": "c_php_m3",
        "title": "Module 3: Working with MySQL",
        "lessons": [
          {
            "id": "c_php_m3_l1",
            "title": "5. Connecting PHP to MySQL with PDO",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "c_php_m3_l2",
            "title": "6. Building CRUD Operations",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      },
      {
        "id": "c_php_m4",
        "title": "Module 4: Sessions, Auth & Mini Project",
        "lessons": [
          {
            "id": "c_php_m4_l1",
            "title": "7. Sessions, Cookies & Authentication",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          },
          {
            "id": "c_php_m4_l2",
            "title": "8. Building a Simple PHP + MySQL App",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_sql",
    "title": "SQL & Database Design",
    "category": "Databases",
    "rating": 4.7,
    "reviewsCount": 52,
    "price": 0,
    "originalPrice": 0,
    "duration": "6 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
    "description": "Learn relational database design, SQL queries, joins, indexing, and normalization — essential for any backend developer.",
    "enrolledCount": 0,
    "modules": [
      {
        "id": "sql_m1",
        "title": "Module 1: SQL Fundamentals",
        "lessons": [
          {
            "id": "sql_m1_l1",
            "title": "1. SELECT, WHERE & Filtering Data",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          },
          {
            "id": "sql_m1_l2",
            "title": "2. JOINs Explained",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      },
      {
        "id": "sql_m2",
        "title": "Module 2: Database Design",
        "lessons": [
          {
            "id": "sql_m2_l1",
            "title": "1. Normalization & Schema Design",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      },
      {
        "id": "c_sql_m3",
        "title": "Module 3: Joins & Subqueries",
        "lessons": [
          {
            "id": "c_sql_m3_l1",
            "title": "5. Inner, Left, Right & Full Joins",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "c_sql_m3_l2",
            "title": "6. Subqueries & Common Table Expressions",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      },
      {
        "id": "c_sql_m4",
        "title": "Module 4: Indexing & Optimization",
        "lessons": [
          {
            "id": "c_sql_m4_l1",
            "title": "7. Indexes & Query Optimization",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          },
          {
            "id": "c_sql_m4_l2",
            "title": "8. Stored Procedures & Triggers",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_git",
    "title": "Git & GitHub for Developers",
    "category": "Developer Tools",
    "rating": 4.8,
    "reviewsCount": 44,
    "price": 0,
    "originalPrice": 0,
    "duration": "3 Weeks",
    "level": "Beginner",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80",
    "description": "Master version control with Git and collaborative workflows on GitHub — branches, merges, pull requests, and resolving conflicts.",
    "enrolledCount": 0,
    "modules": [
      {
        "id": "git_m1",
        "title": "Module 1: Git Basics",
        "lessons": [
          {
            "id": "git_m1_l1",
            "title": "1. Init, Commit, Push & Pull",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "git_m1_l2",
            "title": "2. Branching & Merging",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          }
        ]
      },
      {
        "id": "git_m2",
        "title": "Module 2: Collaborating on GitHub",
        "lessons": [
          {
            "id": "git_m2_l1",
            "title": "1. Pull Requests & Code Review",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "git_m2_l2",
            "title": "2. Resolving Merge Conflicts",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          }
        ]
      },
      {
        "id": "c_git_m3",
        "title": "Module 3: Branching & Collaboration",
        "lessons": [
          {
            "id": "c_git_m3_l1",
            "title": "5. Branching, Merging & Rebasing",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          },
          {
            "id": "c_git_m3_l2",
            "title": "6. Resolving Merge Conflicts",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          }
        ]
      },
      {
        "id": "c_git_m4",
        "title": "Module 4: GitHub Workflows",
        "lessons": [
          {
            "id": "c_git_m4_l1",
            "title": "7. Pull Requests & Code Reviews",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          },
          {
            "id": "c_git_m4_l2",
            "title": "8. GitHub Actions Basics",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_aws",
    "title": "Cloud Computing with AWS",
    "category": "Cloud Computing",
    "rating": 4.7,
    "reviewsCount": 75,
    "price": 0,
    "originalPrice": 0,
    "duration": "8 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    "description": "Master cloud fundamentals and Amazon Web Services: EC2, S3, IAM, VPC, RDS and deploying scalable applications on the cloud.",
    "enrolledCount": 46,
    "modules": [
      {
        "id": "c_aws_m1",
        "title": "Module 1: Cloud & AWS Fundamentals",
        "lessons": [
          {
            "id": "c_aws_m1_l1",
            "title": "1. Cloud Computing Concepts & Service Models",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          },
          {
            "id": "c_aws_m1_l2",
            "title": "2. AWS Console, IAM Users & Roles",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      },
      {
        "id": "c_aws_m2",
        "title": "Module 2: Core AWS Services",
        "lessons": [
          {
            "id": "c_aws_m2_l1",
            "title": "3. EC2 Instances & Elastic Load Balancing",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "c_aws_m2_l2",
            "title": "4. S3 Storage & RDS Managed Databases",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      },
      {
        "id": "c_aws_m3",
        "title": "Module 3: Serverless & Networking",
        "lessons": [
          {
            "id": "c_aws_m3_l1",
            "title": "5. AWS Lambda & Serverless Functions",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          },
          {
            "id": "c_aws_m3_l2",
            "title": "6. VPC, Subnets & Security Groups",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          }
        ]
      },
      {
        "id": "c_aws_m4",
        "title": "Module 4: Monitoring & Real Project",
        "lessons": [
          {
            "id": "c_aws_m4_l1",
            "title": "7. CloudWatch Monitoring & Billing Alerts",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          },
          {
            "id": "c_aws_m4_l2",
            "title": "8. Deploying a Full Stack App on AWS",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_devops",
    "title": "DevOps Engineering: Docker, Kubernetes & CI/CD",
    "category": "DevOps",
    "rating": 4.7,
    "reviewsCount": 134,
    "price": 0,
    "originalPrice": 0,
    "duration": "10 Weeks",
    "level": "Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
    "description": "Learn containerization with Docker, orchestration with Kubernetes, and building automated CI/CD pipelines with Jenkins and GitHub Actions.",
    "enrolledCount": 51,
    "modules": [
      {
        "id": "c_devops_m1",
        "title": "Module 1: Containers with Docker",
        "lessons": [
          {
            "id": "c_devops_m1_l1",
            "title": "1. Docker Images, Containers & Dockerfiles",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          },
          {
            "id": "c_devops_m1_l2",
            "title": "2. Docker Compose & Multi-Container Apps",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          }
        ]
      },
      {
        "id": "c_devops_m2",
        "title": "Module 2: Kubernetes & CI/CD",
        "lessons": [
          {
            "id": "c_devops_m2_l1",
            "title": "3. Kubernetes Pods, Deployments & Services",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "c_devops_m2_l2",
            "title": "4. Building CI/CD Pipelines with GitHub Actions",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      },
      {
        "id": "c_devops_m3",
        "title": "Module 3: Infrastructure as Code",
        "lessons": [
          {
            "id": "c_devops_m3_l1",
            "title": "5. Introduction to Terraform",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          },
          {
            "id": "c_devops_m3_l2",
            "title": "6. Configuration Management with Ansible",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          }
        ]
      },
      {
        "id": "c_devops_m4",
        "title": "Module 4: Monitoring & Real Pipeline",
        "lessons": [
          {
            "id": "c_devops_m4_l1",
            "title": "7. Monitoring with Prometheus & Grafana",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          },
          {
            "id": "c_devops_m4_l2",
            "title": "8. Building an End-to-End CI/CD Pipeline",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_cyber",
    "title": "Cybersecurity & Ethical Hacking",
    "category": "Cybersecurity",
    "rating": 4.7,
    "reviewsCount": 73,
    "price": 0,
    "originalPrice": 0,
    "duration": "10 Weeks",
    "level": "Beginner to Advanced",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    "description": "Understand network security, common attack vectors, penetration testing methodology, and how to secure applications and systems.",
    "enrolledCount": 42,
    "modules": [
      {
        "id": "c_cyber_m1",
        "title": "Module 1: Security Fundamentals",
        "lessons": [
          {
            "id": "c_cyber_m1_l1",
            "title": "1. CIA Triad, Threats & Vulnerabilities",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          },
          {
            "id": "c_cyber_m1_l2",
            "title": "2. Network Security & Firewalls",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_cyber_m2",
        "title": "Module 2: Ethical Hacking Basics",
        "lessons": [
          {
            "id": "c_cyber_m2_l1",
            "title": "3. Reconnaissance & Scanning with Nmap",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          },
          {
            "id": "c_cyber_m2_l2",
            "title": "4. Web App Vulnerabilities: OWASP Top 10",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          }
        ]
      },
      {
        "id": "c_cyber_m3",
        "title": "Module 3: Web & Application Security",
        "lessons": [
          {
            "id": "c_cyber_m3_l1",
            "title": "5. SQL Injection & XSS Prevention",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          },
          {
            "id": "c_cyber_m3_l2",
            "title": "6. Secure Authentication Practices",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_cyber_m4",
        "title": "Module 4: Incident Response",
        "lessons": [
          {
            "id": "c_cyber_m4_l1",
            "title": "7. Incident Response & Digital Forensics Basics",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          },
          {
            "id": "c_cyber_m4_l2",
            "title": "8. Building a Personal Security Checklist",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_ds_ml",
    "title": "Data Science & Machine Learning",
    "category": "Data Science",
    "rating": 4.7,
    "reviewsCount": 115,
    "price": 0,
    "originalPrice": 0,
    "duration": "12 Weeks",
    "level": "Intermediate to Advanced",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    "description": "Build a strong foundation in statistics, data analysis, and machine learning algorithms using Python, scikit-learn and real datasets.",
    "enrolledCount": 67,
    "modules": [
      {
        "id": "c_ds_ml_m1",
        "title": "Module 1: Data Analysis Foundations",
        "lessons": [
          {
            "id": "c_ds_ml_m1_l1",
            "title": "1. Statistics & Exploratory Data Analysis",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          },
          {
            "id": "c_ds_ml_m1_l2",
            "title": "2. Data Cleaning & Feature Engineering",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_ds_ml_m2",
        "title": "Module 2: Machine Learning Models",
        "lessons": [
          {
            "id": "c_ds_ml_m2_l1",
            "title": "3. Regression & Classification Algorithms",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          },
          {
            "id": "c_ds_ml_m2_l2",
            "title": "4. Model Evaluation & scikit-learn Pipelines",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          }
        ]
      },
      {
        "id": "c_ds_ml_m3",
        "title": "Module 3: Supervised & Unsupervised Learning",
        "lessons": [
          {
            "id": "c_ds_ml_m3_l1",
            "title": "5. Decision Trees, Random Forests & SVM",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          },
          {
            "id": "c_ds_ml_m3_l2",
            "title": "6. Clustering with K-Means",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      },
      {
        "id": "c_ds_ml_m4",
        "title": "Module 4: Model Deployment",
        "lessons": [
          {
            "id": "c_ds_ml_m4_l1",
            "title": "7. Hyperparameter Tuning & Cross-Validation",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "c_ds_ml_m4_l2",
            "title": "8. Deploying a Model with Flask",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_ai_dl",
    "title": "Artificial Intelligence & Deep Learning",
    "category": "Data Science",
    "rating": 4.7,
    "reviewsCount": 83,
    "price": 0,
    "originalPrice": 0,
    "duration": "10 Weeks",
    "level": "Advanced",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
    "description": "Dive into neural networks, deep learning architectures, and hands-on projects using TensorFlow/Keras for computer vision and NLP basics.",
    "enrolledCount": 20,
    "modules": [
      {
        "id": "c_ai_dl_m1",
        "title": "Module 1: Neural Network Foundations",
        "lessons": [
          {
            "id": "c_ai_dl_m1_l1",
            "title": "1. Perceptrons & Backpropagation",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          },
          {
            "id": "c_ai_dl_m1_l2",
            "title": "2. Building Networks with TensorFlow/Keras",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          }
        ]
      },
      {
        "id": "c_ai_dl_m2",
        "title": "Module 2: Applied Deep Learning",
        "lessons": [
          {
            "id": "c_ai_dl_m2_l1",
            "title": "3. Convolutional Neural Networks for Images",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          },
          {
            "id": "c_ai_dl_m2_l2",
            "title": "4. Intro to NLP & Transformers",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          }
        ]
      },
      {
        "id": "c_ai_dl_m3",
        "title": "Module 3: Computer Vision",
        "lessons": [
          {
            "id": "c_ai_dl_m3_l1",
            "title": "5. Image Classification with CNNs",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          },
          {
            "id": "c_ai_dl_m3_l2",
            "title": "6. Transfer Learning with Pretrained Models",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          }
        ]
      },
      {
        "id": "c_ai_dl_m4",
        "title": "Module 4: NLP & Capstone",
        "lessons": [
          {
            "id": "c_ai_dl_m4_l1",
            "title": "7. Text Processing & Sentiment Analysis",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "c_ai_dl_m4_l2",
            "title": "8. Capstone: Building an AI Mini-Project",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_android",
    "title": "Android App Development with Kotlin",
    "category": "Mobile Development",
    "rating": 4.7,
    "reviewsCount": 68,
    "price": 0,
    "originalPrice": 0,
    "duration": "9 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=600&auto=format&fit=crop&q=80",
    "description": "Design and build native Android applications using Kotlin, Jetpack components, and Android Studio, from UI to Play Store deployment.",
    "enrolledCount": 40,
    "modules": [
      {
        "id": "c_android_m1",
        "title": "Module 1: Kotlin & Android Basics",
        "lessons": [
          {
            "id": "c_android_m1_l1",
            "title": "1. Kotlin Syntax & Android Studio Setup",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          },
          {
            "id": "c_android_m1_l2",
            "title": "2. Activities, Layouts & Jetpack Compose",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_android_m2",
        "title": "Module 2: Building Real Apps",
        "lessons": [
          {
            "id": "c_android_m2_l1",
            "title": "3. Navigation, ViewModel & Room Database",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          },
          {
            "id": "c_android_m2_l2",
            "title": "4. REST API Integration & Publishing to Play Store",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_android_m3",
        "title": "Module 3: Data & Networking",
        "lessons": [
          {
            "id": "c_android_m3_l1",
            "title": "5. Room Database for Local Storage",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          },
          {
            "id": "c_android_m3_l2",
            "title": "6. Consuming REST APIs with Retrofit",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_android_m4",
        "title": "Module 4: Publishing Your App",
        "lessons": [
          {
            "id": "c_android_m4_l1",
            "title": "7. App Architecture: MVVM Basics",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          },
          {
            "id": "c_android_m4_l2",
            "title": "8. Generating a Signed APK & Play Store Publishing",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_reactnative",
    "title": "React Native: Cross-Platform Mobile Apps",
    "category": "Mobile Development",
    "rating": 4.7,
    "reviewsCount": 129,
    "price": 0,
    "originalPrice": 0,
    "duration": "8 Weeks",
    "level": "Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80",
    "description": "Build iOS and Android apps from a single JavaScript/React codebase using React Native, Expo, and native device APIs.",
    "enrolledCount": 70,
    "modules": [
      {
        "id": "c_reactnative_m1",
        "title": "Module 1: React Native Fundamentals",
        "lessons": [
          {
            "id": "c_reactnative_m1_l1",
            "title": "1. Components, Styling & Navigation",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          },
          {
            "id": "c_reactnative_m1_l2",
            "title": "2. State Management & Expo Workflow",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_reactnative_m2",
        "title": "Module 2: Native Features & Deployment",
        "lessons": [
          {
            "id": "c_reactnative_m2_l1",
            "title": "3. Camera, Location & Push Notifications",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          },
          {
            "id": "c_reactnative_m2_l2",
            "title": "4. Building & Publishing the App",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      },
      {
        "id": "c_reactnative_m3",
        "title": "Module 3: State & Data",
        "lessons": [
          {
            "id": "c_reactnative_m3_l1",
            "title": "5. State Management with Context/Redux",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          },
          {
            "id": "c_reactnative_m3_l2",
            "title": "6. Fetching Data from APIs",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_reactnative_m4",
        "title": "Module 4: Native Features & Release",
        "lessons": [
          {
            "id": "c_reactnative_m4_l1",
            "title": "7. Camera, Location & Push Notifications",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          },
          {
            "id": "c_reactnative_m4_l2",
            "title": "8. Building & Releasing Your App",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_uiux",
    "title": "UI/UX Design with Figma",
    "category": "Design",
    "rating": 4.7,
    "reviewsCount": 110,
    "price": 0,
    "originalPrice": 0,
    "duration": "6 Weeks",
    "level": "Beginner",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop&q=80",
    "description": "Learn user research, wireframing, prototyping and visual design principles, and build a professional portfolio using Figma.",
    "enrolledCount": 31,
    "modules": [
      {
        "id": "c_uiux_m1",
        "title": "Module 1: UX Foundations",
        "lessons": [
          {
            "id": "c_uiux_m1_l1",
            "title": "1. User Research & Wireframing",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "c_uiux_m1_l2",
            "title": "2. Information Architecture & User Flows",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      },
      {
        "id": "c_uiux_m2",
        "title": "Module 2: UI Design & Prototyping",
        "lessons": [
          {
            "id": "c_uiux_m2_l1",
            "title": "3. Design Systems, Typography & Color Theory",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          },
          {
            "id": "c_uiux_m2_l2",
            "title": "4. Interactive Prototypes in Figma",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          }
        ]
      },
      {
        "id": "c_uiux_m3",
        "title": "Module 3: Usability & Testing",
        "lessons": [
          {
            "id": "c_uiux_m3_l1",
            "title": "5. Usability Testing & Heuristic Evaluation",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          },
          {
            "id": "c_uiux_m3_l2",
            "title": "6. Accessibility in Design",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          }
        ]
      },
      {
        "id": "c_uiux_m4",
        "title": "Module 4: Portfolio Project",
        "lessons": [
          {
            "id": "c_uiux_m4_l1",
            "title": "7. Building a Case Study",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          },
          {
            "id": "c_uiux_m4_l2",
            "title": "8. Presenting Your UX Portfolio",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_networking",
    "title": "Computer Networking Fundamentals (CCNA Prep)",
    "category": "Networking",
    "rating": 4.7,
    "reviewsCount": 95,
    "price": 0,
    "originalPrice": 0,
    "duration": "8 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
    "description": "Understand the OSI model, IP addressing, routing and switching fundamentals to prepare for entry-level networking certifications.",
    "enrolledCount": 79,
    "modules": [
      {
        "id": "c_networking_m1",
        "title": "Module 1: Networking Basics",
        "lessons": [
          {
            "id": "c_networking_m1_l1",
            "title": "1. OSI & TCP/IP Models",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "c_networking_m1_l2",
            "title": "2. IP Addressing & Subnetting",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      },
      {
        "id": "c_networking_m2",
        "title": "Module 2: Routing & Switching",
        "lessons": [
          {
            "id": "c_networking_m2_l1",
            "title": "3. Routers, Switches & VLANs",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          },
          {
            "id": "c_networking_m2_l2",
            "title": "4. Network Troubleshooting Basics",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_networking_m3",
        "title": "Module 3: Network Protocols",
        "lessons": [
          {
            "id": "c_networking_m3_l1",
            "title": "5. DNS, DHCP & HTTP/HTTPS",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          },
          {
            "id": "c_networking_m3_l2",
            "title": "6. Wireless Networking Basics",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_networking_m4",
        "title": "Module 4: Security & Troubleshooting",
        "lessons": [
          {
            "id": "c_networking_m4_l1",
            "title": "7. Firewalls, NAT & VPNs",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          },
          {
            "id": "c_networking_m4_l2",
            "title": "8. Network Troubleshooting Tools",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_linux",
    "title": "Linux System Administration",
    "category": "System Administration",
    "rating": 4.7,
    "reviewsCount": 132,
    "price": 0,
    "originalPrice": 0,
    "duration": "6 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
    "description": "Get comfortable with the Linux command line, file permissions, process management, shell scripting and server administration.",
    "enrolledCount": 65,
    "modules": [
      {
        "id": "c_linux_m1",
        "title": "Module 1: Linux Command Line",
        "lessons": [
          {
            "id": "c_linux_m1_l1",
            "title": "1. File System, Permissions & Users",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kqtD5dpn9C8",
            "resources": []
          },
          {
            "id": "c_linux_m1_l2",
            "title": "2. Process Management & Package Managers",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          }
        ]
      },
      {
        "id": "c_linux_m2",
        "title": "Module 2: Shell Scripting & Servers",
        "lessons": [
          {
            "id": "c_linux_m2_l1",
            "title": "3. Bash Scripting Fundamentals",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          },
          {
            "id": "c_linux_m2_l2",
            "title": "4. Setting Up & Securing a Linux Server",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_linux_m3",
        "title": "Module 3: Networking & Package Management",
        "lessons": [
          {
            "id": "c_linux_m3_l1",
            "title": "5. Linux Networking Commands",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/vLnPwxZdW4Y",
            "resources": []
          },
          {
            "id": "c_linux_m3_l2",
            "title": "6. Package Management (APT/YUM)",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/w7ejDZ8SWv8",
            "resources": []
          }
        ]
      },
      {
        "id": "c_linux_m4",
        "title": "Module 4: Server Administration",
        "lessons": [
          {
            "id": "c_linux_m4_l1",
            "title": "7. Setting Up Web Servers (Nginx/Apache)",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/GhQdlIFylQ8",
            "resources": []
          },
          {
            "id": "c_linux_m4_l2",
            "title": "8. Cron Jobs & System Monitoring",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_qa_testing",
    "title": "Software Testing & QA Automation with Selenium",
    "category": "Testing & QA",
    "rating": 4.7,
    "reviewsCount": 121,
    "price": 0,
    "originalPrice": 0,
    "duration": "7 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&auto=format&fit=crop&q=80",
    "description": "Learn manual testing fundamentals plus automated testing with Selenium WebDriver, TestNG and building a test automation framework.",
    "enrolledCount": 31,
    "modules": [
      {
        "id": "c_qa_testing_m1",
        "title": "Module 1: Manual Testing Fundamentals",
        "lessons": [
          {
            "id": "c_qa_testing_m1_l1",
            "title": "1. Test Case Design & Bug Life Cycle",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/HXV3zeQKqGY",
            "resources": []
          },
          {
            "id": "c_qa_testing_m1_l2",
            "title": "2. Test Plans & Test Management Tools",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          }
        ]
      },
      {
        "id": "c_qa_testing_m2",
        "title": "Module 2: Automation with Selenium",
        "lessons": [
          {
            "id": "c_qa_testing_m2_l1",
            "title": "3. Selenium WebDriver & Locators",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          },
          {
            "id": "c_qa_testing_m2_l2",
            "title": "4. Building a TestNG Automation Framework",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          }
        ]
      },
      {
        "id": "c_qa_testing_m3",
        "title": "Module 3: API & Performance Testing",
        "lessons": [
          {
            "id": "c_qa_testing_m3_l1",
            "title": "5. API Testing with Postman",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/Mo4vesaut8g",
            "resources": []
          },
          {
            "id": "c_qa_testing_m3_l2",
            "title": "6. Basics of Performance Testing",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/OK_JCtrrv-c",
            "resources": []
          }
        ]
      },
      {
        "id": "c_qa_testing_m4",
        "title": "Module 4: CI Integration",
        "lessons": [
          {
            "id": "c_qa_testing_m4_l1",
            "title": "7. Integrating Tests into CI/CD",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/PoRJizFvM7s",
            "resources": []
          },
          {
            "id": "c_qa_testing_m4_l2",
            "title": "8. Writing a Test Automation Report",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          }
        ]
      }
    ]
  },
  {
    "id": "c_mongodb",
    "title": "MongoDB & NoSQL Database Design",
    "category": "Databases",
    "rating": 4.7,
    "reviewsCount": 112,
    "price": 0,
    "originalPrice": 0,
    "duration": "5 Weeks",
    "level": "Beginner to Intermediate",
    "instructor": "Administrator",
    "instructorId": "usr_admin",
    "thumbnail": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=80",
    "description": "Learn document-oriented database design with MongoDB: schemas, aggregation pipelines, indexing and integrating with Node.js apps.",
    "enrolledCount": 33,
    "modules": [
      {
        "id": "c_mongodb_m1",
        "title": "Module 1: MongoDB Fundamentals",
        "lessons": [
          {
            "id": "c_mongodb_m1_l1",
            "title": "1. Documents, Collections & CRUD Operations",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/QUT1VHiLmmI",
            "resources": []
          },
          {
            "id": "c_mongodb_m1_l2",
            "title": "2. Schema Design & Data Modeling",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          }
        ]
      },
      {
        "id": "c_mongodb_m2",
        "title": "Module 2: Advanced MongoDB",
        "lessons": [
          {
            "id": "c_mongodb_m2_l1",
            "title": "3. Aggregation Pipelines & Indexing",
            "duration": "25 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          },
          {
            "id": "c_mongodb_m2_l2",
            "title": "4. Connecting MongoDB to a Node.js App",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          }
        ]
      },
      {
        "id": "c_mongodb_m3",
        "title": "Module 3: Data Modeling Patterns",
        "lessons": [
          {
            "id": "c_mongodb_m3_l1",
            "title": "5. One-to-Many & Many-to-Many Modeling",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/RGOj5yH7evk",
            "resources": []
          },
          {
            "id": "c_mongodb_m3_l2",
            "title": "6. Schema Validation",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/eIrMbAQSU34",
            "resources": []
          }
        ]
      },
      {
        "id": "c_mongodb_m4",
        "title": "Module 4: Scaling & Real Project",
        "lessons": [
          {
            "id": "c_mongodb_m4_l1",
            "title": "7. Replication & Sharding Basics",
            "duration": "20 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/fYq5PXgSsbE",
            "resources": []
          },
          {
            "id": "c_mongodb_m4_l2",
            "title": "8. Building a Node.js + MongoDB API",
            "duration": "30 min",
            "type": "video",
            "videoUrl": "https://www.youtube.com/embed/kUMe1FH4CHE",
            "resources": []
          }
        ]
      }
    ]
  }
];

export const INITIAL_QUIZZES = [
  {
    "id": "q_webdev_admin",
    "title": "Web Development Mastery Assessment (Admin Added)",
    "courseId": "c_webdev",
    "courseTitle": "Full Stack Web Development",
    "durationMinutes": 15,
    "totalQuestions": 3,
    "passingScore": 70,
    "questions": [
      {
        "id": 1,
        "question": "Which HTML5 tag is used to specify navigation links?",
        "options": [
          "<nav>",
          "<navigate>",
          "<links>",
          "<menu-bar>"
        ],
        "correctAnswer": 0,
        "explanation": "<nav> is the standard semantic tag for website navigation links."
      },
      {
        "id": 2,
        "question": "In CSS, which display property activates Flexbox container alignment?",
        "options": [
          "display: flex",
          "display: box",
          "display: inline-grid",
          "display: block-flex"
        ],
        "correctAnswer": 0,
        "explanation": "display: flex activates the Flexbox formatting context."
      },
      {
        "id": 3,
        "question": "In React, what Hook manages state variables in functional components?",
        "options": [
          "useState",
          "useDOM",
          "useVariable",
          "useGlobal"
        ],
        "correctAnswer": 0,
        "explanation": "useState is the core React Hook for local component state."
      }
    ]
  },
  {
    "id": "q_java",
    "title": "Java Fundamentals Quiz",
    "courseId": "c_java",
    "courseTitle": "Java Programming & OOP",
    "durationMinutes": 10,
    "totalQuestions": 3,
    "passingScore": 70,
    "questions": [
      {
        "id": 1,
        "question": "Which keyword is used to inherit a class in Java?",
        "options": [
          "implements",
          "extends",
          "inherits",
          "super"
        ],
        "correctAnswer": 1,
        "explanation": "extends is used for class inheritance in Java; implements is for interfaces."
      },
      {
        "id": 2,
        "question": "What is the default value of a boolean variable in Java?",
        "options": [
          "true",
          "false",
          "0",
          "null"
        ],
        "correctAnswer": 1,
        "explanation": "Uninitialized boolean instance variables default to false."
      },
      {
        "id": 3,
        "question": "Which method is the entry point of a Java program?",
        "options": [
          "start()",
          "run()",
          "main()",
          "init()"
        ],
        "correctAnswer": 2,
        "explanation": "public static void main(String[] args) is where JVM execution begins."
      }
    ]
  },
  {
    "id": "q_csharp",
    "title": "C# Basics Quiz",
    "courseId": "c_csharp",
    "courseTitle": "C# Programming & .NET Basics",
    "durationMinutes": 10,
    "totalQuestions": 3,
    "passingScore": 70,
    "questions": [
      {
        "id": 1,
        "question": "Which keyword declares a constant in C#?",
        "options": [
          "final",
          "const",
          "static",
          "readonly-only"
        ],
        "correctAnswer": 1,
        "explanation": "const declares a compile-time constant in C#."
      },
      {
        "id": 2,
        "question": "What is the correct file extension for a C# source file?",
        "options": [
          ".java",
          ".cshp",
          ".cs",
          ".csx"
        ],
        "correctAnswer": 2,
        "explanation": "C# source files use the .cs extension."
      },
      {
        "id": 3,
        "question": "Which of these is NOT a value type in C#?",
        "options": [
          "int",
          "struct",
          "string",
          "bool"
        ],
        "correctAnswer": 2,
        "explanation": "string is a reference type in C#, even though it behaves immutably like a value type."
      }
    ]
  }
];

export const INITIAL_BATCHES = [
  {
    "id": "b_active_cohort",
    "name": "Main Learning Cohort 2026",
    "courseId": "c_webdev",
    "courseName": "Full Stack Web Development",
    "trainerName": "Administrator",
    "studentsCount": 1,
    "schedule": "Mon & Wed (06:00 PM - 07:30 PM)",
    "status": "Active",
    "attendance": [
      {
        "studentId": "usr_student",
        "studentName": "Student Learner",
        "rollNo": "LMS-001",
        "present": 0,
        "total": 0,
        "percentage": 100
      }
    ]
  }
];

export const INITIAL_CERTIFICATES = [];

export const INITIAL_MOCK_TESTS = [
  {
    "id": "mt_aptitude_1",
    "title": "Aptitude Mock Test 1",
    "totalMarks": 50,
    "sections": [
      {
        "id": "mt1_quant",
        "title": "Quantitative Aptitude",
        "durationMinutes": 15,
        "questions": [
          {
            "id": "mt1_q1",
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
            "id": "mt1_q2",
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
            "id": "mt1_q3",
            "question": "If x + 5 = 12, what is x?",
            "options": [
              "5",
              "6",
              "7",
              "8"
            ],
            "correctAnswer": 2
          }
        ]
      },
      {
        "id": "mt1_reasoning",
        "title": "Reasoning Ability",
        "durationMinutes": 15,
        "questions": [
          {
            "id": "mt1_q4",
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
            "id": "mt1_q5",
            "question": "Complete the series: 2, 4, 8, 16, __",
            "options": [
              "20",
              "24",
              "32",
              "30"
            ],
            "correctAnswer": 2
          }
        ]
      },
      {
        "id": "mt1_english",
        "title": "English Language",
        "durationMinutes": 10,
        "questions": [
          {
            "id": "mt1_q6",
            "question": "Choose the correctly spelled word:",
            "options": [
              "Recieve",
              "Receive",
              "Receeve",
              "Receve"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "id": "mt1_gk",
        "title": "General Awareness",
        "durationMinutes": 10,
        "questions": [
          {
            "id": "mt1_q7",
            "question": "Which is the capital of India?",
            "options": [
              "Mumbai",
              "Kolkata",
              "New Delhi",
              "Chennai"
            ],
            "correctAnswer": 2
          }
        ]
      }
    ]
  },
  {
    "id": "mt_webdev",
    "title": "Web Development Mock Test",
    "totalMarks": 40,
    "sections": [
      {
        "id": "mt2_htmlcss",
        "title": "HTML & CSS",
        "durationMinutes": 15,
        "questions": [
          {
            "id": "mt2_q1",
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
            "id": "mt2_q2",
            "question": "Which tag is used to create a hyperlink?",
            "options": [
              "<link>",
              "<a>",
              "<href>",
              "<url>"
            ],
            "correctAnswer": 1
          }
        ]
      },
      {
        "id": "mt2_js",
        "title": "JavaScript",
        "durationMinutes": 20,
        "questions": [
          {
            "id": "mt2_q3",
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
            "id": "mt2_q4",
            "question": "What does \"this\" refer to in a regular function called as a method?",
            "options": [
              "The global object",
              "The function itself",
              "The object the method belongs to",
              "undefined"
            ],
            "correctAnswer": 2
          }
        ]
      }
    ]
  },
  {
    "id": "mt_java",
    "title": "Java Programming Mock Test",
    "totalMarks": 30,
    "sections": [
      {
        "id": "mt3_core",
        "title": "Core Java",
        "durationMinutes": 20,
        "questions": [
          {
            "id": "mt3_q1",
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
            "id": "mt3_q2",
            "question": "Which collection does not allow duplicate elements?",
            "options": [
              "ArrayList",
              "LinkedList",
              "HashSet",
              "Vector"
            ],
            "correctAnswer": 2
          }
        ]
      }
    ]
  },
  {
    "id": "mt_reasoning",
    "title": "Logical Reasoning & Verbal Ability",
    "totalMarks": 25,
    "sections": [
      {
        "id": "mt4_logic",
        "title": "Logical Reasoning",
        "durationMinutes": 15,
        "questions": [
          {
            "id": "mt4_q1",
            "question": "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
            "options": [
              "Yes",
              "No",
              "Cannot be determined",
              "Only sometimes"
            ],
            "correctAnswer": 0
          }
        ]
      },
      {
        "id": "mt4_verbal",
        "title": "Verbal Ability",
        "durationMinutes": 10,
        "questions": [
          {
            "id": "mt4_q2",
            "question": "Choose the word most opposite in meaning to \"Abundant\":",
            "options": [
              "Plentiful",
              "Scarce",
              "Ample",
              "Excessive"
            ],
            "correctAnswer": 1
          }
        ]
      }
    ]
  }
];

export const INITIAL_INTERVIEW_TRACKS = [
  {
    "id": "iv_java_dev",
    "role": "Java Developer",
    "interviewerName": "AI Interviewer",
    "durationMinutes": 20,
    "difficulty": "Medium",
    "questions": [
      {
        "id": "iv_j_q1",
        "question": "Tell me about yourself and your experience with Java."
      },
      {
        "id": "iv_j_q2",
        "question": "What is the difference between == and .equals() in Java?"
      },
      {
        "id": "iv_j_q3",
        "question": "Explain the concept of inheritance with an example."
      },
      {
        "id": "iv_j_q4",
        "question": "What are the differences between an interface and an abstract class?"
      },
      {
        "id": "iv_j_q5",
        "question": "How does exception handling work in Java?"
      }
    ]
  },
  {
    "id": "iv_fullstack_dev",
    "role": "Full Stack Developer",
    "interviewerName": "AI Interviewer",
    "durationMinutes": 25,
    "difficulty": "Medium",
    "questions": [
      {
        "id": "iv_f_q1",
        "question": "Walk me through a recent project you built end-to-end."
      },
      {
        "id": "iv_f_q2",
        "question": "What is the difference between == and === in JavaScript?"
      },
      {
        "id": "iv_f_q3",
        "question": "How would you optimize a slow-loading React page?"
      },
      {
        "id": "iv_f_q4",
        "question": "Explain how you would design a REST API for a course catalog."
      },
      {
        "id": "iv_f_q5",
        "question": "What is the difference between SQL and NoSQL databases?"
      }
    ]
  },
  {
    "id": "iv_frontend_entry",
    "role": "Frontend Developer (Entry Level)",
    "interviewerName": "AI Interviewer",
    "durationMinutes": 15,
    "difficulty": "Easy",
    "questions": [
      {
        "id": "iv_fe_q1",
        "question": "What is the difference between HTML and HTML5?"
      },
      {
        "id": "iv_fe_q2",
        "question": "Explain the CSS box model."
      },
      {
        "id": "iv_fe_q3",
        "question": "What is the difference between let, const, and var?"
      }
    ]
  },
  {
    "id": "iv_senior_backend",
    "role": "Senior Backend Engineer",
    "interviewerName": "AI Interviewer",
    "durationMinutes": 35,
    "difficulty": "Hard",
    "questions": [
      {
        "id": "iv_sb_q1",
        "question": "How would you design a system to handle 1 million concurrent users?"
      },
      {
        "id": "iv_sb_q2",
        "question": "Explain database indexing and when it can hurt performance."
      },
      {
        "id": "iv_sb_q3",
        "question": "How do you handle race conditions in a distributed system?"
      },
      {
        "id": "iv_sb_q4",
        "question": "Walk me through how you would debug a memory leak in production."
      },
      {
        "id": "iv_sb_q5",
        "question": "What trade-offs would you consider between microservices and a monolith?"
      }
    ]
  }
];

export const INITIAL_JOBS = [
  {
    "id": "job_1",
    "title": "Full Stack Developer",
    "company": "TCS",
    "location": "Bangalore",
    "type": "Full-time",
    "postedTime": "2h ago",
    "skills": [
      "React",
      "Node.js",
      "MongoDB"
    ]
  },
  {
    "id": "job_2",
    "title": "Frontend Developer",
    "company": "Infosys",
    "location": "Bangalore",
    "type": "Full-time",
    "postedTime": "5h ago",
    "skills": [
      "React",
      "CSS",
      "JavaScript"
    ]
  },
  {
    "id": "job_3",
    "title": "React Developer",
    "company": "Wipro",
    "location": "Hyderabad",
    "type": "Full-time",
    "postedTime": "1d ago",
    "skills": [
      "React",
      "Redux",
      "Tailwind"
    ]
  },
  {
    "id": "job_4",
    "title": "Node JS Developer",
    "company": "Tech Mahindra",
    "location": "Pune",
    "type": "Full-time",
    "postedTime": "1d ago",
    "skills": [
      "Node.js",
      "Express",
      "MySQL"
    ]
  },
  {
    "id": "job_5",
    "title": "Junior Software Engineer",
    "company": "Capgemini",
    "location": "Bangalore",
    "type": "Full-time",
    "postedTime": "3d ago",
    "skills": [
      "Java",
      "Spring Boot",
      "SQL"
    ]
  },
  {
    "id": "job_6",
    "title": "MERN Stack Developer",
    "company": "Accenture",
    "location": "Remote",
    "type": "Full-time",
    "postedTime": "4d ago",
    "skills": [
      "MongoDB",
      "Express",
      "React",
      "Node.js"
    ]
  }
];

export const INITIAL_LIVE_CLASSES = [
  {
    "id": "lc_1",
    "courseId": "c_webdev",
    "courseTitle": "Full Stack Web Development",
    "title": "Live Doubt-Clearing: React Hooks",
    "instructor": "Administrator",
    "date": "2026-09-10",
    "time": "6:00 PM - 7:00 PM",
    "platform": "Google Meet",
    "meetingLink": "https://meet.google.com/new"
  },
  {
    "id": "lc_2",
    "courseId": "c_java",
    "courseTitle": "Java Programming & OOP",
    "title": "Live Session: OOP Concepts Deep Dive",
    "instructor": "Administrator",
    "date": "2026-09-11",
    "time": "7:00 PM - 8:00 PM",
    "platform": "Zoom",
    "meetingLink": "https://zoom.us/j/1234567890"
  },
  {
    "id": "lc_3",
    "courseId": "c_python",
    "courseTitle": "Python Programming & Data Science Masterclass",
    "title": "Live Session: Pandas for Data Analysis",
    "instructor": "Administrator",
    "date": "2026-09-12",
    "time": "6:30 PM - 7:30 PM",
    "platform": "Google Meet",
    "meetingLink": "https://meet.google.com/new"
  }
];

export const INITIAL_DISCUSSIONS = [
  {
    "id": "disc_1",
    "author": "Student Learner",
    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "courseId": "c_webdev",
    "title": "How does React useState trigger component re-renders?",
    "content": "When setState is called, how does React update the Virtual DOM?",
    "upvotes": 2,
    "tags": [
      "React",
      "Frontend"
    ],
    "createdAt": "Today",
    "replies": [
      {
        "author": "Administrator",
        "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
        "content": "React schedules a render pass for that component, computes the Virtual DOM diff, and commits minimal changes to the real DOM.",
        "createdAt": "1 hour ago"
      }
    ]
  }
];

export const INITIAL_REVIEWS = [
  {
    "id": "rev_1",
    "courseId": "c_webdev",
    "studentId": "usr_student",
    "studentName": "Student Learner",
    "rating": 5,
    "comment": "Really well structured — the React section finally made hooks click for me.",
    "createdAt": "2026-08-20"
  }
];
