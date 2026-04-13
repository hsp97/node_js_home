# AI Project Context
File: project_context.md

## Purpose

This document provides the **real project context** that the AI must analyze before modifying or generating code.

The goal is to prevent:

- AI hallucination
- incorrect architectural assumptions
- breaking existing functionality
- modifying the wrong modules
- inconsistent implementation patterns

Before any code change, the AI must read and understand this file.

> This file must contain **actual project facts**.
> If a fact is unknown, write `Unknown` instead of guessing.

---

# 1. Project Identity

- Project name: `investing-clone`
- Repository name: `node_js_home`
- Primary service type: `Full-stack web app (frontend-focused)`
- Main framework(s): `Next.js 15 (App Router)`
- Default language(s): `TypeScript`
- Current status: `Active development`
- Primary maintainers: `hsp97`

---

# 2. System Overview

This project is a clone of Investing.com's main page, featuring market data visualization, financial news aggregation, and an economic calendar. It serves as a learning project and potential foundation for a financial information portal.

- System summary: `Investing.com clone with market data, news, and economic calendar features`
- Primary users: `General public, investors seeking market information`
- Core business domains: `Market data display, Financial news, Economic calendar, Dashboard customization`
- Critical workflows: `Dashboard grid layout persistence, Market data display, News feed rendering`
- Non-negotiable behavior that must be preserved: `Dashboard layout save/restore, Market ticker animation, Responsive design`

---

# 3. Supported Technology Stack

## 3.1 Languages and Frameworks

- Backend language: `TypeScript (Next.js API routes - not yet implemented)`
- Backend framework: `Next.js 15 App Router`
- Frontend language: `TypeScript`
- Frontend framework: `React 18.3 with Next.js 15`
- Runtime: `Node.js`
- Monorepo / polyrepo: `Single repo (polyrepo)`

## 3.2 Data and Infrastructure

- Primary database: `N/A (mock data currently used)`
- ORM / query builder: `N/A`
- Cache / queue: `N/A`
- Web server / proxy: `Next.js built-in server`
- Container / deployment: `Unknown`
- Cloud / hosting: `Unknown`
- File storage: `N/A`

## 3.3 Tooling

- Package manager: `npm`
- Test framework: `Unknown (not configured)`
- Linter / formatter: `ESLint (eslint-config-next)`
- Build tool: `Next.js built-in (Turbopack/Webpack)`
- CI/CD: `Unknown`

Rules:

- The AI must not introduce a new language, framework, or library without clear justification.
- The AI must prefer the versions, tools, and patterns already used by the project.
- The AI must not assume an unused framework feature is already adopted.

---

# 4. Repository and Directory Structure

## 4.1 Repository Layout

```text
node_js_home/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main homepage
│   │   ├── globals.css         # Global styles + Tailwind
│   │   ├── login/page.tsx      # Login page
│   │   └── dashboard/page.tsx  # Dashboard page (customizable grid)
│   ├── components/             # React components
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer
│   │   ├── MarketTicker.tsx    # Scrolling ticker
│   │   ├── MarketOverview.tsx  # Market data table
│   │   ├── LatestNews.tsx      # News feed
│   │   ├── MarketMovers.tsx    # Top gainers/losers
│   │   ├── Sidebar.tsx         # Sidebar widgets
│   │   ├── DashboardGrid.tsx   # Draggable grid layout
│   │   ├── VixGauge.tsx        # Fear & Greed indicator
│   │   ├── Watchlist.tsx       # User watchlist
│   │   ├── EconomicCalendar.tsx# Economic events
│   │   └── Providers.tsx       # Context providers
│   ├── data/
│   │   └── mockData.ts         # Mock market/news data
│   ├── types/
│   │   └── market.ts           # TypeScript interfaces
│   └── lib/
│       ├── api.ts              # API utility functions
│       ├── useMarketData.ts    # Data fetching hook
│       └── i18n/               # Internationalization
│           ├── index.ts
│           ├── LocaleContext.tsx
│           └── translations.ts
├── public/                     # Static assets
├── CLAUDE.md                   # AI assistant guide
├── claude_change.md            # AI governance rules
├── ai_pr_security_review.md    # PR review workflow
├── security_code_review_checklist.md
├── web_api_security_manual.md
├── project_context.md          # This file
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## 4.2 Important Directories and Files

### src/app/
- Path: `src/app/`
- Purpose: `Next.js App Router pages and layouts`
- Typical contents: `page.tsx, layout.tsx, route handlers`
- Can AI modify it?: `Yes`
- Notes: `Uses App Router conventions`

### src/components/
- Path: `src/components/`
- Purpose: `Reusable React components`
- Typical contents: `*.tsx component files`
- Can AI modify it?: `Yes`
- Notes: `Client components use "use client" directive`

### src/data/
- Path: `src/data/`
- Purpose: `Mock data for development`
- Typical contents: `mockData.ts with typed exports`
- Can AI modify it?: `Yes`
- Notes: `To be replaced with real API calls`

### src/lib/
- Path: `src/lib/`
- Purpose: `Utilities, hooks, and shared logic`
- Typical contents: `API functions, custom hooks, i18n`
- Can AI modify it?: `Yes`
- Notes: `None`

### src/types/
- Path: `src/types/`
- Purpose: `TypeScript type definitions`
- Typical contents: `Interface definitions for market data`
- Can AI modify it?: `Yes`
- Notes: `Shared across components`

---

# 5. Architecture Rules

## 5.1 High-Level Pattern

- Primary architecture style: `Component-based (React/Next.js)`
- Business logic location: `src/lib/ and within components`
- Data access location: `src/lib/api.ts, src/data/mockData.ts`
- Validation location: `Within components (client-side)`
- Background job / async processing location: `N/A`
- Shared utility location: `src/lib/`

## 5.2 Layer Responsibilities

- Controller / route handler rule: `N/A (no API routes implemented yet)`
- Service rule: `N/A`
- Repository / model rule: `N/A`
- DTO / request object rule: `N/A`
- Event / queue / job rule: `N/A`

## 5.3 Explicit Architecture Constraints

- Patterns the AI must preserve:
  - Server Components by default, Client Components only when needed ("use client")
  - Mock data imports from src/data/mockData.ts
  - Tailwind CSS utility classes (no CSS modules)
  - Path alias @/* for src/ directory
  - Custom design tokens defined in tailwind.config.ts

- Anti-patterns the AI must avoid:
  - Mixing CSS modules with Tailwind
  - Creating unnecessary API routes when mock data suffices
  - Adding dependencies without justification

- Approved extension points: `Adding new components, Adding new pages, Extending mock data`

---

# 6. Authentication and Authorization Context

- Authentication method: `Not implemented (planned: NextAuth.js)`
- Session / token type: `N/A`
- Auth library or framework feature: `Planned: NextAuth.js`
- Role model: `N/A`
- Permission model: `N/A`
- Ownership checks required for which resources: `N/A`
- Admin-only modules: `N/A`
- Sensitive actions requiring extra verification: `None currently`

Rules:

- The AI must not assume protected routes are public.
- The AI must verify role and ownership checks when modifying sensitive endpoints.
- The AI must preserve existing auth middleware, guards, policies, or interceptors unless explicitly approved.

---

# 7. API and Interface Conventions

- API style: `N/A (currently mock data, future: REST or Server Actions)`
- Route naming pattern: `kebab-case for pages (e.g., /dashboard)`
- Request validation pattern: `N/A`
- Response format: `N/A`
- Error response format: `N/A`
- Pagination convention: `N/A`
- Versioning convention: `None`
- Serialization / transformation rule: `None`

---

# 8. Database and Persistence Context

- Primary database: `N/A (no database)`
- Secondary stores: `localStorage for dashboard layout persistence`
- ORM / query builder / raw SQL policy: `N/A`
- Migration tool: `N/A`
- Seed / fixture approach: `Mock data in src/data/mockData.ts`
- Transaction rules: `N/A`
- Soft delete rules: `N/A`
- Audit field rules: `N/A`
- High-risk tables / collections: `N/A`
- Concurrency-sensitive operations: `N/A`

---

# 9. External Systems and Integration Points

Currently no external integrations. Future plans include:

- Real-time market data API (e.g., Alpha Vantage, Yahoo Finance)
- News aggregation API
- Authentication provider (NextAuth.js)

---

# 10. Security Context

This project follows the standards described in:

- `web_api_security_manual.md`
- `security_code_review_checklist.md`
- `ai_pr_security_review.md`

Project-specific security facts:

- Protected data types: `None currently (no user data stored)`
- Upload-sensitive modules: `None`
- Admin-sensitive modules: `None`
- Public attack surface: `Frontend only, no API endpoints`
- Logging restrictions: `N/A`
- Encryption requirements: `None currently`
- Secret handling requirements: `Environment variables for future API keys`
- Rate-limited endpoints: `None`
- High-risk flows: `None currently`

---

# 11. Coding Standards

- Naming conventions:
  - Components: PascalCase (e.g., `MarketOverview.tsx`)
  - Functions/variables: camelCase
  - CSS classes: Tailwind utilities

- File naming rules: `PascalCase for components, camelCase for utilities`
- Folder placement rules: `Components in src/components/, pages in src/app/`
- Formatter rules: `ESLint with next/core-web-vitals`
- Test naming rules: `Unknown (no tests configured)`
- Comment policy: `Minimal comments, code should be self-documenting`
- Import policy: `Use @/* path alias for src/ imports`
- Error handling policy: `Display user-friendly error states in components`

---

# 12. Testing and Verification Strategy

- Unit test framework: `Unknown (not configured)`
- Integration test framework: `Unknown (not configured)`
- API test approach: `N/A`
- E2E test approach: `Unknown (not configured)`
- Smoke test checklist:
  - Homepage loads correctly
  - Dashboard grid is draggable and resizable
  - Layout persists in localStorage
  - All tabs in MarketOverview work
  - Responsive design functions properly
- Manual verification flow: `Run npm run dev, test in browser`
- Minimum verification required before merge: `npm run build succeeds, npm run lint passes`

---

# 13. Deployment and Environment Notes

- Environments: `local / Unknown (prod not configured)`
- Config differences: `N/A`
- Secret source: `Environment variables (future)`
- File storage differences: `N/A`
- Queue / scheduler differences: `N/A`
- Build / deployment pipeline summary: `npm run build`
- Rollback constraints: `Unknown`
- Deployment restrictions: `None`

---

# 14. Forbidden Changes

Project-specific forbidden changes:

- Removing react-grid-layout dependency (core feature)
- Changing localStorage key for dashboard layout without migration
- Removing i18n support
- Breaking responsive design
- Changing Tailwind custom color tokens without updating all usages

---

# 15. AI Pre-Modification Checklist

Before editing any code, the AI must confirm:

- [x] the project structure is understood
- [x] the relevant modules are identified
- [x] the existing architecture pattern is known (Next.js App Router + React components)
- [x] authentication and authorization requirements are known (none currently)
- [x] database and API impacts are checked (none - mock data only)
- [x] security requirements are known (frontend only)
- [x] no sensitive data is introduced
- [x] existing functionality is preserved as much as possible

---

# 16. Custom Design Tokens Reference

Defined in `tailwind.config.ts`:

| Token | Value | Usage |
|-------|-------|-------|
| `inv-green` | `#059669` | Positive price changes |
| `inv-red` | `#dc2626` | Negative price changes |
| `inv-dark` | `#1b2028` | Top bar, footer backgrounds |
| `inv-nav` | `#253040` | Main navigation background |
| `inv-blue` | `#2962ff` | Links, active tabs, CTAs |
| `inv-light` | `#f8f9fa` | Alternating table rows |
| `inv-border` | `#e0e3eb` | Card/table borders |
| `inv-text` | `#333333` | Primary text |
| `inv-text-light` | `#6a6d78` | Secondary/muted text |

---

# 17. Recent Changes

- Dashboard max-width expanded to 1800px
- DashboardGrid containerWidth initial value set to 1768px
- Next.js upgraded from 14.2.35 to 15.5.10
- Default layout heights adjusted for widgets

---

# 18. Maintenance Note

This file becomes effective only when it contains real project facts.
Keep this file updated when architecture or infrastructure changes.

Last updated: 2026-03-16
