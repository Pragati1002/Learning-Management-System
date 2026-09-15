RSR LMS UPDATED FILES

Replace these files in your existing project:

1. src/context/LMSContext.jsx
   - Uses MongoDB courses when available (your 112-course catalog).
   - Falls back to the original built-in quizzes, mock tests, interviews, jobs, and discussions when those backend collections are empty.
   - Does NOT clear localStorage or delete database data.

2. src/pages/crm/ResumeBuilderPage.jsx
   - New resume starts with blank name/email instead of automatically inserting account personal data.
   - Existing saved resume data is preserved.

IMPORTANT:
- Do NOT run `npm run seed`.
- Do NOT clear browser localStorage.
- Keep your current MongoDB and backend unchanged.

After replacing the files:
1. Keep backend running: `cd C:\Desktop\rsr_lms\server` then `npm run dev`
2. Keep frontend running: `cd C:\Desktop\rsr_lms` then `npm run dev`
3. Refresh the browser with Ctrl+Shift+R.
