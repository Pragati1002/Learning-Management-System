# RSR LMS - College Quiz & Institution Access Changes

## Admin
- Assessments & Quizzes now provides quiz search, quiz creation, question management, quiz renaming/editing, publishing, and per-student assignment.
- Quiz Dashboard is admin-only and shows assigned students, attempted/not attempted counts, attempts, average/highest/lowest score, pass/fail and submitted-answer details.
- Institution Module Access is admin-only and controls which course modules are released to students.

## Students
- Practice & Quizzes shows only published quizzes explicitly assigned to the logged-in student.
- Student quiz search searches only that restricted set.
- Correct answers are never returned by the student quiz API.
- Quiz submission is checked again on the server, so changing the URL or request cannot open an unassigned quiz.
- Locked course modules are visible as locked but their lesson content is not returned to students.
- Lesson content is protected by a server-side module-release check.

## Important
Existing quizzes that have no assignedStudents will not appear to students until an administrator assigns them. This is intentional for security.

After updating an existing MongoDB database:
1. Start the backend.
2. Log in as an administrator.
3. Open Assessments & Quizzes and assign the required quizzes.
4. Open Institution Module Access and release only the modules completed in the college sessions.

The existing seed script assigns the demo student to seeded quizzes. The safe course-content repair script preserves each module's current release/lock state.
