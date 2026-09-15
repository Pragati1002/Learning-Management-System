# Changes made to your project

## 🆕 Latest round (in response to your follow-up: "still 9 courses / less interviews / more questions / more assignments / resume + button")

**Why it still showed 9 courses / fewer interviews:** this app is 100% database-driven (see the big warning further below) — your screenshot showed the Resume Builder page and a `npm run dev` (frontend-only) terminal, with no visible `npm run seed` run. That means the database almost certainly hadn't been reloaded with the updated catalog yet. Run the commands in the seed section below and watch for "Seed complete!" — the script now also prints exactly how many courses/quizzes/tests/interviews it inserted, so you can confirm it worked before checking the browser.

- **Mock tests:** now **14 tests** (up from 12) with **74 total questions** (up from ~20) — every test now has 3–5 questions per section instead of 1–2. Added Aptitude Test 2, a Data Structures & Algorithms Mock Test, and a SQL & Database Mock Test.
- **Mock interviews:** now **14 tracks** (up from 10) — added Cloud Engineer (AWS), React Native Developer, and an HR/Behavioral round.
- **Assignments:** now **27 total** (up from 17) — every one of the 21 courses has at least one assignment, and the most popular courses (Web Dev, Java, Python, SQL, DevOps, Data Science) have a second one.
- **Resume Builder "+" buttons fixed:** clicking "+" next to Skills or Projects (with the input left empty) now opens a panel of suggested skills/project ideas you can tap to add instantly, instead of doing nothing useful. Typing your own text and clicking "+" still works as before.

## ✅ Fixed
1. **"PRO" badge removed** from next to the "RSR LMS" logo in the navbar (`src/components/layout/Navbar.jsx`).
2. **Browser autofill / "personal details" suggestions removed** — every `<input>` and `<textarea>` in the app (56 fields across 20 files) now has `autoComplete="off"`, so the browser will stop suggesting your previously typed name/email/etc. in any textbox.
3. **Resume PDF download bug fixed** — "Download PDF" was calling `window.print()` with no print styling, so it printed the whole page (navbar, sidebar, dashboard data) along with the resume. Added proper print isolation CSS (`src/index.css`) so **only** the resume (or certificate) content prints. Also fixed the identical bug in the Certificate download/print modal.
4. **Progress Tracker merged into the course itself** — removed the separate "Progress Tracker" page and sidebar link. Progress % and a full completion history for a course are now shown directly inside that course's player page (`CoursePlayerPage.jsx`), and per-course progress bars remain on the dashboard course cards.

## ✅ Added — Courses & Modules (IT field)
Added **12 new IT courses** on top of the existing 9 (**21 total**), to both the frontend catalog (`src/data/mockData.js`) and the backend seed data (`server/seed/Courseseeddata.js`) so they stay in sync:
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

**Every one of the 21 courses now has 4 modules (up from 1–2 before)** — that's **167 lessons total**, up from ~79. Existing courses (Web Dev, Java, C#, Python, C++, DSA, PHP, SQL, Git) each got 2 brand-new modules covering more advanced/real-world topics (e.g. Java now also covers Collections, Exception Handling, File I/O and interview prep; Python now also covers NumPy/Pandas, data visualization and a mini project).

## ✅ Added — Quizzes, Mock Tests, Mock Interviews
- **21 quizzes total** (one for every course, some with two) — up from 3.
- **9 mock tests** (aptitude, web dev, Java, reasoning/verbal, Python/DS, AWS, DevOps, cybersecurity, networking, mobile dev, UI/UX) — up from 4.
- **10 mock interview tracks** (Java Developer, Full Stack, Frontend, Senior Backend, Data Scientist/ML, DevOps, Cybersecurity Analyst, Android, QA Automation, UI/UX Designer, Database Administrator) — up from 4.

## ✅ Added — Campus Placements & Career Drives
**15 campus placement drives** (TCS, Infosys, Amazon, Accenture, Cognizant, Deloitte, HCL, IBM, Wipro, Paytm, Zomato, Tech Mahindra, Capgemini, Oracle, Zoho) — up from 1 — plus **14 job listings**, and **17 practical assignments** (a brand-new feature — there was no assignment seed data at all before), all in `server/seed/seed.js`.

## 🚨 IMPORTANT — why you might not be seeing any of this yet
**This whole app is 100% backend-driven** — every course, quiz, mock test, interview, job and placement drive you see is pulled live from your MongoDB database via the Express API, not from a static file in the app. That means all of the above only takes effect **after you re-run the seed script**:

```
cd server
npm install        # pulls in nodemailer, needed for the email feature below
npm run seed        # wipes and reloads the database with everything above
npm run dev          # (or npm start) to run the backend
```
⚠️ `npm run seed` **deletes all existing users, courses, quizzes, mock tests, interviews, jobs, placements and assignments** in your database and replaces them with the updated set (including a fresh admin/student login: `admin@lms.com`/`admin` and `student@lms.com`/`student`). If you have real student data in that database already, back it up first — otherwise this is exactly what you need to run to actually see the new content.


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
