# RSR LMS - College Quiz & Paid Course Fixes

## Implemented together

### Paid courses
- Clicking a paid course no longer enrolls the student directly.
- Paid course button opens the payment page first.
- Direct POST `/api/courses/:id/enroll` is rejected for paid courses.
- Demo payment confirmation is handled by `/api/courses/:id/payment/confirm` and only then is the course enrolled/unlocked.
- Paid course access is checked on the backend.
- Registration no longer auto-enrolls a student into a paid course.

### Quiz management (Admin only)
- Admin quiz search from the Admin Dashboard and Assessments page.
- Create quiz with any number of questions.
- Edit/rename existing quizzes.
- Add/remove/edit questions and options.
- Set institution, course, duration, passing score and Draft/Published status.
- Assign a quiz to specific student accounts.
- Admin-only per-quiz dashboard with assigned/attempted/pending counts and score statistics.
- Student list and attempt information in the quiz dashboard.

### Student quiz security
- Students only receive published quizzes assigned to their own account.
- Changing a quiz ID in the URL/API does not bypass assignment security.
- Correct answers are not sent to the student quiz UI.
- Quiz results are calculated by the backend.

### Institution module access
- Admin can release/lock individual course modules.
- Locked modules are not returned to students.
- Lesson completion is rejected by the backend for locked modules.

## Important test flow
1. Start the backend and frontend from this project.
2. Log in as Admin.
3. Open Assessments & Quizzes.
4. Create/edit a quiz, add multiple questions, and assign it to a student.
5. Log in as that student and verify only the assigned quiz is visible.
6. Try another quiz ID manually; it should return a permission error.
7. From course catalog, click a paid course. It must open payment, not enroll.
8. Complete the demo payment. Only then should the course become enrolled/unlocked.
