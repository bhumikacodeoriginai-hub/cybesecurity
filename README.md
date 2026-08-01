# CyberSec Academy

**World-Class Cybersecurity Learning & Practical Lab Platform**

Learn Cybersecurity. Practice It. Master It.

---

## Overview

CyberSec Academy is a comprehensive cybersecurity education platform combining:
- Interactive Learning Management System
- Practical Cyber Labs with isolated environments
- CTF (Capture The Flag) challenges
- SOC Simulator for blue team training
- AI Cybersecurity Mentor
- Professional certification paths

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL with Prisma ORM |
| Cache | Redis |
| Auth | JWT + bcrypt + RBAC |
| Labs | Docker containers (Phase 2) |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional, for full stack)

### Quick Start with Docker

```bash
docker-compose up -d
```

### Manual Setup

1. **Install dependencies:**
```bash
npm install
cd packages/backend && npm install
cd ../frontend && npm install
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Setup database:**
```bash
cd packages/backend
npx prisma migrate dev
npm run seed
```

4. **Start development servers:**
```bash
# From root
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000/api
- API Health: http://localhost:4000/api/health

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@cybersecacademy.com | Admin123! |
| Instructor | instructor@cybersecacademy.com | Admin123! |
| Student | student@cybersecacademy.com | Student123! |

## Project Structure

```
cybesecurity/
├── packages/
│   ├── frontend/          # Next.js 14 App
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable components
│   │   └── ...
│   └── backend/           # Express API
│       ├── src/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── routes/
│       │   ├── models/
│       │   └── seeds/
│       └── prisma/        # Database schema
├── ARCHITECTURE.md        # Full architecture documentation
├── docker-compose.yml     # Docker development setup
└── README.md
```

## Features (Phase 1)

- [x] Premium landing page with cybersecurity theme
- [x] User authentication (register, login, JWT)
- [x] Role-based access control (6 roles)
- [x] 10 learning paths (Foundations → Professional)
- [x] Course listing and detail pages
- [x] Interactive lesson viewer with rich content
- [x] Progress tracking and XP system
- [x] CTF challenge system with flag submission
- [x] Cyber Lab interface
- [x] Skill tree visualization
- [x] Leaderboard
- [x] User profile and badges
- [x] Global search API
- [x] Responsive design (mobile, tablet, desktop)
- [x] Demo seed data

## Upcoming Phases

- **Phase 2:** Practical Labs with Docker isolation and in-browser terminal
- **Phase 3:** CTF engine, leaderboard system, badges automation
- **Phase 4:** SOC Simulator with realistic incidents
- **Phase 5:** AI Cybersecurity Mentor
- **Phase 6:** Certifications, capstone projects, advanced analytics

## Security

- All practical activities are designed for **authorized educational environments only**
- Lab environments are completely isolated from production
- No lab activity can affect external systems
- Platform implements defense-in-depth security controls

## License

Proprietary - All rights reserved.
