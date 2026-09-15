# Expanded RSR LMS Technology Catalog

The course catalog is intentionally expanded beyond the original 21-course catalog.

## Safe restore

From the project root:

```powershell
cd server
npm install
npm run seed:tech
```

This script:
- adds missing original catalog courses;
- adds the expanded technology catalog;
- checks by course title before inserting;
- NEVER calls deleteMany/deleteOne;
- does not modify users, enrollments, lesson progress, certificates, quizzes, assignments, jobs, or placements.

After it finishes, restart the backend and refresh the frontend.

The expanded catalog covers web development, programming, mobile development, data science, AI/ML, databases, cloud/DevOps, cybersecurity, networking, software engineering, developer tools, UI/UX and software testing.
