# cohort-10-mern-21437-muhammad
Cohort 10 — MERN (NodeJS+ReactJS) assignment for Muhammad Jawad

## DraftlyNote

A full-stack notes application built with the MERN-style stack.

### Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** React
- **Database:** MySQL (added in a later PR)
- **Logging:** Pino
- **Testing:** Mocha/Chai + Supertest (backend), Jest (frontend)
- **Code quality:** SonarQube (added in a later PR)

### Project Structure

```
.
├── backend/   # Node.js + Express API
└── frontend/  # React client
```

### Git Branching Strategy

- `main` — production-ready code only, merged into via PR from `develop`.
- `develop` — integration branch where completed features land before a release to `main`.
- `feature/<frontend|backend>/<name>` — new functionality, branched from `develop`.
- `bugfix/<frontend|backend>/<name>` — bug fixes, branched from `develop`.

All work branches off `develop` and opens a PR back into `develop`.

### Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev     # starts the API with nodemon on PORT (default 5000)
npm test        # runs the Mocha/Chai test suite
npm run lint     # runs ESLint
```

Health check: `GET http://localhost:5000/api/health`

The frontend and the MySQL database are introduced in later PRs.
