RSR LMS COURSE CONTENT REPAIR

Copy:
  server/seed/seedCourseContentRepair.js

Run from:
  C:\Desktop\rsr_lms\server

Command:
  node seed\seedCourseContentRepair.js

Then restart backend and frontend.

This repair is SAFE:
- does not delete users
- does not delete enrollments
- does not delete completed lessons
- preserves existing generated lesson IDs
- repairs the generated expansion modules and quizzes
- fixes overly broad topic matching (for example RAG no longer gets SQL modules)
