# CyberSec Academy - Architecture Document

## Platform Vision
A world-class Cybersecurity Education + Practical Training Platform combining:
- Learning Management System
- Interactive Cybersecurity Academy
- Virtual Cyber Lab
- CTF Training Platform
- Security Simulation Platform
- Professional Practice Environment
- Certification Platform

---

## Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router, SSR/SSG |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Zustand** | Lightweight state management |
| **React Query** | Server state & caching |
| **Xterm.js** | In-browser terminal emulator |
| **D3.js / React Flow** | Skill trees, network diagrams |
| **Monaco Editor** | Code editor for labs |
| **Framer Motion** | Purposeful animations |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js + Express** | API server |
| **TypeScript** | Type safety |
| **PostgreSQL** | Primary database |
| **Prisma** | ORM with migrations |
| **Redis** | Sessions, caching, rate limiting |
| **JWT + bcrypt** | Authentication |
| **Socket.io** | Real-time lab communication |
| **Bull/BullMQ** | Job queue for lab provisioning |

### Lab Infrastructure (Phase 2+)
| Technology | Purpose |
|-----------|---------|
| **Docker** | Container-based isolated labs |
| **Kubernetes** | Lab orchestration at scale |
| **WebSocket Proxy** | Terminal streaming |
| **Custom Lab Engine** | Lab lifecycle management |

### DevOps
| Technology | Purpose |
|-----------|---------|
| **Docker Compose** | Local development |
| **GitHub Actions** | CI/CD |
| **Nginx** | Reverse proxy |
| **Let's Encrypt** | TLS certificates |

---

## Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                         │
│  Next.js App (SSR + CSR)                                │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐ │
│  │Dashboard │ │ Courses  │ │  Labs    │ │    CTF    │ │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘ │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTPS
┌───────────────────────▼─────────────────────────────────┐
│              API GATEWAY / REVERSE PROXY                  │
│              (Nginx + Rate Limiting)                      │
└───────────────────────┬─────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────┐
│                  BACKEND API SERVER                       │
│  ┌────────┐ ┌──────┐ ┌──────┐ ┌───────┐ ┌──────────┐  │
│  │  Auth  │ │Course│ │ Lab  │ │  CTF  │ │ Progress │  │
│  │Service │ │Svc   │ │ Svc  │ │  Svc  │ │  Service │  │
│  └────────┘ └──────┘ └──────┘ └───────┘ └──────────┘  │
└──────┬────────────────────────────────┬─────────────────┘
       │                                │
┌──────▼──────┐                 ┌───────▼────────┐
│ PostgreSQL  │                 │     Redis      │
│  Database   │                 │  Cache/Queue   │
└─────────────┘                 └────────────────┘
                                        │
                        ┌───────────────▼──────────────┐
                        │   LAB ORCHESTRATION ENGINE    │
                        │  (Isolated from Production)   │
                        │  ┌─────┐ ┌─────┐ ┌─────┐    │
                        │  │Lab 1│ │Lab 2│ │Lab N│    │
                        │  └─────┘ └─────┘ └─────┘    │
                        └──────────────────────────────┘
```

---

## Database Schema Design

### Core Entities

```
Users
├── id (UUID)
├── email (unique)
├── password_hash
├── first_name
├── last_name
├── role (SUPER_ADMIN, ADMIN, INSTRUCTOR, STUDENT, PROFESSIONAL, LAB_MANAGER)
├── level (BEGINNER, STUDENT, PROFESSIONAL, ADVANCED)
├── xp_points
├── current_streak
├── avatar_url
├── mfa_enabled
├── email_verified
├── created_at
└── updated_at

LearningPaths
├── id (UUID)
├── title
├── description
├── difficulty (BEGINNER, INTERMEDIATE, ADVANCED, PROFESSIONAL)
├── duration_hours
├── prerequisites (JSON)
├── order_index
├── is_published
├── icon
└── created_at

Courses
├── id (UUID)
├── learning_path_id (FK)
├── title
├── description
├── difficulty
├── duration_hours
├── order_index
├── is_published
├── instructor_id (FK → Users)
├── thumbnail_url
├── skills (JSON array)
└── created_at

Modules
├── id (UUID)
├── course_id (FK)
├── title
├── description
├── order_index
└── created_at

Lessons
├── id (UUID)
├── module_id (FK)
├── title
├── content (JSON - rich content blocks)
├── lesson_type (THEORY, PRACTICAL, LAB, QUIZ, CHALLENGE)
├── order_index
├── duration_minutes
├── xp_reward
├── key_terms (JSON)
├── commands (JSON)
├── diagram_data (JSON)
└── created_at

Labs
├── id (UUID)
├── lesson_id (FK, nullable)
├── title
├── description
├── difficulty
├── duration_minutes
├── environment_config (JSON)
├── objectives (JSON array)
├── instructions (JSON - step by step)
├── hints (JSON array)
├── validation_script
├── network_diagram (JSON)
├── tools_required (JSON)
├── xp_reward
└── created_at

Challenges
├── id (UUID)
├── title
├── description
├── category (WEB, NETWORK, LINUX, WINDOWS, CRYPTO, FORENSICS, CLOUD)
├── difficulty
├── points
├── flag_hash
├── hints (JSON)
├── max_attempts
├── is_active
└── created_at

Quizzes
├── id (UUID)
├── lesson_id (FK)
├── title
├── time_limit_minutes
├── passing_score
├── xp_reward
└── created_at

Questions
├── id (UUID)
├── quiz_id (FK)
├── question_text
├── question_type (MULTIPLE_CHOICE, TRUE_FALSE, SHORT_ANSWER, SCENARIO)
├── options (JSON)
├── correct_answer
├── explanation
├── points
├── order_index
└── created_at

UserProgress
├── id (UUID)
├── user_id (FK)
├── entity_type (COURSE, MODULE, LESSON, LAB, CHALLENGE)
├── entity_id (UUID)
├── status (NOT_STARTED, IN_PROGRESS, COMPLETED)
├── score (nullable)
├── completed_at (nullable)
├── time_spent_seconds
└── created_at

UserBadges
├── id (UUID)
├── user_id (FK)
├── badge_id (FK)
├── earned_at
└── created_at

Badges
├── id (UUID)
├── name
├── description
├── icon
├── criteria (JSON)
├── xp_reward
└── created_at

Certificates
├── id (UUID)
├── user_id (FK)
├── certification_path_id (FK)
├── issued_at
├── verification_code (unique)
├── score
└── created_at

LabInstances
├── id (UUID)
├── lab_id (FK)
├── user_id (FK)
├── status (PROVISIONING, RUNNING, PAUSED, STOPPED, EXPIRED)
├── container_id
├── started_at
├── expires_at
├── stopped_at
└── created_at

AuditLogs
├── id (UUID)
├── user_id (FK)
├── action
├── entity_type
├── entity_id
├── metadata (JSON)
├── ip_address
└── created_at

Notifications
├── id (UUID)
├── user_id (FK)
├── title
├── message
├── type
├── is_read
├── link
└── created_at
```

---

## API Design

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me
```

### Users
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/progress
GET    /api/users/badges
GET    /api/users/certificates
GET    /api/users/analytics
```

### Learning Paths
```
GET    /api/learning-paths
GET    /api/learning-paths/:id
GET    /api/learning-paths/:id/courses
```

### Courses
```
GET    /api/courses
GET    /api/courses/:id
GET    /api/courses/:id/modules
POST   /api/courses/:id/enroll
```

### Lessons
```
GET    /api/lessons/:id
POST   /api/lessons/:id/complete
GET    /api/lessons/:id/content
```

### Labs
```
GET    /api/labs
GET    /api/labs/:id
POST   /api/labs/:id/start
POST   /api/labs/:id/stop
POST   /api/labs/:id/reset
POST   /api/labs/:id/validate
GET    /api/labs/:id/status
```

### CTF / Challenges
```
GET    /api/challenges
GET    /api/challenges/:id
POST   /api/challenges/:id/submit
GET    /api/challenges/leaderboard
```

### Quizzes
```
GET    /api/quizzes/:id
POST   /api/quizzes/:id/submit
GET    /api/quizzes/:id/results
```

### Progress
```
GET    /api/progress/overview
GET    /api/progress/skills
GET    /api/progress/recommendations
```

### Admin
```
GET    /api/admin/users
PUT    /api/admin/users/:id/role
GET    /api/admin/analytics
POST   /api/admin/courses
PUT    /api/admin/courses/:id
DELETE /api/admin/courses/:id
POST   /api/admin/labs
```

### Search
```
GET    /api/search?q=<query>&type=<type>
```

---

## Security Architecture

### Authentication & Authorization
- JWT access tokens (15 min expiry)
- Refresh tokens (7 day expiry, stored in httpOnly cookies)
- bcrypt password hashing (12 rounds)
- Role-Based Access Control (RBAC) middleware
- MFA support (TOTP)
- Email verification required

### API Security
- Rate limiting (100 req/min general, 5 req/min auth)
- Input validation (Zod schemas)
- CORS configuration
- Helmet.js security headers
- Request size limits
- SQL injection prevention (Prisma parameterized queries)
- XSS prevention (Content-Security-Policy)

### Lab Security
- Complete network isolation (Docker networks)
- Resource limits (CPU, memory, disk)
- Auto-expiration (max 2 hours)
- No outbound internet from lab containers
- Separate infrastructure from production
- Audit logging of all lab activities

### Data Security
- Encryption at rest (database)
- TLS in transit
- Secrets in environment variables
- No credentials in code
- Audit logging

---

## Folder Structure

```
cybesecurity/
├── ARCHITECTURE.md
├── docker-compose.yml
├── .env.example
├── packages/
│   ├── frontend/              # Next.js Application
│   │   ├── app/
│   │   │   ├── (auth)/       # Auth pages (login, register)
│   │   │   ├── (platform)/   # Main platform pages
│   │   │   │   ├── dashboard/
│   │   │   │   ├── courses/
│   │   │   │   ├── learning-paths/
│   │   │   │   ├── labs/
│   │   │   │   ├── ctf/
│   │   │   │   ├── challenges/
│   │   │   │   ├── soc/
│   │   │   │   ├── projects/
│   │   │   │   ├── skill-tree/
│   │   │   │   ├── certifications/
│   │   │   │   ├── leaderboard/
│   │   │   │   ├── ai-mentor/
│   │   │   │   ├── profile/
│   │   │   │   └── admin/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx      # Landing page
│   │   ├── components/
│   │   │   ├── ui/           # Reusable UI components
│   │   │   ├── layout/       # Navigation, sidebar, footer
│   │   │   ├── course/       # Course-specific components
│   │   │   ├── lab/          # Lab-specific components
│   │   │   ├── dashboard/    # Dashboard widgets
│   │   │   └── common/       # Shared components
│   │   ├── lib/
│   │   │   ├── api.ts        # API client
│   │   │   ├── auth.ts       # Auth utilities
│   │   │   └── utils.ts      # Helpers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── stores/           # Zustand stores
│   │   ├── types/            # TypeScript types
│   │   ├── styles/           # Global styles
│   │   ├── public/           # Static assets
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── backend/              # Express API Server
│       ├── src/
│       │   ├── server.ts     # Entry point
│       │   ├── app.ts        # Express app setup
│       │   ├── config/       # Configuration
│       │   ├── middleware/   # Auth, RBAC, validation, rate-limit
│       │   ├── routes/       # Route definitions
│       │   ├── controllers/  # Request handlers
│       │   ├── services/     # Business logic
│       │   ├── models/       # Prisma client & helpers
│       │   ├── utils/        # Utilities
│       │   ├── types/        # TypeScript types
│       │   └── seeds/        # Database seed data
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       ├── tsconfig.json
│       └── package.json
│
└── docs/                     # Documentation
    ├── API.md
    ├── DEPLOYMENT.md
    └── LAB_DESIGN.md
```

---

## Phased Implementation Plan

### Phase 1 (Current) - Foundation
- [x] Architecture design
- [ ] Project setup (monorepo, configs)
- [ ] Database schema + migrations
- [ ] Authentication (register, login, JWT, RBAC)
- [ ] Course/Module/Lesson CRUD APIs
- [ ] Progress tracking API
- [ ] Landing page (premium design)
- [ ] Dashboard with progress
- [ ] Course listing & detail pages
- [ ] Lesson viewer
- [ ] Responsive design
- [ ] Demo data seeding

### Phase 2 - Cyber Lab
- Lab orchestration engine
- Docker-based isolated environments
- In-browser terminal (xterm.js + WebSocket)
- Lab lifecycle (start/stop/reset/expire)
- Lab instructions & objectives UI
- Lab validation system
- 10+ guided labs

### Phase 3 - CTF & Challenges
- Challenge submission system
- Flag validation
- Leaderboard
- Points & scoring
- Hint system
- Challenge categories
- 30+ challenges

### Phase 4 - SOC Simulator
- Simulated SOC dashboard
- Security alerts & events
- Log viewer
- Investigation workflow
- Incident management
- Threat indicators
- Triage exercises

### Phase 5 - AI Mentor
- AI chat interface
- Context-aware explanations
- Adaptive difficulty
- Hint system for CTF
- Learning recommendations
- Concept explanations

### Phase 6 - Certifications & Advanced
- Certification paths
- Capstone projects
- Advanced analytics
- Learning recommendations engine
- Certificate generation & verification
- Interview preparation module

---

## Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| API Response (p95) | < 200ms |
| Lab Provisioning | < 30s |
| Concurrent Users | 1000+ |
| Database Queries | < 50ms avg |

---

## Responsive Breakpoints

| Device | Width |
|--------|-------|
| Mobile | < 768px |
| Tablet | 768px - 1024px |
| Desktop | > 1024px |
| Large Desktop | > 1440px |

Lab interface converts to tabbed layout on mobile/tablet.
