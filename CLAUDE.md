# Project Overview
- This is a full-stack marketing + admin CMS for Skooture.ai: a public landing site plus an authenticated admin dashboard to edit page content and view contact messages.
- It solves the need to manage bilingual landing-page content (English/Arabic), theme, and inbound leads without redeploying frontend code.
- Target users are prospective school customers on the landing page and Skooture admins managing site content.
- Current stage: MVP (early stage; several integrations and data-shape mismatches are still unresolved).

# Tech Stack
- Frontend framework: React `19.0.0` + React DOM `19.0.0`.
- Frontend routing: React Router DOM `7.13.2`.
- Build tooling: Vite `6.x` (`vite` + `@vitejs/plugin-react`) with TypeScript.
- Styling: Tailwind CSS `4.1.14`, utility-first class styling, CSS variables in `src/index.css`, `tw-animate-css`, `tailwind-merge`, and shadcn/Base UI component wrappers.
- Motion/visual libs: Framer Motion `12.x`, Lucide React, React Simple Maps.
- Backend language/framework: TypeScript + Node.js + Express `4.21.2`.
- Database: PostgreSQL (configured in Prisma schema).
- ORM: Prisma `5.22.x` (`@prisma/client` + `prisma`).
- Auth: JWT (`jsonwebtoken`) + password hashing with `bcrypt`.
- Validation: `zod` for request validation.
- i18n: `i18next`, `react-i18next`, `i18next-browser-languagedetector`.
- Package manager: npm (root and `server/` both use `package-lock.json`).
- Major third-party/platform services found in config/content: Railway (`server/railway.json`), Vercel SPA rewrite (`vercel.json`), optional Gemini env wiring in Vite (`GEMINI_API_KEY` define).

# Project Structure
```text
.
├── src/                         # Frontend app source (SPA + admin dashboard)
│   ├── api/                     # Browser API client for auth/content/messages endpoints
│   ├── components/              # UI components grouped by landing/admin/shared/ui
│   │   ├── admin/               # Admin layout, editable sections, and shared admin inputs
│   │   ├── landing/             # Public landing page sections (hero, pricing, faq, contact, etc.)
│   │   ├── shared/              # Cross-cutting UI (ProtectedRoute, DynamicIcon)
│   │   └── ui/                  # Reusable design-system primitives (button/card/dialog/input)
│   ├── constants/               # Static config (admin section definitions)
│   ├── context/                 # Global React Context state (content/language/theme/messages)
│   ├── hooks/                   # Custom hooks for auth and editable content state
│   ├── i18n/                    # Active admin translation resources
│   ├── locales/                 # Legacy/duplicate translation files (not the active i18n path)
│   ├── pages/                   # Route-level pages (Landing, Login, Admin)
│   ├── types/                   # Shared TypeScript content/domain interfaces
│   ├── content.json             # Frontend fallback seed content
│   └── index.css                # Global styles, tokens, and utility layers
├── server/                      # Backend API service
│   ├── prisma/                  # Prisma schema and local DB artifacts
│   │   └── schema.prisma        # Data models: User, Content, Message
│   ├── src/                     # Express source code
│   │   ├── lib/                 # Prisma client bootstrap
│   │   ├── middleware/          # Auth middleware (JWT verification)
│   │   ├── routes/              # REST routes for auth, content, and messages
│   │   ├── index.ts             # Server entrypoint + middleware + route mounting
│   │   └── seed.ts              # Seed script for admin user + default content
│   ├── default-content.json     # Backend default content fallback/seed payload
│   ├── package.json             # Backend scripts and dependencies
│   ├── railway.json             # Railway build/deploy settings
│   └── tsconfig.json            # Backend TS config (strict mode)
├── lib/                         # Root-level utility mirror (`lib/utils.ts`) used by `@/` alias
├── dist/                        # Frontend build output (generated)
├── index.html                   # Vite HTML entry
├── package.json                 # Frontend scripts/dependencies
├── tsconfig.json                # Frontend TS config (non-strict)
├── vite.config.ts               # Vite config, alias, and env define setup
└── vercel.json                  # SPA rewrite routing for deployment
```

# Coding Conventions
- Language & type strictness:
  - Frontend is TypeScript but not strict (`tsconfig.json` has no `strict: true`, `allowJs: true`).
  - Backend TypeScript is strict (`server/tsconfig.json` has `strict: true`).
  - `any` is used in many frontend components/hooks and some content-update paths.
- Component patterns:
  - Functional React components only; hooks-based state/effects.
  - Global state via React Context (`ContentContext`, `ThemeContext`) rather than external state libraries.
- Async patterns:
  - Mostly `async/await` with `try/catch`; occasional `.then()` (for token verify in `ProtectedRoute`).
- Import style:
  - Mixed: relative imports (`../...`) and alias imports (`@/...`).
  - Alias `@` resolves to repo root in Vite/TS, not just `src`.
- Styling approach:
  - Tailwind utility classes inline in components.
  - Custom tokens/utilities in `src/index.css` with light/dark variables and helper classes.
  - UI primitives are wrapper components around Base UI/shadcn-style patterns.
- Error handling pattern:
  - Backend routes use route-level `try/catch`, return 4xx for validation/auth issues and 500 fallback.
  - Frontend mostly logs to console and shows minimal inline UI errors.
- Test setup:
  - No test framework, test scripts, or test files are configured.

# Current State
- Features that appear complete:
  - Public landing page shell with many sections and animations.
  - Admin authentication flow (login, token verify, protected route).
  - Backend REST API for auth/content/messages with Prisma models.
  - Seed flow for admin account + default content.
- Features that appear in progress:
  - Admin content editing UI is broad but persistence wiring is incomplete (`updateContent` API exists but is not used in save flow).
  - Contact flow UI exists, but form submission is simulated instead of calling backend messages API.
  - Message management UX is partial (display implemented; delete/read actions not wired in section UI).
  - i18n appears mid-migration (duplicate locale trees and missing translation keys used in components).
- Known issues found:
  - Data-shape mismatches between content and components (e.g., `partners` vs `trustedBy`, `bentoFeatures` vs `features`, pricing structure expectations differ).
  - Sidebar/admin section ID mismatch (`whyUs` menu item has no corresponding render case).
  - `useAdminContent` initializes local state from initial content once and does not sync when async content loads later.
  - Root README describes SQLite while Prisma schema currently targets PostgreSQL.
  - Hardcoded default admin credentials appear in UI and seed fallbacks.
  - Root and server contain duplicate/stale utility/localization/component artifacts (e.g., `button 2.tsx`, `card 2.tsx`, duplicated locale dirs).
- What’s clearly missing or not yet started:
  - No actual school operational modules (students/classes/exams/etc.) in backend data model.
  - No automated tests/CI quality gates.
  - No advanced role-based authorization beyond token presence and stored role value.

# Priority Order
1. Wire contact form to backend messages API
2. Fix `updateContent` save flow in admin
3. Resolve data-shape mismatches (partners/trustedBy, features/bentoFeatures)
4. Fix `useAdminContent` stale state issue

# Changelog

## [current] — MVP
- Landing page shell complete with animations
- Admin auth flow complete (login, token verify, protected route)
- Backend REST API for auth/content/messages complete
- Seed flow for admin account and default content complete

## [next]
- Wire contact form to backend messages API
- Fix updateContent save flow in admin
- Resolve data-shape mismatches (partners/trustedBy, features/bentoFeatures)
- Fix useAdminContent stale state issue

# Architecture Decisions
- Notes on library choices (inferred from implementation; not explicitly documented as ADRs):
  - Prisma is used to keep schema + typed DB client aligned and simplify CRUD in route handlers.
  - React Context is chosen for app-wide content/theme/language state instead of Redux/Zustand.
  - i18next is used for admin/static UI translation with browser language detection.
  - Framer Motion is used as the standard motion layer for both landing and admin transitions.
  - Base UI + shadcn-style wrappers are used for reusable UI primitives.
- Key patterns used:
  - Frontend: SPA + route-based pages + context-driven state.
  - Backend: Express router + middleware pattern; route handlers directly call Prisma (no separate service/repository layer).
  - Content management pattern: key-value JSON content store (`Content` table with `key` and JSON-string `value`) plus default-content fallback.
- What is intentionally not used/avoided (as observed):
  - No SSR/Next.js; this is client-rendered Vite SPA.
  - No dedicated frontend data-fetching cache layer (e.g., React Query).
  - No backend service/repository abstraction; business logic is kept in route files.
  - No migration files in repo workflow; scripts rely on `prisma db push`.

# Commands & Environment
- Root commands (`package.json`):
  - `npm run dev` — run Vite dev server on port 3000.
  - `npm run build` — build frontend.
  - `npm run preview` — preview production build.
  - `npm run clean` — remove `dist`.
  - `npm run lint` — type-check only (`tsc --noEmit`).
- Backend commands (`server/package.json`):
  - `npm run dev` — run backend with `tsx watch`.
  - `npm run build` — generate Prisma client + compile TypeScript.
  - `npm run start` — run compiled backend (`dist/index.js`).
  - `npm run db:push` — push Prisma schema to DB.
  - `npm run db:studio` — open Prisma Studio.
  - `npm run db:seed` — seed admin + default content.
- Test commands:
  - None are configured in root or server `package.json`.
- Environment variable keys referenced in code/config/docs:
  - Frontend/build: `VITE_API_URL`, `GEMINI_API_KEY`, `APP_URL`, `DISABLE_HMR`.
  - Backend/runtime: `DATABASE_URL`, `JWT_SECRET`, `PORT`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NODE_ENV`.

# API Reference
All requests use base URL from `VITE_API_URL` env var.

Auth:
- POST /api/auth/login       — body: { email, password } → { token, user }
- GET  /api/auth/verify      — header: Authorization: Bearer <token>

Content (protected):
- GET  /api/content          — returns all content as { key: stringifiedJSON }
- PUT  /api/content/:key     — body: { value: JSON } → updates one content key
- POST /api/content/reset    — deletes all content rows, falls back to defaults

Messages:
- POST /api/messages         — public, body: { name, email, message }
- GET  /api/messages         — protected, returns array of message objects
- PATCH /api/messages/:id    — protected, mark as read
- DELETE /api/messages/:id   — protected

# Domain Concepts
- Core entities:
  - `User`: admin account (`email`, `passwordHash`, `role`, timestamps).
  - `Content`: CMS-like key/value store where each section payload is JSON serialized under a unique key.
  - `Message`: contact form submission (`name`, `email`, `message`, `read`, `createdAt`).
- Relationships:
  - One `User` can update many `Content` entries (`Content.updatedById -> User.id`).
  - `Message` is standalone (not linked to `User`).
- User roles:
  - Role field exists (`role` default `admin`) and is included in JWT, but route authorization currently checks token validity only (no role-based gating logic).
- Key business rules visible in code:
  - Login requires valid email + password length >= 6.
  - Contact message validation: name 1–100 chars, valid email, message 1–2000 chars.
  - JWT expires in 7 days.
  - Content reset deletes all persisted content so API falls back to default content JSON.

# User Flows

## Visitor flow
Landing page loads → GET /api/content → sections render with live content → 
visitor fills contact form → POST /api/messages → message stored in DB

## Admin flow
/login → POST /api/auth/login → token stored in localStorage → 
redirect to /admin → ProtectedRoute calls GET /api/auth/verify → 
sidebar shows sections → admin edits content → 
save triggers PUT /api/content/:key → content persisted in DB

## Content fallback flow
GET /api/content → if DB has no rows for a key → 
server reads server/default-content.json → returns default → 
frontend also has src/content.json as last-resort fallback

# AI Behavior Rules
- Do not modify any file outside the scope of the current task
- Do not refactor existing code unless explicitly asked
- Do not change architecture or introduce new libraries without asking
- If business logic is unclear, ask before implementing
- Match the code style of the file you are editing
- Always use TypeScript types — never use `any`
- Keep diffs small and focused
- Content shape changes must stay in sync between `src/types/`, `server/prisma/schema.prisma`, and `server/default-content.json`
- Never use the `locales/` dir — use `src/i18n/` only
- Do not touch `button 2.tsx` or `card 2.tsx` — they are stale files
- The `@/` alias resolves to repo root, not `src/`

# Out of Scope
- Full school-management operational backend (students, teachers, classes, exams, attendance, fees) is not implemented in current server models/routes.
- Multi-role authorization flows (beyond basic admin token auth) are not implemented.
- End-to-end AI product functionality is not implemented despite AI-oriented branding and dependencies.
- Formal test infrastructure (unit/integration/e2e) and CI checks are not started.
- Payment/billing execution logic is not implemented; pricing is currently content-driven presentation.

# Content Shape Reference
Canonical content keys and their expected data shape — always refer to this before reading or writing content:
- `hero` → { title, subtitle, cta }
- `trustedBy` → { items: [{ name, logo }] }  ← NOT `partners`
- `features` → { items: [...] }  ← NOT `bentoFeatures`
- `brand` → { logoUrl }
- `hero` → { topBadge, videoUrl, headline, subheadline, buttons }
- `partners` → { title, logos }
- `traction` → { value, label, icon }
- `legacy` → { title, items }
- `why` → { title, content, labels }
- `global` → { title, locations }
- `aiCore` → { title, features }
- `topFeatures` → { title, buttonMore, buttonLess, items }
- `bentoFeatures` → { title, features }
- `testimonials` → { title, items }
- `pricing` → { title, button, plans }
- `faq` → { title, items }
- `cta` → { title, subtitle, button }

For any content key not listed here, read `server/default-content.json` as the source of truth.
