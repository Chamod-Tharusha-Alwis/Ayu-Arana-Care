Summary
This repository is a full-stack single‑page app (Vite + React) with an Express/MongoDB backend in `server/`.
The frontend and backend are developed and run separately. Frontend dev server: `npm run dev` (root). Backend: `npm start` (in `server/`).

Quick architecture
- Frontend: `src/` (React + Tailwind + Vite). Entry: `src/main.jsx`. Key pages in `src/pages/` (e.g., `MembershipPreviewPage.jsx`).
- Backend: `server/src/` (Express + Mongoose). Server entry: `server/src/server.js`. Routes under `server/src/routes/`, controllers in `server/src/controllers/`, models in `server/src/models/`.
- Static/uploads: project-level `uploads/` served by backend at `/uploads` (server calculates path from `server/src/server.js`).

Run & dev workflow
- Frontend (root):
  - install: run `npm install` at repo root
  - dev: `npm run dev` (starts Vite on default port 5173)
  - build: `npm run build`
  - preview: `npm run preview`
- Backend (server folder):
  - install: run `cd server; npm install`
  - start: `npm start` (runs `node src/server.js`)
  - Important: `server/src/config/envLoader.js` loads `.env` from `server/` root — ensure `server/.env` exists with MONGO_URI, JWT_SECRET, MAIL_USER, MAIL_PASS, FRONTEND_URL, etc.

Project-specific patterns & conventions
- Environment loading: `server/src/config/envLoader.js` must be the first import in `server/src/server.js` — do not reorder. It expects a `.env` in `server/` root.
- Error handling: The backend uses custom middleware `server/src/middleware/errorMiddleware.js` (`notFound` and `errorHandler`). Keep those mounted after route definitions in `server/src/server.js`.
- Async routes: controllers and routes use `express-async-handler`. Throwing an Error in async handlers is the pattern to produce proper HTTP error responses.
- File uploads: uploads are stored under the project-level `uploads/` directory. `server/src/server.js` ensures the folder exists and serves it statically at `/uploads`.
- Auth tokens: JWT tokens generated with `process.env.JWT_SECRET` and used in `server/src/routes/authRoutes.js`. Ensure secrets exist in `server/.env` for auth-related changes.

What to look for when editing
- When adding new backend routes, add them to `server/src/server.js` with a clear mount point (e.g., `app.use('/api/foo', fooRoutes)`), then add tests or a quick curl/Insomnia check against `http://localhost:<PORT>/api/foo`.
- When changing database models, update Mongoose schemas in `server/src/models/` and check any controller usages (search for `.find`, `.create`, `.update` across `server/src/controllers/`).
- Avoid enabling both `express-fileupload` and `multer` simultaneously — the project previously removed `express-fileupload` in favor of multer patterns.

Integration & external dependencies
- MongoDB: connected via `process.env.MONGO_URI` in `server/src/server.js`.
- Email: nodemailer used in `server/src/routes/authRoutes.js` — relies on `MAIL_USER` and `MAIL_PASS` in `server/.env` and the Gmail service by default.
- CORS: configured in `server/src/server.js` with `process.env.FRONTEND_URL` (defaults to `http://localhost:5173`). Update when changing frontend host/port.

Editing advice for UI files
- Tailwind + Vite: styles in `src/index.css` and `tailwind.config.js`. Run `npm run dev` then edit components in `src/components/` and pages in `src/pages/`.
- Example pattern: plan selector in `src/pages/MembershipPreviewPage.jsx` maps `plans` and uses `@headlessui/react` Transition for animated panels. Follow this component structure for similar UIs.

Quick checks before PR
- Does backend require new env keys? Add them to `server/.env.example` (create if missing) and document in PR.
- Did you update route mounting in `server/src/server.js`? Ensure middleware order remains: body parsers -> routes -> notFound -> errorHandler.
- Did you run frontend build (`npm run build`) and backend start to smoke-test API connections locally?

Files to inspect when you get stuck
- Frontend entry: `src/main.jsx`
- Backend entry: `server/src/server.js`
- Env loader: `server/src/config/envLoader.js`
- Example route + email: `server/src/routes/authRoutes.js`
- Error middleware: `server/src/middleware/errorMiddleware.js`

If unsure, ask the maintainer for missing env values (MONGO_URI, JWT_SECRET, MAIL_USER, MAIL_PASS) rather than guessing.

Feedback
If any section is unclear or you need more specifics (example requests, env.example, or common test snippets), tell me which area to expand.
