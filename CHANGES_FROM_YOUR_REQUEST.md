# Changes made to your project

## ✅ Fixed
1. **"PRO" badge removed** from next to the "RSR LMS" logo in the navbar (`src/components/layout/Navbar.jsx`).
2. **Browser autofill / "personal details" suggestions removed** — every `<input>` and `<textarea>` in the app (56 fields across 20 files) now has `autoComplete="off"`, so the browser will stop suggesting your previously typed name/email/etc. in any textbox.
3. **Resume PDF download bug fixed** — "Download PDF" was calling `window.print()` with no print styling, so it printed the whole page (navbar, sidebar, dashboard data) along with the resume. Added proper print isolation CSS (`src/index.css`) so **only** the resume (or certificate) content prints. Also fixed the identical bug in the Certificate download/print modal.
4. **Progress Tracker merged into the course itself** — removed the separate "Progress Tracker" page and sidebar link. Progress % and a full completion history for a course are now shown directly inside that course's player page (`CoursePlayerPage.jsx`), and per-course progress bars remain on the dashboard course cards.

## ✅ Added — Courses (IT field)
Added **12 new IT courses** on top of the existing 9 (21 total), to both the frontend catalog (`src/data/mockData.js`) and the backend seed data (`server/seed/Courseseeddata.js`) so they stay in sync:
- Cloud Computing with AWS
- DevOps Engineering (Docker, Kubernetes, CI/CD)
- Cybersecurity & Ethical Hacking
- Data Science & Machine Learning
- Artificial Intelligence & Deep Learning
- Android App Development with Kotlin
- React Native: Cross-Platform Mobile Apps
- UI/UX Design with Figma
- Computer Networking Fundamentals (CCNA Prep)
- Linux System Administration
- Software Testing & QA Automation with Selenium
- MongoDB & NoSQL Database Design

## ✅ Added — Mock Tests, Interviews, Assignments, Campus Placements
All added to `server/seed/seed.js` (run `npm run seed` in `/server` to load them into your database):
- **6 new mock tests** covering Python/Data Science, AWS, DevOps/Docker, Cybersecurity, and Networking (on top of the original 4).
- **6 new mock interview tracks**: Data Scientist/ML Engineer, DevOps Engineer, Cybersecurity Analyst, Android Developer, QA/Test Automation Engineer (on top of the original 4).
- **8 new job listings** and **6 new campus placement drives** (Amazon, Accenture, Cognizant, Deloitte, HCL) in addition to the original ones.
- **12 new practical assignments**, one for many of the new/existing courses (this is a brand-new feature in the seed data — assignments previously had no seed data at all).

## ✅ Added — Registration email + backend work
- Registration now **sends a real "Welcome to RSR LMS" email** to the student when they sign up (`server/controllers/authController.js` + new `server/utils/sendEmail.js`, using `nodemailer`).
- **To make this actually send emails**, add your SMTP details to `server/.env` (see the new fields added to `server/.env.example`). Gmail example:
  ```
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=your_email@gmail.com
  SMTP_PASS=your_gmail_app_password   (not your normal password — create one at https://myaccount.google.com/apppasswords)
  EMAIL_FROM="RSR LMS" <your_email@gmail.com>
  ```
  Then run `npm install` inside `/server` (this pulls in the `nodemailer` package now listed in `package.json`) and restart the server. If SMTP isn't configured, registration still works — the app just logs a warning and skips the email instead of crashing.

## ⚠️ What still needs your input
- **"Add more backend working"** was fairly open-ended — I added assignment seeding (previously missing), more mock-test/interview/placement/job data, and the real registration email. If there's a specific feature that still feels mock/non-functional (e.g. payments, live classes, file uploads, AI grading — see `server/README.md`'s "future work" list), tell me which one and I'll wire it up next.
- After unzipping: run `npm install` in the project root **and** in `/server` (node_modules were excluded from this zip to keep it small), then follow the Quick Start steps in `README.md`. Run `npm run seed` again in `/server` to load the new courses/tests/placements into your database (⚠️ this clears and re-seeds the DB — back up any real data first).
