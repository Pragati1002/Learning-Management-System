# RSR LMS — Backend API

A REST API built with Node.js, Express, and MongoDB (Mongoose) covering every module in the RSR LMS project: auth, courses, quizzes, mock tests, mock interviews, certificates, jobs, applications, campus placements, assignments, discussions, and batch/attendance.

## 1. Prerequisites
- Node.js 18+
- A MongoDB database — either:
  - **Local**: install MongoDB Community Server and run it (`mongod`), or
  - **Cloud (recommended for beginners)**: create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and copy its connection string.

## 2. Setup
```
cd server
npm install
cp .env.example .env
```
Open `.env` and fill in:
- `MONGO_URI` — your local or Atlas connection string
- `JWT_SECRET` — any long random string (used to sign login tokens)

## 3. Seed demo data (optional but recommended)
```
npm run seed
```
This wipes and repopulates the database with the same demo courses, quizzes, mock tests, interview tracks, jobs, and users your frontend already uses — including:
- Admin credentials: `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env`
- Student credentials: `SEED_STUDENT_EMAIL` / `SEED_STUDENT_PASSWORD` from `server/.env`

## 4. Run the server
```
npm run dev      # with auto-restart (nodemon)
# or
npm start        # plain node
```
Server starts on `http://localhost:5000` by default. Check it's alive:
```
curl http://localhost:5000/api/health
```

## 5. Authentication
Every protected route expects:
```
Authorization: Bearer <token>
```
Get a token from `POST /api/auth/login` or `POST /api/auth/register`.

## 6. Endpoint Reference

| Module | Method & Path | Auth | Notes |
|---|---|---|---|
| Auth | POST /api/auth/register | Public | body: name, email, password, mobile, role |
| Auth | POST /api/auth/login | Public | body: email, password |
| Auth | GET /api/auth/me | Token | current user profile |
| Courses | GET /api/courses | Token | list all |
| Courses | GET /api/courses/:id | Token | single course |
| Courses | POST /api/courses | admin/trainer | create |
| Courses | PUT /api/courses/:id | admin/trainer | update |
| Courses | DELETE /api/courses/:id | admin | delete |
| Courses | POST /api/courses/:id/enroll | Token | enroll current user |
| Courses | POST /api/courses/:id/lessons/:lessonId/complete | Token | toggle complete, auto-issues certificate at 100% |
| Quizzes | GET /api/quizzes | Token | list |
| Quizzes | POST /api/quizzes | admin/trainer | create |
| Quizzes | POST /api/quizzes/:id/submit | Token | body: answers |
| Quizzes | GET /api/quizzes/attempts/mine | Token | your attempt history |
| Mock Tests | GET /api/mock-tests | Token | list |
| Mock Tests | GET /api/mock-tests/:id | Token | single test with sections |
| Mock Tests | POST /api/mock-tests/:id/submit | Token | body: answers |
| Interviews | GET /api/interviews | Token | list role tracks |
| Interviews | POST /api/interviews/:trackId/submit | Token | body: responses, durationSeconds |
| Interviews | GET /api/interviews/results/mine | Token | your past feedback |
| Jobs | GET /api/jobs | Token | list |
| Jobs | POST /api/jobs | admin/placement | create |
| Jobs | POST /api/jobs/:id/apply | Token | apply |
| Jobs | GET /api/jobs/applications/mine | Token | your applications |
| Jobs | PATCH /api/jobs/applications/:id/status | admin/placement | update status |
| Placements | GET /api/placements | Token | campus drives |
| Placements | POST /api/placements | admin/placement | create drive |
| Placements | POST /api/placements/:id/apply | Token | apply to drive |
| Placements | PATCH /api/placements/:id/applicants/:studentId | admin/placement | update applicant status |
| Certificates | GET /api/certificates/mine | Token | your certificates |
| Certificates | GET /api/certificates/verify/:certificateId | Public | verify a certificate by ID |
| Assignments | GET /api/assignments?courseId= | Token | list (optionally by course) |
| Assignments | POST /api/assignments | admin/trainer | create |
| Discussions | GET /api/discussions | Token | list |
| Discussions | POST /api/discussions | Token | create thread |
| Discussions | POST /api/discussions/:id/reply | Token | reply |
| Batches | GET /api/batches | admin/trainer | list |
| Batches | POST /api/batches | admin | create |
| Batches | POST /api/batches/:id/attendance | admin/trainer | mark attendance |

## 7. Important honesty note on "AI" features
The interview feedback scoring (`POST /api/interviews/:trackId/submit`) uses a simple rule-based heuristic — number of questions answered + average answer length — not a real AI model. To make it genuinely AI-powered, call an LLM API (OpenAI/Anthropic) inside `controllers/interviewController.js` with the candidate's responses and a grading prompt, and use its output instead of the heuristic.

## 8. What's NOT included yet
- Payment gateway integration (Razorpay/Stripe) for course fees/subscriptions
- Live class / video conferencing (would need WebRTC or a service like Jitsi/Zoom SDK)
- Code execution engine for coding-practice questions (use a service like Judge0)
- File uploads (resumes as PDF, course videos) — currently everything is stored as URLs/text
