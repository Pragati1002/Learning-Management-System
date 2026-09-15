PAYMENT PAGE FIX — RSR LMS

This patch is based on the current RSR_LMS_Complete_Project structure and fixes the missing paid-course payment navigation.

COPY THESE FILES:
1. src/App.jsx -> C:\Desktop\rsr_lms\src\App.jsx
2. src/context/LMSContext.jsx -> C:\Desktop\rsr_lms\src\context\LMSContext.jsx
3. src/pages/courses/CourseCatalogPage.jsx -> C:\Desktop\rsr_lms\src\pages\courses\CourseCatalogPage.jsx
4. src/pages/courses/CoursePaymentPage.jsx -> C:\Desktop\rsr_lms\src\pages\courses\CoursePaymentPage.jsx

THEN:
1. Stop frontend with Ctrl+C.
2. cd C:\Desktop\rsr_lms
3. npm run dev
4. Open http://localhost:5173
5. Hard refresh with Ctrl+Shift+R.
6. Open Courses.
7. Click Enroll Now on a course with a price > 0.

EXPECTED:
Paid course -> Course Payment page -> choose UPI/Card/Net Banking -> Pay -> course unlocks.
Free course -> enrolls directly.

NO DATABASE SEED IS REQUIRED FOR THIS FIX.
DO NOT RUN npm run seed.

IMPORTANT: This is a demo checkout. It does not charge real money. For real/test Razorpay checkout, API keys and server-side order/signature verification must be added separately.
