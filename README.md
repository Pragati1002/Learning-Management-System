# RSR LMS — Complete Learning & Placement Platform

A full learning management + placement platform: course delivery, quizzes, mock tests, mock interviews, resume builder, job portal, application tracking, and campus placements.

## Project Structure
```
rsr_lms/
├── src/               → React + Vite + Tailwind frontend (currently runs on mock data)
├── server/            → Node.js + Express + MongoDB backend (real API, separate from frontend for now)
├── BACKEND_INTEGRATION.md  → How to wire the frontend to the backend, feature by feature
└── README.md          → You are here
```

## Quick Start — Frontend only (what you've been running so far)
```
npm install
npm run dev
```
Opens on `http://localhost:5173`. Still uses mock data + localStorage — no backend needed for this.

## Quick Start — Backend
```
cd server
npm install
cp .env.example .env
# edit .env: set MONGO_URI to your MongoDB connection string
npm run seed     # populates demo data
npm run dev      # starts API on http://localhost:5000
```
See `server/README.md` for the full endpoint reference.

## Connecting Them
The frontend and backend run independently right now — the frontend doesn't call the backend yet. See `BACKEND_INTEGRATION.md` for exactly how to wire each feature over, one at a time, without breaking what already works.

## Honest Status Check
| Piece | Status |
|---|---|
| Frontend UI (all 12 modules from the mockup) | ✅ Built, working on mock data |
| Backend API (all 12 modules) | ✅ Built, tested for syntax/module-loading, not yet load-tested against a live database in this environment |
| Frontend ↔ Backend wiring | ❌ Not done — see BACKEND_INTEGRATION.md |
| Payments, live classes, code execution, file uploads, real AI grading | ❌ Not built — noted in server/README.md as future work |

This is a realistic, working foundation for a solo-built final year / portfolio project — not a finished production platform. Treat the "leftover" items above as your next sprint.
