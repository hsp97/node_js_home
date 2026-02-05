# CLAUDE.md - AI Assistant Guide for Investing.com Clone

## Project Overview

**Project Name**: investing-clone
**Description**: A Next.js-based clone of the Investing.com main page, featuring market data, financial news, and economic calendar
**Stage**: Active development
**Stack**: Next.js 14 (App Router) + TypeScript + Tailwind CSS

## Repository Structure

```
node_js_home/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main homepage (assembles all sections)
│   │   └── globals.css         # Global styles + Tailwind directives + animations
│   ├── components/
│   │   ├── Header.tsx          # Top bar + navigation + search + auth buttons
│   │   ├── MarketTicker.tsx    # Scrolling price ticker bar
│   │   ├── MarketOverview.tsx  # Tabbed market data table (indices/commodities/currencies/crypto)
│   │   ├── LatestNews.tsx      # Featured article + news list
│   │   ├── MarketMovers.tsx    # Top gainers/losers tables
│   │   ├── Sidebar.tsx         # InvestingPro CTA + most popular + economic calendar
│   │   └── Footer.tsx          # Footer links + social + app store badges
│   ├── data/
│   │   └── mockData.ts         # All mock market data, news, and calendar events
│   └── types/
│       └── market.ts           # TypeScript interfaces (MarketItem, NewsItem, EconomicEvent)
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind theme (custom colors, fonts)
├── postcss.config.js           # PostCSS plugins
├── next.config.js              # Next.js configuration
├── next-env.d.ts               # Next.js TypeScript declarations
├── .gitignore                  # Git ignored files
└── CLAUDE.md                   # This file
```

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The dev server runs on **http://localhost:3000** by default.

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3.4 with custom theme
- **React**: 18.3 (Server and Client Components)

## Architecture Decisions

### App Router
Uses Next.js App Router (`src/app/`). The `layout.tsx` provides the HTML shell and metadata. The `page.tsx` is the homepage entry point.

### Client vs Server Components
- **Server Components** (default): `LatestNews`, `Sidebar`, `Footer` - no interactivity needed
- **Client Components** (`"use client"`): `Header`, `MarketTicker`, `MarketOverview`, `MarketMovers` - require `useState` for tabs, dropdowns, search

### Mock Data Pattern
All data lives in `src/data/mockData.ts` with typed exports. When connecting to real APIs, replace these imports with fetch calls or server actions. Types are defined in `src/types/market.ts`.

## Custom Design Tokens

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

## Component Guide

### Header (`src/components/Header.tsx`)
- Sticky positioned, z-50
- Two-level: dark top bar (edition/language) + nav bar (logo, menus, search, auth)
- Dropdown menus on hover (desktop), hamburger menu (mobile)

### MarketTicker (`src/components/MarketTicker.tsx`)
- CSS animation (`animate-ticker`) for infinite horizontal scrolling
- Pauses on hover
- Items duplicated for seamless loop effect

### MarketOverview (`src/components/MarketOverview.tsx`)
- 4 tabs: Major Indices, Commodities, Currencies, Crypto
- Data table with Name, Last, High, Low, Change, Change %
- Color-coded change values (green/red)

### LatestNews (`src/components/LatestNews.tsx`)
- Featured article with gradient image placeholder at top
- List of articles below with category badges, timestamps, source
- Thumbnail placeholders on right side

### MarketMovers (`src/components/MarketMovers.tsx`)
- 2 tabs: Top Gainers / Top Losers
- Compact table with Name, Last, Chg, Chg %

### Sidebar (`src/components/Sidebar.tsx`)
- InvestingPro promotional card (gradient background)
- Most Popular articles (numbered 1-5)
- Economic Calendar with impact indicators and flag emojis

### Footer (`src/components/Footer.tsx`)
- 4-column link grid (About, Products, Markets, More)
- Social media links + App Store / Google Play badges
- Risk disclaimer + copyright

## Code Conventions

- **TypeScript**: Strict mode enabled, all props and data typed
- **Components**: One component per file, PascalCase naming
- **Styling**: Tailwind utility classes exclusively (no CSS modules)
- **Imports**: Use `@/*` path alias for `src/` directory
- **Data**: Mock data separated from components in `src/data/`
- **Types**: Shared interfaces in `src/types/`
- **Formatting**: Double quotes for JSX attributes, semicolons

## Page Layout (top to bottom)

1. **Header** (sticky) - Navigation with dropdowns
2. **MarketTicker** - Scrolling horizontal price bar
3. **MarketOverview** - Full-width tabbed data table
4. **Two-column grid** (lg breakpoint):
   - Left (2/3): LatestNews + MarketMovers
   - Right (1/3): Sidebar
5. **Footer** - Links, social, legal

## Responsive Breakpoints

- **Mobile** (<640px): Single column, hamburger menu, stacked layout
- **Tablet** (640px-1024px): Partial grid, some elements hidden
- **Desktop** (1024px+): Full 3-column grid, dropdown nav, max-width 1260px

## Future Development

When extending this project:
1. **Real API integration**: Replace `mockData.ts` imports with API calls using `fetch` in Server Components or SWR/React Query in Client Components
2. **Additional pages**: Add routes under `src/app/` (e.g., `src/app/markets/page.tsx`)
3. **Charts**: Integrate a charting library (e.g., lightweight-charts, recharts)
4. **Authentication**: Add NextAuth.js for sign in/sign up functionality
5. **i18n**: Add internationalization for Korean and other languages

---

*Last updated: 2026-02-05*
