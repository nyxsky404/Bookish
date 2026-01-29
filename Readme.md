# Bookish 📚

> A full-stack e-commerce bookstore built with React, Node.js, and MongoDB — demonstrating production-ready DevOps practices.

[![CI](https://github.com/nyxsky404/Bookish/actions/workflows/ci.yml/badge.svg)](https://github.com/nyxsky404/Bookish/actions/workflows/ci.yml)

---

## 🔭 Vision

An online bookstore that combines carefully curated selections with modern technology — delivering a premium shopping experience with clean UI, secure auth, and full CI/CD.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + React Router v6 |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Testing | Jest + Supertest (backend), Vitest + Testing Library (frontend) |
| CI/CD | GitHub Actions |
| Containers | Docker + Docker Compose |
| Deployment | AWS EC2 via SSH |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v22+
- MongoDB running locally (or set `MONGODB_URI` env var)

### Backend

```bash
cd backend
npm install
cp .env.example .env      # configure environment variables
npm run dev               # starts on http://localhost:3000
npm run seed              # seed sample books (idempotent)
```

### Frontend

```bash
cd frontend
npm install
npm run dev               # starts on http://localhost:5173
```

### Full Stack with Docker

```bash
# Start all services (backend + frontend + mongodb)
docker compose up --build

# Backend: http://localhost:3000
# Frontend: http://localhost:80
```

---

## 🧪 Running Tests

### Backend Tests (Jest + Supertest)

```bash
cd backend
npm test                  # run all unit + integration tests
```

### Frontend Tests (Vitest + Testing Library)

```bash
cd frontend
npm test                  # run component unit tests
npm run test:coverage     # with coverage report
```

### Linting

```bash
# Backend
cd backend && npm run lint

# Frontend
cd frontend && npm run lint
```

---

## 📁 Project Structure

```
Bookish/
├── backend/
│   ├── models/          # Mongoose schemas (User, Book, Order)
│   ├── routes/          # Express routers (auth, books, cart, orders)
│   ├── middleware/       # JWT auth middleware
│   ├── scripts/         # Idempotent seed script
│   ├── tests/           # Unit + integration tests
│   ├── Dockerfile
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Footer, BookCard, ProtectedRoute
│   │   ├── pages/       # 9 pages (Home, Books, Cart, Checkout, etc.)
│   │   ├── hooks/       # useBooks, useCart
│   │   ├── context/     # AuthContext
│   │   └── tests/       # Vitest component tests
│   └── Dockerfile
├── scripts/
│   └── deploy.sh        # Idempotent EC2 deploy script
├── .github/
│   ├── workflows/
│   │   ├── ci.yml       # Lint + test + E2E pipeline
│   │   └── deploy.yml   # EC2 auto-deploy on main push
│   └── dependabot.yml   # Auto-dependency updates
└── docker-compose.yml
```

---

## 🌐 API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/books` | — | List books (paginated, filterable) |
| GET | `/api/books/featured` | — | Top-rated books |
| GET | `/api/books/:id` | — | Book detail |
| POST | `/api/books` | Admin | Create book |
| PUT | `/api/books/:id` | Admin | Update book |
| DELETE | `/api/books/:id` | Admin | Delete book |
| POST | `/api/auth/register` | — | Register user |
| POST | `/api/auth/login` | — | Login (returns JWT) |
| GET | `/api/auth/me` | JWT | Get current user |
| GET | `/api/cart` | JWT | View cart |
| POST | `/api/cart` | JWT | Add item to cart |
| DELETE | `/api/cart/:id` | JWT | Remove from cart |
| POST | `/api/orders` | JWT | Place order |
| GET | `/api/orders/me` | JWT | My orders |
| GET | `/api/orders` | Admin | All orders |

---

## ⚙️ Environment Variables

Create `backend/.env` (copy from `.env.example`):

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bookish

# Authentication
JWT_SECRET=your_very_secret_key_here_change_in_production

# CORS
CLIENT_URL=http://localhost:5173
```

For production, set `NODE_ENV=production` and update `CLIENT_URL` to your domain.

---

## 🤖 GitHub Actions CI/CD

Every push and pull request triggers:
1. **Backend** — ESLint + Jest tests
2. **Frontend** — ESLint + Vitest tests

Merging to `main` triggers an automated SSH deploy to EC2.

Required GitHub Secrets:
- `EC2_HOST` — EC2 public IP or hostname
- `EC2_USER` — SSH username (e.g., `ubuntu`)
- `EC2_SSH_KEY` — Private key content

---

## ✅ Deployment Readiness

| Requirement | Status | Notes |
|-------------|--------|-------|
| Dockerfiles | ✅ | Multi-stage builds for frontend, optimized backend image |
| docker-compose.yml | ✅ | Full stack orchestration with MongoDB |
| CI/CD Pipeline | ✅ | GitHub Actions for lint, test, and auto-deploy |
| Environment Config | ✅ | `.env.example` provided for backend |
| SPA Routing | ✅ | nginx.conf handles client-side routing |
| API Proxy | ✅ | nginx proxies `/api/*` to backend |
| .dockerignore | ✅ | Optimized build context for both services |

### Before Deploying

1. **Create `backend/.env`** from `.env.example` with production values
2. **Set GitHub Secrets** for EC2 deployment (`EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`)
3. **Update `JWT_SECRET`** to a secure random string in production
4. **Configure `CLIENT_URL`** to match your production domain

The app is **deployment-ready** for Docker-based hosting (EC2, DigitalOcean, etc.).

---

## 🐳 Docker

```bash
docker compose up --build     # start all services
docker compose down           # stop
docker compose logs backend   # view logs
```

---

## 📜 Scripts

```bash
# Idempotent deployment (safe to run multiple times)
bash scripts/deploy.sh

# Seed database (safe to run multiple times — skips existing)
cd backend && npm run seed
```

---

## ✨ Unique Features

1. **Blind Date with a Book** — Mystery book subscription based on 3 keywords
2. **Indie Spotlight** — Weekly-updated section for debut authors
3. **Eco-Friendly Shipping** — Carbon-neutral delivery option

---

*Built with ☕ by [@nyxsky404](https://github.com/nyxsky404)*
