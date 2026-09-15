# RSR LMS - Implemented Manager Requirements

## Paid courses
- Clicking a paid course opens the payment page; it does not call the enrollment endpoint.
- The frontend blocks direct paid-course enrollment.
- The backend rejects POST /api/courses/:id/enroll for paid courses with HTTP 402.
- POST /api/courses/:id/payment/confirm is the only normal path that grants paid access and enrollment.
- Registration does not auto-enroll a paid course.

## Quiz management (Admin only)
- Search quizzes by name, course, or institution on the admin dashboard and quiz management page.
- Create a quiz with multiple questions.
- Edit/rename an existing quiz.
- Add/remove questions and edit all options/correct answers.
- Draft/Published status.
- Institution field (for example, Dayanand Sagar).
- Assign a quiz to selected students.
- Search students while assigning.
- Open an admin-only dashboard for each quiz.
- Dashboard shows assigned, attempted, not attempted, attempts, average, highest, lowest, pass/fail, and student-wise results.

## Student quiz security
- Student GET /api/quizzes returns only published quizzes assigned to the authenticated student's User ID.
- Student GET /api/quizzes/:id checks assignment again.
- Student POST /api/quizzes/:id/submit checks assignment again.
- Correct answers are not included in the student quiz payload.
- Scores are calculated on the backend.
- Students cannot access the admin dashboard endpoint.
- Student-side quiz search operates only over the quizzes returned for that student.

## Institution module access
- Course modules have an isReleased flag.
- Only admins can call PUT /api/courses/:id/module-access.
- Student course responses contain only released modules.
- Student lesson completion is rejected for unreleased modules.
- The admin quiz/assessment page includes an Institution Module Access panel.

## Important after replacing the project
1. Restart the backend so the new Express routes/controllers are loaded.
2. Restart Vite if using the frontend dev server.
3. Log out and log in again so the current user data is refreshed.
4. Existing quizzes with no assigned students are intentionally hidden from students. Assign them from Admin -> Assessments & Quizzes.
5. Existing paid courses that were accidentally placed in enrolledCourses by an older version will not be treated as accessible unless a paidCoursePayments record exists.
