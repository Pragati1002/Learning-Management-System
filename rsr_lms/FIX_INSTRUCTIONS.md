# RSR LMS — Safe Restoration + Registration Email Fix

This version is based on the uploaded `rsr_lms_updated (1).zip`.

## IMPORTANT
Do NOT run `npm run seed` on your existing database. That command is destructive and deletes existing collections.

## 1. Restore missing demo data safely
From the backend folder:

```powershell
cd server
npm install
npm run seed:restore
```

`seed:restore` only inserts records that are missing. It does NOT delete users, courses, progress, quizzes, jobs, interviews, placements, mock tests, or assignments.

Expected demo content available for restoration:
- 21 courses
- 21 quizzes
- 27 practical assignments
- 14 mock tests
- 14 mock interview tracks
- 14 jobs
- 15 campus placement drives

After it finishes, restart the backend:

```powershell
npm run dev
```

## 2. Registration email
The backend now sends:
- a registration-success email to the newly registered student
- an optional new-registration notification to the admin email

Add these to `server/.env` locally:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=YOUR_EMAIL@gmail.com
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
EMAIL_FROM="RSR LMS" <YOUR_EMAIL@gmail.com>
REGISTRATION_ADMIN_EMAIL=YOUR_ADMIN_EMAIL@gmail.com
```

For Gmail, use a Google App Password rather than your normal Gmail password.

On Render, add the same variables under Environment. Do not put secrets in GitHub.

## 3. Resume Builder
A new resume no longer automatically fills the account's personal name/email. The user can type the information manually.

## 4. Empty API fallback
If a demo collection is temporarily empty, the frontend keeps demo fallback data for courses, quizzes, mock tests, interviews, jobs and discussions instead of immediately showing a blank page.

Live Classes remain database-driven because they are intended to be dynamic.
