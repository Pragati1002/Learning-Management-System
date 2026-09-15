RSR LMS - Course Expansion + Paid Course Checkout

WHAT THIS PATCH DOES
1. Paid course Enroll Now now opens a dedicated payment page instead of enrolling immediately.
2. Free courses still enroll immediately.
3. The payment page includes UPI, Card and Net Banking UI and a safe simulated payment flow.
4. A paid course is enrolled only after the simulated payment succeeds.
5. Adds a SAFE seed script that expands existing courses with more modules, lessons and module practice quizzes.
6. Existing courses, users, enrollments and progress are preserved. No deleteMany is used.

FILES TO COPY
- src/context/LMSContext.jsx -> C:\Desktop\rsr_lms\src\context\LMSContext.jsx
- src/pages/courses/CourseCatalogPage.jsx -> C:\Desktop\rsr_lms\src\pages\courses\CourseCatalogPage.jsx
- src/pages/courses/CoursePaymentPage.jsx -> C:\Desktop\rsr_lms\src\pages\courses\CoursePaymentPage.jsx
- src/App.jsx -> C:\Desktop\rsr_lms\src\App.jsx
- server/seed/seedCourseExpansion.js -> C:\Desktop\rsr_lms\server\seed\seedCourseExpansion.js
- server/package.json -> C:\Desktop\rsr_lms\server\package.json

THEN RUN
cd C:\Desktop\rsr_lms\server
npm run seed:expand

Expected output resembles:
COURSE EXPANSION COMPLETE
{ totalCourses: 112, addedModules: ..., addedLessons: ..., addedQuizzes: ... }

Then restart backend:
npm run dev

In a second terminal:
cd C:\Desktop\rsr_lms
npm run dev

IMPORTANT
Do NOT run npm run seed. That is the old destructive seed script.

PAYMENT NOTE
The included payment page is a simulated/demo checkout so no real money is charged. For real Razorpay payments, the next step is to add server-side order creation, test/live keys, payment signature verification, and enrollment only after verified payment. Razorpay's current Standard Checkout requires a server-created order and server-side signature verification.
