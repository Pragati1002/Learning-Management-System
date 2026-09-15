# RSR LMS - College + Quiz + Payment Changes

Implemented in this project:

1. Paid courses no longer enroll on clicking Enroll Now.
   - Paid course -> payment page.
   - Payment confirmation endpoint is the only paid-course unlock path.
   - Direct POST /api/courses/:id/enroll is rejected for paid courses.
   - Registration course selection never grants enrollment.
   - Old paid-course entries without a recorded paidCourseIds entry are not treated as paid access in the UI.

2. Admin quiz management.
   - Search quizzes from Admin Dashboard and Assessments.
   - Create quiz with multiple questions.
   - Add/remove questions.
   - Edit quiz title, course, institution, duration and passing score.
   - Edit question options and correct answers.
   - Assign quiz to selected students.
   - Search students while assigning.
   - Admin-only per-quiz dashboard with participation and score statistics.

3. Student quiz security.
   - Students receive only published quizzes assigned to their account.
   - Submission verifies assignment server-side.
   - Correct answers are stripped from student quiz responses.

4. Institution module release control.
   - Admin can release/lock course modules.
   - Student course responses contain only released modules.
   - Lesson completion is rejected for locked modules server-side.

5. Dayanand Sagar.
   - Quiz has an Institution/College field and the admin editor defaults to Dayanand Sagar for new quizzes.
