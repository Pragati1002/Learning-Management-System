# Wiring the React Frontend to the New Backend

Your frontend currently runs entirely on `LMSContext.jsx` — mock data + `localStorage`, no network calls. The backend in `/server` now has real endpoints for every one of those features. This file maps each existing context function to the API call that should replace it, so you can wire it up one feature at a time without breaking the rest of the app.

## Step 1 — Add an API client
Create `src/api/client.js`:
```js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export default request;
```
Add a `.env` file at the project root (not `server/`) with:
```
VITE_API_URL=http://localhost:5000/api
```

## Step 2 — Replace context functions one at a time

| Context function (LMSContext.jsx) | Replace with API call |
|---|---|
| `login(email, password)` | `POST /api/auth/login` → store returned `token` + `user` |
| `signup(name, email, password, role)` | `POST /api/auth/register` → store returned `token` + `user` |
| `courses` (state, from mock data) | `GET /api/courses` on app load |
| `enrollInCourse` (implicit) | `POST /api/courses/:id/enroll` |
| `toggleLessonComplete` | `POST /api/courses/:id/lessons/:lessonId/complete` |
| `submitQuizResult` | `POST /api/quizzes/:id/submit` |
| Mock test submission (in `MockTestPage.jsx`) | `POST /api/mock-tests/:id/submit` |
| Mock interview submission (in `MockInterviewPage.jsx`) | `POST /api/interviews/:trackId/submit` |
| `applyToJob` | `POST /api/jobs/:id/apply` |
| `jobApplications` (state) | `GET /api/jobs/applications/mine` |
| `applyPlacementJob` | `POST /api/placements/:id/apply` |
| `certificates` (state) | `GET /api/certificates/mine` |
| `issueCertificateForCourse` | Handled automatically server-side now — no separate call needed |

## Step 3 — Suggested order (safest → riskiest)
1. **Auth first** (`login`/`signup`) — everything else depends on having a real JWT.
2. **Courses fetch** — replace the mock `courses` array with a `GET /api/courses` call in a `useEffect` on login.
3. **One feature at a time** — quizzes, then mock tests, then jobs, etc. Test each in isolation before moving to the next; keep the rest on mock data until you get there.
4. **Remove `localStorage` persistence** from `LMSContext.jsx` last, once everything reads/writes through the API — the database is now your source of truth, not the browser.

## Why not do this all at once?
`LMSContext.jsx` is ~475 lines and touches nearly every page in the app. Rewiring all of it in one pass risks breaking working features with no easy way to test each change in isolation. Doing it feature-by-feature, in the order above, means the app keeps working at every step, and you'll actually understand each wire-up instead of getting a black-box change dumped on you.
