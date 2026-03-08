# SkillSwap Frontend

A student-friendly Angular 17 frontend for the SkillSwap REST API. Browse jobs, post projects, submit proposals, and review freelancers — all in one place.

---

## Tech Stack

- **Angular 19** — standalone components, functional guards & interceptors
- **Bootstrap 5** — CDN-based styling (no install needed)
- **RxJS** — reactive data streams
- **TypeScript 5.6**

---

## Setup

```bash
# Install dependencies
npm install

# Run development server (http://localhost:4200)
ng serve

# Build for production
ng build
```

> **API Base URL:** `https://stingray-app-wxhhn.ondigitalocean.app`

---

## Features

| Feature | Route | Auth Required |
|---------|-------|---------------|
| Landing page with platform stats | `/` | No |
| User registration | `/register` | No |
| User login | `/login` | No |
| Dashboard with user stats | `/dashboard` | Yes |
| Browse & search jobs | `/jobs` | Yes |
| Post a new job | `/jobs/create` | Yes |
| View job detail & submit/manage proposals | `/jobs/:id` | Yes |
| My job postings | `/my-postings` | Yes |
| My submitted bids | `/my-bids` | Yes |
| View user profile + reviews | `/profile/:username` | Yes |

---

## Business Flow

1. **Register / Login** → JWT token stored in `localStorage`
2. **Browse Jobs** → search by category, status, min budget
3. **Post a Job** → fill in title, description, budget, category
4. **Submit Proposal** → freelancers bid on open jobs
5. **Accept Proposal** → job owner accepts the best bid (status → `in_progress`)
6. **Complete Job** → either party marks it done (status → `completed`)
7. **Leave a Review** → both parties can rate each other after completion

---

## Folder Structure

```
src/app/
├── core/
│   ├── models/         # TypeScript interfaces (User, Job, Proposal, etc.)
│   ├── services/       # API services (auth, job, proposal, review, user, platform)
│   ├── interceptors/   # auth.interceptor — attaches JWT to requests
│   └── guards/         # auth.guard — protects private routes
├── features/
│   ├── home/           # Public landing page
│   ├── auth/           # Login & Register pages
│   ├── dashboard/      # User dashboard
│   ├── jobs/           # Job list, detail, create, my-postings
│   ├── proposals/      # My bids page
│   └── profile/        # User profile page
└── shared/
    └── components/
        ├── navbar/     # Top navigation bar
        └── alert/      # Reusable alert banner
```

---

## Group Contribution

| Name | Student ID | Contribution |
|------|-----------|--------------|
| Member 1 | — | Core services & interceptor |
| Member 2 | — | Auth feature (login/register) |
| Member 3 | — | Jobs feature (list, detail, create) |
| Member 4 | — | Proposals, profile, dashboard |

---

## Notes for Students

- All components use **Angular 17 standalone API** — no NgModules.
- The `inject()` function is used instead of constructor injection for cleaner code.
- Error messages follow the pattern: `err.error?.error || 'fallback message'`
- The `AuthService` uses a `BehaviorSubject` so the navbar reactively updates on login/logout.
