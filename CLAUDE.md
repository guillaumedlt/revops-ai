# CLAUDE.md — RevOps AI Command Center

## Project Overview

RevOps AI is a SaaS product that connects to HubSpot CRM via OAuth, analyzes sales operations data, and provides an AI-powered dashboard with 87 metrics, adoption scoring, and a conversational AI agent.

**Product vision:** The Adoption Score — measuring HOW WELL a team uses their CRM — is the unique differentiator. No one else does this. The dashboard shows metrics, the AI explains them, and the coaching system tells reps what to do next.

**Target users:** B2B sales teams (3-50 reps) using HubSpot CRM.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 14+ (App Router, TypeScript) | Full-stack, SSR, API routes, Vercel deploy |
| Styling | Tailwind CSS + shadcn/ui | Modern, customizable, no dependency lock-in |
| Charts | Recharts | Most flexible for custom dashboard charts |
| Animations | Framer Motion | Smooth transitions, premium feel |
| Database | Supabase (PostgreSQL) | Auth, RLS, Realtime, Edge Functions |
| AI | Claude API (Anthropic) via Vercel AI SDK | Best reasoning, tool use, streaming |
| Hosting | Vercel | Auto-deploy, edge, cron jobs |
| Payments | Stripe | Subscriptions, checkout, webhooks |
| Email | Resend | Transactional emails (alerts, weekly reviews) |
| Monitoring | Sentry + Vercel Analytics | Error tracking, performance |

---

## Project Structure

```
revops-ai/
├── CLAUDE.md                          ← You are here
├── docs/
│   ├── AGENTS.md                      ← Agent definitions and responsibilities
│   ├── DATABASE.md                    ← Full DB schema + migrations
│   ├── METRICS.md                     ← All 87 metrics specifications
│   ├── DESIGN-SYSTEM.md               ← Design tokens, components, patterns
│   ├── AI-PROMPTS.md                  ← System prompts for RevOps AI agent
│   ├── API-ROUTES.md                  ← All API endpoints
│   ├── HUBSPOT-SYNC.md                ← HubSpot sync engine logic
│   └── TESTING.md                     ← Test strategy and patterns
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── callback/hubspot/route.ts
│   │   ├── (marketing)/
│   │   │   ├── page.tsx               ← Landing page
│   │   │   └── pricing/page.tsx
│   │   ├── dashboard/
│   │   │   ├── layout.tsx             ← Sidebar + Header + Chat panel
│   │   │   ├── page.tsx               ← Home (Adoption Score)
│   │   │   ├── lead-management/page.tsx
│   │   │   ├── pipeline/page.tsx
│   │   │   ├── velocity/page.tsx
│   │   │   ├── closing/page.tsx
│   │   │   ├── revenue/page.tsx
│   │   │   ├── activity/page.tsx
│   │   │   ├── data-quality/page.tsx
│   │   │   ├── cockpit/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── auth/hubspot/route.ts
│   │   │   ├── chat/route.ts          ← AI agent endpoint
│   │   │   ├── cron/
│   │   │   │   ├── sync-hubspot/route.ts
│   │   │   │   ├── compute-scores/route.ts
│   │   │   │   └── weekly-review/route.ts
│   │   │   ├── metrics/
│   │   │   │   ├── adoption-score/route.ts
│   │   │   │   ├── pipeline/route.ts
│   │   │   │   ├── velocity/route.ts
│   │   │   │   ├── closing/route.ts
│   │   │   │   ├── revenue/route.ts
│   │   │   │   ├── activity/route.ts
│   │   │   │   ├── data-quality/route.ts
│   │   │   │   └── lead-management/route.ts
│   │   │   ├── webhooks/
│   │   │   │   └── stripe/route.ts
│   │   │   └── export/
│   │   │       └── pdf/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                        ← shadcn/ui components
│   │   ├── charts/
│   │   │   ├── KPICard.tsx
│   │   │   ├── GaugeChart.tsx
│   │   │   ├── TrendLine.tsx
│   │   │   ├── FunnelChart.tsx
│   │   │   ├── HorizontalBar.tsx
│   │   │   ├── HeatmapTable.tsx
│   │   │   ├── ScatterPlot.tsx
│   │   │   ├── DistributionHistogram.tsx
│   │   │   ├── StackedArea.tsx
│   │   │   ├── DonutChart.tsx
│   │   │   ├── ParetoCurve.tsx
│   │   │   ├── RadarChart.tsx
│   │   │   ├── TrafficLight.tsx
│   │   │   └── TimelineChart.tsx
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── FilterBar.tsx
│   │   │   ├── AlertBanner.tsx
│   │   │   ├── DomainHealthGrid.tsx
│   │   │   ├── QuickWinsPanel.tsx
│   │   │   ├── OwnerRadar.tsx
│   │   │   ├── AdoptionGauge.tsx
│   │   │   ├── PilotNoteEditor.tsx
│   │   │   ├── ActionKanban.tsx
│   │   │   ├── WeeklyReviewCard.tsx
│   │   │   └── ScorecardMonthly.tsx
│   │   └── marketing/
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── Pricing.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              ← Browser client
│   │   │   ├── server.ts             ← Server client
│   │   │   ├── admin.ts              ← Service role client
│   │   │   ├── middleware.ts          ← Auth middleware
│   │   │   └── types.ts              ← Generated DB types
│   │   ├── hubspot/
│   │   │   ├── client.ts             ← HubSpot API wrapper
│   │   │   ├── oauth.ts              ← OAuth flow helpers
│   │   │   ├── sync.ts               ← Sync engine (deals, contacts, companies)
│   │   │   ├── sync-stages.ts        ← Pipeline stages sync
│   │   │   └── types.ts              ← HubSpot object types
│   │   ├── scoring/
│   │   │   ├── adoption-score.ts     ← Main score calculator
│   │   │   ├── data-discipline.ts
│   │   │   ├── pipeline-rigor.ts
│   │   │   ├── activity-logging.ts
│   │   │   ├── process-adherence.ts
│   │   │   ├── tool-usage.ts
│   │   │   ├── domain-health.ts      ← 8 domain scores
│   │   │   ├── quick-wins.ts         ← Quick win calculator
│   │   │   └── metrics/
│   │   │       ├── lead-management.ts ← 10 metrics
│   │   │       ├── pipeline.ts        ← 12 metrics
│   │   │       ├── velocity.ts        ← 10 metrics
│   │   │       ├── closing.ts         ← 12 metrics
│   │   │       ├── revenue.ts         ← 11 metrics
│   │   │       ├── activity.ts        ← 6 metrics
│   │   │       └── data-quality.ts    ← 10 metrics
│   │   ├── ai/
│   │   │   ├── agent.ts              ← Agent configuration + tools
│   │   │   ├── tools/                ← Individual tool definitions
│   │   │   │   ├── get-pipeline.ts
│   │   │   │   ├── get-deals.ts
│   │   │   │   ├── get-win-rate.ts
│   │   │   │   ├── get-velocity.ts
│   │   │   │   ├── get-adoption.ts
│   │   │   │   ├── get-alerts.ts
│   │   │   │   ├── get-revenue.ts
│   │   │   │   ├── get-activity.ts
│   │   │   │   ├── get-data-quality.ts
│   │   │   │   ├── create-note.ts
│   │   │   │   └── get-owner-perf.ts
│   │   │   ├── prompts/
│   │   │   │   ├── system.ts          ← Main system prompt
│   │   │   │   ├── insights.ts        ← Batch insights generation
│   │   │   │   └── weekly-review.ts   ← Weekly review template
│   │   │   └── router.ts             ← Model routing (Haiku vs Sonnet)
│   │   ├── stripe/
│   │   │   ├── client.ts
│   │   │   ├── webhooks.ts
│   │   │   └── plans.ts
│   │   ├── email/
│   │   │   ├── client.ts             ← Resend client
│   │   │   └── templates/
│   │   │       ├── alert.tsx
│   │   │       ├── weekly-review.tsx
│   │   │       └── onboarding.tsx
│   │   └── utils/
│   │       ├── constants.ts
│   │       ├── formatting.ts          ← Number, date, currency formatters
│   │       ├── statistics.ts          ← Median, percentile, correlation, Gini
│   │       └── date-ranges.ts         ← Period helpers
│   └── types/
│       ├── database.ts               ← Supabase generated types
│       ├── metrics.ts                ← Metric types and interfaces
│       ├── hubspot.ts                ← HubSpot API types
│       └── ai.ts                     ← AI tool types
├── supabase/
│   └── migrations/
│       ├── 001_tenants_users.sql
│       ├── 002_hubspot_cache.sql
│       ├── 003_scores_alerts.sql
│       ├── 004_pilot_notes.sql
│       ├── 005_conversations.sql
│       ├── 006_billing.sql
│       └── 007_indexes_rls.sql
├── public/
│   ├── logo.svg
│   └── og-image.png
├── .env.local.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## Architecture Decisions

### Multi-tenancy
- Single database, shared tables, `tenant_id` on every row
- Row Level Security (RLS) via Supabase — every policy checks `tenant_id`
- JWT contains `tenant_id` claim after login
- NEVER query without `tenant_id` filter — this is a hard rule

### Data Flow
```
HubSpot API → Sync Engine → Supabase (cache) → Score Engine → Dashboard
                                                    ↓
                                              AI Agent (Claude)
                                                    ↓
                                              Chat Responses
```

### Score Computation
- Batch computed once daily via Vercel Cron (6:00 AM UTC)
- Stored in `daily_scores` table with full breakdown
- Dashboard reads pre-computed scores (fast, no live calculation)
- AI agent can request fresh computation for real-time answers

### AI Cost Management
- Route simple questions to Haiku (4× cheaper)
- Route complex analysis to Sonnet
- Cache identical queries per tenant (1h TTL for factual, 4h for analysis)
- Batch insights generated daily (1 Sonnet call/tenant/day)
- Track credit usage per tenant in `credit_usage` table

### HubSpot Sync Strategy
- Incremental sync every hour (only modified records)
- Full sync once daily at 2:00 AM UTC
- Token refresh 30 min before expiry
- Rate limit: 100 requests/10 seconds — use batch endpoints
- Webhook listener for real-time updates (future phase)

---

## Coding Conventions

### TypeScript
- Strict mode enabled
- No `any` types — use `unknown` and type guards
- Zod for runtime validation (API inputs, HubSpot responses)
- Barrel exports from each directory (index.ts)

### React Components
- Function components only, no classes
- Props interface defined above component
- `use client` only when necessary (interactivity, hooks)
- Server components by default (data fetching)
- Composable: small, focused components

### API Routes
- Always validate input with Zod
- Always check auth + tenant_id
- Return consistent JSON: `{ data, error, metadata }`
- HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 500 Internal Error

### Database Queries
- Use Supabase client (not raw SQL in app code)
- Always filter by tenant_id FIRST
- Use generated types from `supabase gen types`
- Transactions for multi-table operations

### Testing
- Unit tests for scoring functions (Vitest)
- Integration tests for API routes
- E2E tests for critical flows (Playwright)
- Test with real HubSpot data (Ceres portal ID: 2703445)
- Every metric function must have ≥3 test cases:
  1. Normal data
  2. Empty data (new tenant, no deals)
  3. Edge case (missing fields, zero values)

### Git
- Conventional commits: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`
- Feature branches: `feat/pipeline-page`, `fix/score-calculation`
- PR per feature, squash merge to main

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# HubSpot OAuth
HUBSPOT_CLIENT_ID=
HUBSPOT_CLIENT_SECRET=
HUBSPOT_REDIRECT_URI=

# Anthropic (Claude AI)
ANTHROPIC_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
CRON_SECRET=                        # Vercel Cron auth
```

---

## Agents Reference

For detailed agent definitions, see `docs/AGENTS.md`. The 6 specialized agents are:

1. **Architect Agent** — DB schema, API design, system decisions
2. **HubSpot Agent** — Sync engine, OAuth, API integration
3. **Scoring Agent** — 87 metrics computation, adoption score
4. **UI Agent** — Dashboard pages, charts, components, design system
5. **AI Agent** — Claude integration, tools, prompts, chat
6. **DevOps Agent** — Testing, CI/CD, monitoring, billing

---

## Key Business Context

- Currency: EUR (all monetary values)
- Target market: European B2B SaaS companies
- HubSpot native fields only — no custom properties
- First customer: Ceres Agency (portal 2703445, 3 owners, ~1000 deals)
- Pricing: Free (10 AI credits) → Pro €49/mo (200 credits) → Business €149/mo (1000 credits)
- 1 AI credit = 1 chat message or 1 AI-generated insight
- Batch computations (scores, alerts) do NOT consume credits

---

## Doc References

When working on a specific area, read the corresponding doc:

| Task | Read this doc |
|------|--------------|
| Database changes | `docs/DATABASE.md` |
| Building a dashboard page | `docs/METRICS.md` + `docs/DESIGN-SYSTEM.md` |
| AI agent work | `docs/AI-PROMPTS.md` |
| HubSpot integration | `docs/HUBSPOT-SYNC.md` |
| API endpoint | `docs/API-ROUTES.md` |
| Testing | `docs/TESTING.md` |
| Understanding agents | `docs/AGENTS.md` |
