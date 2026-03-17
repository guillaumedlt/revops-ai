# AGENTS.md — Specialized Agent Definitions

## Why Agents?

This project is complex (87 metrics, 9 dashboard pages, AI agent, billing, sync engine). Instead of giving Claude Code everything at once, we split the work into 6 specialized agents. Each agent has:

- **A clear domain** — what it owns
- **Input/Output contracts** — what it receives, what it produces
- **Quality checklist** — what "done" means
- **Test requirements** — how to verify the work

When working with Claude Code, tell it which agent role to assume:

> "You are the **Scoring Agent**. Your job is to implement the win rate metrics in `lib/scoring/metrics/closing.ts`. Read `docs/METRICS.md` section 4 (Closing & Win Rate) for the full spec."

---

## Agent 1: ARCHITECT

### Domain
System-level decisions: database schema, API design, authentication, multi-tenancy, performance.

### Owns
```
supabase/migrations/*.sql
src/lib/supabase/*
src/lib/utils/*
src/types/*
docs/DATABASE.md
docs/API-ROUTES.md
```

### Responsibilities
- Design and maintain the database schema
- Create Supabase migrations
- Define API route contracts (input/output types)
- Implement Row Level Security policies
- Set up authentication flow (Supabase Auth)
- Generate TypeScript types from database schema
- Performance optimization (indexes, query plans)
- Handle multi-tenant data isolation

### Quality Checklist
- [ ] Every table has `tenant_id` column
- [ ] Every table has RLS policy enabled
- [ ] Every RLS policy checks `tenant_id` against JWT
- [ ] All migrations are idempotent (can re-run safely)
- [ ] Indexes exist for every `WHERE tenant_id = X AND ...` query
- [ ] TypeScript types are auto-generated after schema changes
- [ ] No raw SQL in application code (use Supabase client)
- [ ] Soft delete pattern (never hard delete user data)

### Test Requirements
- Migration runs without error on empty database
- RLS: User A cannot read User B's data (write actual test)
- Connection pooling works with 50+ concurrent connections
- Query performance: any dashboard query < 200ms on 10K deals

### Key Decisions Made
1. Single DB, shared tables, tenant_id isolation (not schema-per-tenant)
2. Supabase Auth with custom JWT claims for tenant_id
3. JSONB for flexible fields (owner_scores, metrics_snapshot)
4. Separate cache tables (deals_cache) from computed tables (daily_scores)
5. Partitioning by tenant_id hash when deals_cache > 10M rows

---

## Agent 2: HUBSPOT

### Domain
HubSpot CRM integration: OAuth flow, data sync, API client, token management.

### Owns
```
src/lib/hubspot/*
src/app/api/auth/hubspot/route.ts
src/app/api/cron/sync-hubspot/route.ts
docs/HUBSPOT-SYNC.md
```

### Responsibilities
- Implement HubSpot OAuth 2.0 flow (authorize → callback → token storage)
- Build HubSpot API client with rate limiting and retry logic
- Implement incremental sync (hourly) and full sync (daily)
- Sync deals, contacts, companies, and pipeline stages
- Handle token refresh (tokens expire every 6 hours)
- Map HubSpot stage IDs to labels
- Extract all 34 native fields we use across the 87 metrics

### HubSpot Native Fields Used

**Deal fields (21):**
```
dealname, amount, dealstage, pipeline, hubspot_owner_id,
closedate, createdate, days_to_close, hs_is_closed_won,
hs_is_stalled, hs_deal_stage_probability, deal_currency_code,
hs_v2_time_in_current_stage, closed_lost_reason,
num_associated_contacts, hs_date_entered_{STAGE_ID},
hs_date_exited_{STAGE_ID}, hs_v2_cumulative_time_in_{STAGE_ID},
hs_lastmodifieddate, dealtype, hs_is_closed
```

**Contact fields (9):**
```
firstname, lastname, email, lifecyclestage, hs_lead_status,
hubspot_owner_id, hs_analytics_source, createdate,
notes_last_contacted, num_associated_deals,
hs_time_to_first_engagement, hs_is_unworked
```

**Company fields (7):**
```
name, domain, industry, numberofemployees, annualrevenue,
total_revenue, createdate
```

### Sync Logic
```
INCREMENTAL (every hour):
1. Get last_sync_at from tenants table
2. Query HubSpot: deals modified since last_sync_at
3. Upsert into deals_cache (ON CONFLICT hubspot_deal_id)
4. Same for contacts and companies
5. Update last_sync_at
6. Handle pagination (HubSpot returns max 100 per page)

FULL SYNC (daily at 2 AM):
1. Fetch ALL deals, contacts, companies
2. Upsert everything
3. Detect deletions (records in cache but not in HubSpot)
4. Mark deleted records as is_deleted = true (soft delete)

TOKEN REFRESH:
1. Check token_expires_at before every API call
2. If expires in < 30 minutes, refresh
3. Store new tokens in tenants table (encrypted)
4. If refresh fails, mark tenant as needs_reauth
```

### Rate Limiting
```
HubSpot API limits:
- 100 requests per 10 seconds (per app)
- 250,000 requests per day
- Use search endpoint (POST /crm/v3/objects/deals/search) for bulk
- Batch read endpoint for specific IDs (max 100 per call)

Implementation:
- Queue-based with 100ms delay between requests
- Exponential backoff on 429 (Too Many Requests)
- Circuit breaker after 5 consecutive failures
```

### Quality Checklist
- [ ] OAuth flow works end-to-end (authorize → callback → token stored)
- [ ] Token refresh works automatically before expiry
- [ ] Incremental sync only fetches modified records
- [ ] Full sync handles 10,000+ deals without timeout
- [ ] Rate limiting prevents 429 errors
- [ ] Deleted HubSpot records are soft-deleted in cache
- [ ] Pipeline stages are correctly mapped (ID → label)
- [ ] All 34 native fields are synced
- [ ] Time fields (milliseconds) are correctly converted to days/hours
- [ ] Edge case: empty HubSpot (new account, 0 deals) handled gracefully

### Test Requirements
- OAuth flow with Ceres HubSpot portal (ID: 2703445)
- Sync 1,073 deals + 4,980 contacts + 10,333 companies
- Verify all fields populated correctly
- Test token expiry simulation
- Test rate limit handling with burst of requests

---

## Agent 3: SCORING

### Domain
All metric calculations, adoption scoring, alerts, quick wins, domain health.

### Owns
```
src/lib/scoring/*
src/app/api/metrics/*
src/app/api/cron/compute-scores/route.ts
docs/METRICS.md
```

### Responsibilities
- Implement all 87 metric calculation functions
- Compute the Adoption Score (5 sub-scores)
- Compute Domain Health for all 8 dashboard domains
- Generate Quick Wins (top 5 actions sorted by impact/effort)
- Trigger and resolve alerts based on metric thresholds
- Store computed scores in daily_scores table
- Handle edge cases (empty data, missing fields, division by zero)

### Metric Categories
```
1. Lead Management:    10 metrics (L1-L10)
2. Pipeline:           12 metrics (P1-P12)
3. Velocity:           10 metrics (V1-V10)
4. Closing & Win Rate: 12 metrics (C1-C12)
5. Revenue & Comptes:  11 metrics (R1-R11)
6. Activity:            6 metrics (A1-A6)
7. Data Quality:       10 metrics (D1-D10)
   + Adoption Score:   10 metrics (H1-H10)
   TOTAL:              81 + 10 = 91 metric functions
```

### Adoption Score Formula
```typescript
adoptionScore = (
  dataDiscipline     * 0.30 +
  pipelineRigor      * 0.25 +
  activityLogging    * 0.20 +
  processAdherence   * 0.15 +
  toolUsage          * 0.10
)

// Each sub-score is 0-100 based on weighted components
// See docs/METRICS.md section 0 (Home) for full breakdown
```

### Function Signature Pattern
Every metric function follows this pattern:
```typescript
interface MetricResult {
  value: number;                    // Primary metric value
  displayValue: string;             // Formatted for display ("12.4%", "€132K")
  trend: number | null;             // Delta vs previous period (-0.8, +2.1)
  trendDirection: 'up' | 'down' | 'flat';
  status: 'good' | 'warning' | 'critical';
  metadata: Record<string, any>;    // Additional data for drill-down
  alerts: Alert[];                  // Triggered alerts
  sampleSize: number;               // n= for statistical relevance
}

// Example:
function computeWinRate(
  deals: DealCache[],
  period: DateRange,
  filters?: MetricFilters
): MetricResult
```

### Statistical Utilities Needed
```typescript
// src/lib/utils/statistics.ts
median(values: number[]): number
percentile(values: number[], p: number): number
weightedAverage(values: number[], weights: number[]): number
correlation(x: number[], y: number[]): number  // Pearson r
giniCoefficient(values: number[]): number
herfindahlIndex(shares: number[]): number
standardDeviation(values: number[]): number
movingAverage(values: number[], window: number): number[]
linearRegression(x: number[], y: number[]): { slope: number; intercept: number; r2: number }
```

### Quality Checklist
- [ ] Every metric function returns MetricResult type
- [ ] Every metric handles empty data gracefully (return null/0 with "No data" message)
- [ ] Every metric handles missing fields (null amount, null closedate)
- [ ] Division by zero is never possible (guard clauses)
- [ ] Time conversions are correct (ms → days, ms → hours)
- [ ] Sample size warnings when n < threshold (varies by metric)
- [ ] Alerts fire at correct thresholds
- [ ] Adoption Score sub-scores add up to total (within rounding)
- [ ] Quick Wins are sorted by impact/effort ratio
- [ ] All monetary values in EUR

### Test Requirements
- Each metric: test with real Ceres data (known expected values)
- Each metric: test with empty dataset (0 deals)
- Each metric: test with dirty data (null amounts, past close dates)
- Adoption Score: verify sub-scores weight correctly to total
- Alert thresholds: verify triggers and auto-resolution
- Performance: full score computation for 1 tenant < 5 seconds

---

## Agent 4: UI

### Domain
All React components, dashboard pages, charts, layout, responsive design, dark mode.

### Owns
```
src/app/dashboard/*
src/components/*
src/app/(marketing)/*
src/app/globals.css
tailwind.config.ts
docs/DESIGN-SYSTEM.md
```

### Responsibilities
- Build all 9 dashboard pages + settings + marketing pages
- Create reusable chart components (13 chart types)
- Implement the design system (colors, typography, spacing, dark mode)
- Build the sidebar navigation with active states
- Build the chat panel (slide-in from right)
- Implement responsive design (desktop-first, tablet support)
- Implement filter bars (global + per-page)
- Build drill-down modals (click metric → detail view)
- Implement loading states, error states, empty states
- Implement page transitions with Framer Motion

### Design Principles
1. **Data density without clutter** — show a lot of data but with clear hierarchy
2. **Progressive disclosure** — overview → click → detail → drill-down
3. **Consistent patterns** — every metric card looks similar, every chart has same style
4. **Motion with purpose** — animate only when it aids understanding
5. **Dark mode first** — design for dark mode, ensure light mode works too
6. **Monospace for numbers** — use JetBrains Mono for all metric values

### Component Design Pattern
```tsx
// Every dashboard component follows this pattern:

interface MetricCardProps {
  title: string;
  metric: MetricResult;
  chart: React.ReactNode;
  onDrillDown?: () => void;
  className?: string;
}

// Server Component (data fetching):
async function PipelinePage() {
  const metrics = await fetchPipelineMetrics(tenantId, period);
  return <PipelineView metrics={metrics} />;
}

// Client Component (interactivity):
"use client";
function PipelineView({ metrics }: { metrics: PipelineMetrics }) {
  const [selectedMetric, setSelectedMetric] = useState(null);
  // ... render charts with interactivity
}
```

### Page Layout Pattern
Every dashboard page follows this structure:
```
[FilterBar: Period | Owner | Additional filters]
[Row 1: 2-3 KPI Cards (headline metrics)]
[Row 2: 1-2 Main Charts (full-width or half)]
[Row 3: 2-3 Secondary Charts]
[Row 4: Table or Detail View]
```

### Chart Color Palette
```
Series 1: #6366F1 (indigo-500)
Series 2: #8B5CF6 (violet-500)
Series 3: #EC4899 (pink-500)
Series 4: #F59E0B (amber-500)
Series 5: #10B981 (emerald-500)
Series 6: #06B6D4 (cyan-500)

Status colors:
Good:     #10B981 (emerald)
Warning:  #F59E0B (amber)
Critical: #EF4444 (red)
Neutral:  #6B7280 (gray)
```

### Quality Checklist
- [ ] Every page has loading skeleton (not spinner)
- [ ] Every page has empty state ("Connect HubSpot to see data")
- [ ] Every page has error state with retry button
- [ ] Every chart has hover tooltips with exact values
- [ ] Dark mode works on every component
- [ ] Responsive: no horizontal scroll on 1024px width
- [ ] Filter changes update URL params (shareable links)
- [ ] Drill-down modals show individual deal/contact records
- [ ] Page transitions are smooth (Framer Motion)
- [ ] Number formatting is consistent (€, %, days, K/M suffixes)
- [ ] Monospace font for all numeric values

### Test Requirements
- Visual regression tests for each page (Playwright screenshots)
- Accessibility: minimum AA contrast ratios
- Performance: Largest Contentful Paint < 2s
- Test empty states for new tenants
- Test with 0, 10, 100, 1000, 10000 deals

---

## Agent 5: AI

### Domain
Claude API integration, conversational agent, tool definitions, prompt engineering, cost optimization.

### Owns
```
src/lib/ai/*
src/app/api/chat/route.ts
src/app/api/cron/weekly-review/route.ts (AI generation part)
docs/AI-PROMPTS.md
```

### Responsibilities
- Design and maintain the system prompt for the RevOps AI agent
- Define all AI tools (function calling) with Zod schemas
- Implement the chat API route with Vercel AI SDK streaming
- Implement model routing (Haiku for simple, Sonnet for complex)
- Implement response caching per tenant
- Implement credit tracking and limits
- Generate daily batch insights
- Generate weekly reviews
- Handle conversation history (store and retrieve)

### AI Tools (Function Calling)
The agent has access to these tools to query tenant data:

```typescript
// 11 tools total
tools: {
  getAdoptionScore,        // Current score + breakdown
  getPipelineMetrics,      // Pipeline value, coverage, deals by stage
  getDeals,                // Filter: stalled, unworked, no_amount, overdue, top_value
  getWinRateAnalysis,      // By: owner, amount_range, source, stage, period
  getVelocityMetrics,      // DTC, stage durations, bottlenecks
  getRevenueMetrics,       // Revenue, ACV, CLV, concentration, NRR
  getActivityMetrics,      // Activity volume, speed to lead, engagement funnel
  getDataQualityMetrics,   // DQ score, fill rates, hygiene score
  getAlerts,               // Active alerts by severity
  getOwnerPerformance,     // Specific owner deep dive
  createPilotNote,         // Create a note in the cockpit
}
```

### Model Routing Logic
```typescript
// src/lib/ai/router.ts
function routeToModel(message: string): 'haiku' | 'sonnet' {
  // Haiku for simple lookups
  const simplePatterns = [
    /quel.*win rate/i,
    /combien.*deals/i,
    /pipeline.*value/i,
    /score.*adoption/i,
    /montant.*moyen/i,
  ];

  if (simplePatterns.some(p => p.test(message))) return 'haiku';

  // Sonnet for everything else (analysis, comparison, recommendations)
  return 'sonnet';
}
```

### Credit System
```typescript
// 1 message = 1 credit
// Batch insights = NOT counted (included in plan)
// Weekly reviews = NOT counted (included in plan)

interface CreditCheck {
  allowed: boolean;
  remaining: number;
  limit: number;
  resetDate: Date;
}

async function checkCredits(tenantId: string): Promise<CreditCheck> {
  // Query credit_usage table
  // Compare with plan limit
  // Return whether the message is allowed
}
```

### Quality Checklist
- [ ] System prompt produces accurate, data-backed responses
- [ ] All 11 tools work and return correct data
- [ ] Model routing reduces costs by 30%+ vs always-Sonnet
- [ ] Cache prevents duplicate API calls for same questions
- [ ] Credit system correctly limits Free/Pro/Business plans
- [ ] Streaming works (responses appear word by word)
- [ ] Conversation history is persisted per user per tenant
- [ ] Agent never halluccinates numbers (always uses tools)
- [ ] Error handling: graceful message when API fails
- [ ] Token usage is tracked per request for cost monitoring

### Test Requirements
- 20 predefined questions with expected tool calls and answer quality
- Credit system: verify limits are enforced
- Model routing: verify Haiku handles simple questions correctly
- Cost tracking: verify token counts match Anthropic billing
- Streaming: verify no partial JSON or broken responses

---

## Agent 6: DEVOPS

### Domain
Testing, CI/CD, deployment, monitoring, billing, security, performance.

### Owns
```
vercel.json
.github/workflows/* (if using GitHub Actions)
src/app/api/webhooks/*
src/lib/stripe/*
src/lib/email/*
docs/TESTING.md
sentry.client.config.ts
sentry.server.config.ts
```

### Responsibilities
- Set up Vitest for unit tests
- Set up Playwright for E2E tests
- Configure Vercel deployment (env vars, domains, cron)
- Implement Stripe billing (checkout, webhooks, portal)
- Implement email notifications (Resend)
- Set up Sentry error tracking
- Implement security headers (CSP, CORS)
- Monitor performance (Vercel Analytics)
- Handle GDPR considerations (data export, deletion)

### Stripe Integration
```
Plans:
- free:     price_xxx  €0/mo   10 credits
- pro:      price_xxx  €49/mo  200 credits
- business: price_xxx  €149/mo 1000 credits

Webhook events to handle:
- checkout.session.completed → activate subscription
- invoice.paid → renew credits
- invoice.payment_failed → warn user
- customer.subscription.deleted → downgrade to free
- customer.subscription.updated → update plan
```

### Testing Strategy
```
UNIT TESTS (Vitest):
- All scoring functions (87 metrics × 3 cases minimum)
- Statistical utility functions
- Date range helpers
- Formatting utilities
- Credit system logic

INTEGRATION TESTS (Vitest + Supabase local):
- API routes: auth, metrics, cron
- Database operations: CRUD, RLS
- HubSpot sync pipeline

E2E TESTS (Playwright):
- Signup → Connect HubSpot → See Dashboard
- Navigate all 9 pages
- Open chat → ask question → get response
- Filter changes update charts
- Settings: change plan
- Drill-down modals open correctly

LOAD TESTS:
- 50 concurrent users querying dashboard
- Score computation for 100 tenants simultaneously
- HubSpot sync for 10 tenants in parallel
```

### Security Checklist
- [ ] All API routes check authentication
- [ ] All API routes check tenant_id authorization
- [ ] HubSpot tokens stored encrypted (Supabase Vault)
- [ ] CRON routes protected by CRON_SECRET
- [ ] Stripe webhooks verified with signature
- [ ] CSP headers prevent XSS
- [ ] No sensitive data in client-side code
- [ ] Rate limiting on auth endpoints (10 req/min)
- [ ] GDPR: data export endpoint for tenant data
- [ ] GDPR: data deletion endpoint (full tenant purge)

### Quality Checklist
- [ ] All tests pass before deploy (CI/CD gate)
- [ ] Test coverage > 80% on scoring functions
- [ ] E2E tests run on every PR (Playwright)
- [ ] Sentry captures errors with context (tenant_id, user_id)
- [ ] Vercel preview deployments work for each PR
- [ ] Production deployment is zero-downtime
- [ ] Billing flow works end-to-end (test mode)
- [ ] Email templates render correctly

---

## Agent Interaction Pattern

The agents work sequentially, each building on the previous:

```
ARCHITECT → sets up DB schema, types, API contracts
    ↓
HUBSPOT → fills the DB with real data
    ↓
SCORING → computes metrics from the data
    ↓
UI → displays metrics in the dashboard
    ↓
AI → interprets metrics conversationally
    ↓
DEVOPS → tests, deploys, monitors, bills
```

When working on a feature, you may need to invoke multiple agents:

**Example: "Add the Pipeline Coverage metric"**
1. ARCHITECT: verify `deals_cache` has `amount` and `hs_deal_stage_probability` fields ✓
2. SCORING: implement `computePipelineCoverage()` in `metrics/pipeline.ts`
3. UI: add `PipelineCoverageCard` component and place it on the Pipeline page
4. AI: add pipeline coverage to the `getPipelineMetrics` tool response
5. DEVOPS: add test cases for the metric

Tell Claude Code which agent role to focus on. It can switch between roles as needed.
