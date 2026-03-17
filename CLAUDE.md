# CLAUDE.md — RevOps AI

## Product Vision

RevOps AI is an **autonomous CRO/RevOps AI assistant** with a chat-first interface (like ChatGPT/Claude). It connects to business tools via **MCP connectors** (HubSpot, Notion, Slack, Lemlist), analyzes data in real-time, and generates rich responses with inline KPIs, charts, and tables.

**Core UX:** Conversational interface where the AI fetches live data from connected tools, computes analytics, and presents actionable insights — no manual dashboard browsing needed.

**Target users:** B2B sales teams (3-50 reps) using HubSpot CRM.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript strict) |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts (inline in chat + dashboards) |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL, Auth, RLS) |
| Auth | Supabase email/password |
| AI | Anthropic API (direct fetch, SSE streaming) |
| Multi-LLM | Claude (default), GPT, Gemini via BYOK |
| Hosting | Vercel (auto-deploy from GitHub) |
| Payments | Stripe (3 plans: Free/Pro/Business) |
| Email | Resend |

---

## Architecture

### Chat-First Interface
```
┌──────────────┬──────────────────────────────────────┐
│ Conversations│          Chat Area                    │
│   Sidebar    │                                       │
│  (dark bg)   │  [Messages with rich blocks]          │
│              │  [KPI cards inline]                    │
│  - Search    │  [Charts inline]                      │
│  - History   │  [Tables inline]                      │
│  - Grouped   │                                       │
│    by date   │  ┌──────────────────────────────────┐ │
│              │  │  Input bar + model picker    [→]  │ │
│  - Settings  │  │  / commands, connectors, upload   │ │
│  - Logout    │  └──────────────────────────────────┘ │
└──────────────┴──────────────────────────────────────┘
```

### MCP Connector Architecture
```
User message → Chat API → getToolsForTenant(tenantId)
                              ├── HubSpot connected? → hubspot_* tools (direct API)
                              ├── Notion connected?  → notion_* tools (TODO)
                              ├── Slack connected?   → slack_* tools (TODO)
                              └── Lemlist connected?  → lemlist_* tools (TODO)
                          → Anthropic API (with dynamic tools)
                          → Tool execution → External API in real-time
                          → Rich response (KPI grids, charts, tables)
```

Each connector is an MCP server that:
- Authenticates via OAuth (tokens stored in Supabase)
- Exposes tools the AI can call
- Returns structured data from the external API
- Auto-refreshes expired tokens

### 4 Connectors
| Connector | Status | Tools |
|-----------|--------|-------|
| **HubSpot** | Active | hubspot_search_deals, hubspot_get_pipeline, hubspot_get_contacts, hubspot_get_companies, hubspot_get_owners, hubspot_get_deal_details, hubspot_analytics |
| **Notion** | TODO | Search pages, read databases |
| **Slack** | TODO | Read channels, search messages |
| **Lemlist** | TODO | Campaign stats, sequences |

### Data Flow
- **Chat**: MCP connectors call external APIs in real-time (no cache)
- **Dashboards/Scores**: HubSpot sync cron → Supabase cache → computed scores
- **Reports**: AI generates PPT-style slide decks from connector data

---

## Project Structure

```
revops-ai/
├── CLAUDE.md
├── docs/                              ← Spec documents
│   ├── DATABASE.md
│   ├── DESIGN-SYSTEM.md
│   ├── METRICS.md
│   ├── AI-PROMPTS.md
│   ├── API-ROUTES.md
│   ├── HUBSPOT-SYNC.md
│   ├── AGENTS.md
│   └── TESTING.md
├── src/
│   ├── app/
│   │   ├── chat/                      ← PRIMARY INTERFACE
│   │   │   ├── layout.tsx             ← Sidebar + main area
│   │   │   ├── page.tsx               ← Welcome screen + suggestions
│   │   │   └── [conversationId]/page.tsx ← Message thread + input
│   │   ├── dashboards/                ← Drag-and-drop widget dashboards
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               ← Dashboard list
│   │   │   └── [id]/page.tsx          ← Single dashboard
│   │   ├── reports/                   ← PPT-style AI reports
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               ← Report list
│   │   │   ├── [id]/page.tsx          ← Report editor
│   │   │   └── [id]/present/page.tsx  ← Fullscreen presentation
│   │   ├── settings/                  ← App settings
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── dashboard/                 ← Legacy metric pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx               ← Adoption Score home
│   │   │   ├── pipeline/page.tsx
│   │   │   ├── velocity/page.tsx
│   │   │   ├── closing/page.tsx
│   │   │   ├── revenue/page.tsx
│   │   │   ├── activity/page.tsx
│   │   │   ├── data-quality/page.tsx
│   │   │   ├── lead-management/page.tsx
│   │   │   ├── cockpit/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (auth)/                    ← Login/signup
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── (marketing)/               ← Landing + pricing
│   │   │   ├── page.tsx
│   │   │   └── pricing/page.tsx
│   │   ├── api/
│   │   │   ├── chat/route.ts          ← Main AI chat endpoint (SSE streaming)
│   │   │   ├── chat/upload/route.ts   ← File upload for chat
│   │   │   ├── conversations/         ← CRUD conversations
│   │   │   ├── connectors/hubspot/status/route.ts
│   │   │   ├── auth/hubspot/          ← HubSpot OAuth flow
│   │   │   ├── auth/logout/route.ts
│   │   │   ├── dashboards/            ← CRUD dashboards + widgets
│   │   │   ├── reports/               ← CRUD reports + slides
│   │   │   ├── metrics/               ← 8 metric endpoints
│   │   │   ├── pilot/                 ← Notes, actions, objectives
│   │   │   ├── billing/               ← Stripe checkout + portal
│   │   │   ├── webhooks/stripe/route.ts
│   │   │   ├── cron/                  ← sync-hubspot, compute-scores, weekly-review
│   │   │   ├── export/pdf/route.ts
│   │   │   └── settings/llm/route.ts  ← BYOK LLM key management
│   │   └── layout.tsx
│   ├── components/
│   │   ├── chat/                      ← Chat UI components
│   │   │   ├── ChatInput.tsx          ← Simple text input
│   │   │   ├── ChatInputBar.tsx       ← Full input bar (model picker, connectors, slash commands)
│   │   │   ├── ConversationSidebar.tsx
│   │   │   ├── MessageThread.tsx      ← Message list with ThinkingIndicator
│   │   │   ├── AddToDashboard.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   ├── TemplatesPopover.tsx
│   │   │   └── blocks/               ← Rich content block renderers
│   │   │       ├── BlockRenderer.tsx
│   │   │       ├── TextBlock.tsx
│   │   │       ├── KPICardBlock.tsx
│   │   │       ├── ChartBlock.tsx
│   │   │       └── TableBlock.tsx
│   │   ├── charts/                    ← 14 chart components (Recharts)
│   │   ├── ui/                        ← Shared UI (KPICard, DataTable, FilterBar, etc.)
│   │   └── marketing/                 ← Landing page sections
│   ├── lib/
│   │   ├── connectors/                ← MCP CONNECTOR SYSTEM
│   │   │   ├── index.ts              ← getToolsForTenant() — aggregator
│   │   │   ├── registry.ts           ← 4 connectors (HubSpot, Notion, Slack, Lemlist)
│   │   │   └── hubspot/tools.ts      ← 7 HubSpot tools (direct API calls)
│   │   ├── ai/
│   │   │   ├── prompts/system.ts     ← System prompt (references MCP tools)
│   │   │   ├── prompts/insights.ts
│   │   │   ├── prompts/weekly-review.ts
│   │   │   ├── router.ts             ← Model routing (Haiku for simple, Sonnet for complex)
│   │   │   ├── parse-blocks.ts       ← Parse :::kpi_grid, :::chart, :::table blocks
│   │   │   ├── credits.ts            ← Credit system
│   │   │   ├── tools/index.ts        ← Legacy Supabase-cached tools (used by cron/scores)
│   │   │   └── providers/            ← Multi-LLM provider routing
│   │   ├── hubspot/                   ← HubSpot API client + sync engine
│   │   │   ├── client.ts             ← Rate-limited API wrapper
│   │   │   ├── oauth.ts              ← OAuth flow
│   │   │   ├── sync.ts               ← Incremental sync (deals, contacts, companies)
│   │   │   └── sync-stages.ts        ← Pipeline stages sync
│   │   ├── scoring/                   ← Adoption score + 7 domain scores
│   │   ├── supabase/                  ← Client, server, admin, middleware
│   │   ├── stripe/                    ← Client, webhooks, plans
│   │   └── email/                     ← Resend client + templates
│   └── types/
│       ├── chat-blocks.ts             ← ContentBlock types (text, kpi, chart, table, alert)
│       ├── database.ts
│       ├── metrics.ts
│       ├── hubspot.ts
│       ├── ai.ts
│       └── api.ts
├── supabase/migrations/               ← 10 migration files
├── __tests__/                         ← Unit tests (Vitest)
├── vercel.json
├── tailwind.config.ts
└── package.json
```

---

## Key Design Decisions

### MCP Connectors (not cached queries)
AI tools call external APIs **in real-time** via connector modules. Each connector handles auth (OAuth token stored in Supabase), token refresh, and API calls. The chat route dynamically loads tools based on which connectors the tenant has enabled.

### Multi-tenancy
- `tenant_id` on every row, RLS via Supabase
- Middleware injects `x-user-id`, `x-user-email`, `x-tenant-id` headers using service role client
- NEVER query without `tenant_id` filter

### AI Chat Flow
1. User sends message → `POST /api/chat`
2. `getToolsForTenant()` loads connector tools for the tenant
3. Anthropic API called with streaming + dynamic tools
4. If Claude calls a tool → execute via connector → return result → Claude continues
5. Final text parsed for rich blocks (:::kpi_grid, :::chart, :::table)
6. Blocks + metadata streamed to client via SSE

### Rich Response Blocks
```
:::kpi_grid
[{"label":"Pipeline","value":"245K EUR","change":12,"trend":"up"}]
:::

:::chart{"type":"bar","title":"By Stage"}
[{"name":"Discovery","value":45000}]
:::

:::table{"title":"Top Deals"}
{"headers":["Deal","Amount"],"rows":[["Acme","12000"]]}
:::
```

### Model Routing
- **Haiku** for simple questions (metric lookups, factual)
- **Sonnet** for complex analysis (why/how, comparisons, recommendations)
- Pattern-based routing in `src/lib/ai/router.ts`

### Slash Commands
`/report`, `/dashboard`, `/analyze`, `/compare`, `/forecast`, `/audit`

---

## Design System

- **Font**: Inter, 13px base
- **Colors**: Monochrome — `#0A0A0A` (primary), `#FAFAFA` (bg), `#E5E5E5` (borders), `#737373` (secondary text)
- **Sidebar**: `bg-[#0A0A0A]` dark, white text
- **Chat area**: `bg-[#FAFAFA]`
- **User messages**: `bg-[#0A0A0A] text-white` rounded
- **Assistant messages**: `bg-white border border-[#E5E5E5]` full-width
- **No shadows** except subtle on input bar
- **No emojis** (except status indicators)
- **Charts**: Grid `#F0F0F0`, tooltip `#0A0A0A`, colors from monochrome palette

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

# Anthropic
ANTHROPIC_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_APP_URL=https://revops-ai-six.vercel.app
CRON_SECRET=
```

---

## Coding Conventions

- TypeScript strict mode, Zod for validation
- Function components, `use client` only when needed
- API routes: always validate input, check auth + tenant_id
- Return `{ data, error, metadata }` from API routes
- Use Supabase client (not raw SQL)
- Always filter by `tenant_id` first
- Conventional commits: `feat:`, `fix:`, `refactor:`
- All UI text in **English**
- Deploy via GitHub push (Vercel auto-deploys from main)
- No local dev server — everything runs on Vercel + Supabase cloud

---

## Pricing

| Plan | Price | Credits/month |
|------|-------|---------------|
| Free | €0 | 10 |
| Pro | €49/mo | 200 |
| Business | €149/mo | 1000 |

1 credit = 1 chat message. Batch computations (scores, alerts, cron) do not consume credits.
