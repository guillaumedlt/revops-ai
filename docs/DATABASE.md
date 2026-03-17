# DATABASE.md — RevOps AI Schema & Migrations

> Ce fichier contient le schéma complet de la base Supabase (PostgreSQL).
> Chaque migration est numérotée et doit être exécutée dans l'ordre.

---

## Principes

- **Multi-tenant** : `tenant_id UUID NOT NULL` sur chaque table
- **RLS** : Row Level Security activé partout, policies filtrent par `tenant_id`
- **Soft delete** : `deleted_at TIMESTAMPTZ` sur les tables mutables
- **Timestamps** : `created_at` + `updated_at` partout (trigger auto)
- **UUIDs** : Clés primaires en `uuid` (gen_random_uuid())
- **Indexes** : Toujours indexer `tenant_id` + les colonnes de filtre fréquentes
- **Conventions** : snake_case, tables au pluriel, pas de préfixes

---

## Migration 001 — Tenants & Users

```sql
-- 001_tenants_users.sql

-- Tenants (one per HubSpot portal)
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  hubspot_portal_id TEXT UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  onboarded_at TIMESTAMPTZ,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

-- Users (linked to Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  hubspot_owner_id TEXT,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Migration 002 — HubSpot Cache

```sql
-- 002_hubspot_cache.sql

-- HubSpot OAuth tokens (encrypted at rest via Supabase Vault)
CREATE TABLE hubspot_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
  portal_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  scopes TEXT[] NOT NULL DEFAULT '{}',
  last_sync_at TIMESTAMPTZ,
  last_full_sync_at TIMESTAMPTZ,
  sync_status TEXT NOT NULL DEFAULT 'idle' CHECK (sync_status IN ('idle', 'syncing', 'error')),
  sync_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cached HubSpot Deals
CREATE TABLE hs_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  hubspot_deal_id TEXT NOT NULL,

  -- Core fields
  dealname TEXT,
  dealstage TEXT,
  pipeline TEXT,
  amount NUMERIC,
  closedate TIMESTAMPTZ,
  createdate TIMESTAMPTZ,

  -- Owner
  hubspot_owner_id TEXT,

  -- Dates
  hs_lastmodifieddate TIMESTAMPTZ,
  notes_last_updated TIMESTAMPTZ,
  hs_last_sales_activity_date TIMESTAMPTZ,

  -- Lifecycle
  hs_date_entered_closedwon TIMESTAMPTZ,
  hs_date_entered_closedlost TIMESTAMPTZ,
  hs_is_closed_won BOOLEAN DEFAULT false,
  hs_is_closed BOOLEAN DEFAULT false,

  -- Velocity fields
  hs_time_in_current_stage NUMERIC,  -- milliseconds
  hs_is_stalled BOOLEAN DEFAULT false,
  days_to_close NUMERIC,

  -- Loss tracking
  closed_lost_reason TEXT,
  hs_closed_lost_category TEXT,

  -- Probability
  hs_deal_stage_probability NUMERIC,

  -- Source
  hs_analytics_source TEXT,
  hs_analytics_source_data_1 TEXT,

  -- Stage timestamps (JSONB pour flexibilité — contient hs_date_entered_* et hs_date_exited_*)
  stage_timestamps JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Cumulative time in stages (JSONB — contient hs_v2_cumulative_time_in_*)
  cumulative_stage_times JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Associations
  contact_ids TEXT[] NOT NULL DEFAULT '{}',
  company_ids TEXT[] NOT NULL DEFAULT '{}',

  -- Metadata
  raw_properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, hubspot_deal_id)
);

CREATE INDEX idx_deals_tenant ON hs_deals(tenant_id);
CREATE INDEX idx_deals_stage ON hs_deals(tenant_id, dealstage);
CREATE INDEX idx_deals_owner ON hs_deals(tenant_id, hubspot_owner_id);
CREATE INDEX idx_deals_closedate ON hs_deals(tenant_id, closedate);
CREATE INDEX idx_deals_createdate ON hs_deals(tenant_id, createdate);
CREATE INDEX idx_deals_pipeline ON hs_deals(tenant_id, pipeline);
CREATE INDEX idx_deals_closed ON hs_deals(tenant_id, hs_is_closed);
CREATE INDEX idx_deals_hubspot_id ON hs_deals(tenant_id, hubspot_deal_id);

-- Cached HubSpot Contacts
CREATE TABLE hs_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  hubspot_contact_id TEXT NOT NULL,

  email TEXT,
  firstname TEXT,
  lastname TEXT,
  phone TEXT,
  company TEXT,
  jobtitle TEXT,
  lifecyclestage TEXT,
  hs_lead_status TEXT,
  hubspot_owner_id TEXT,

  createdate TIMESTAMPTZ,
  hs_lastmodifieddate TIMESTAMPTZ,

  -- Engagement
  hs_time_to_first_engagement NUMERIC,  -- milliseconds
  notes_last_updated TIMESTAMPTZ,
  num_notes NUMERIC DEFAULT 0,
  num_contacted_notes NUMERIC DEFAULT 0,
  hs_sales_email_last_replied TIMESTAMPTZ,
  hs_is_unworked BOOLEAN DEFAULT false,

  -- Source
  hs_analytics_source TEXT,

  -- Associations
  deal_ids TEXT[] NOT NULL DEFAULT '{}',
  company_ids TEXT[] NOT NULL DEFAULT '{}',

  raw_properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, hubspot_contact_id)
);

CREATE INDEX idx_contacts_tenant ON hs_contacts(tenant_id);
CREATE INDEX idx_contacts_owner ON hs_contacts(tenant_id, hubspot_owner_id);
CREATE INDEX idx_contacts_lifecycle ON hs_contacts(tenant_id, lifecyclestage);
CREATE INDEX idx_contacts_hubspot_id ON hs_contacts(tenant_id, hubspot_contact_id);

-- Cached HubSpot Companies
CREATE TABLE hs_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  hubspot_company_id TEXT NOT NULL,

  name TEXT,
  domain TEXT,
  industry TEXT,
  city TEXT,
  country TEXT,
  numberofemployees NUMERIC,
  annualrevenue NUMERIC,
  hubspot_owner_id TEXT,

  -- Revenue tracking
  total_revenue NUMERIC,

  createdate TIMESTAMPTZ,
  hs_lastmodifieddate TIMESTAMPTZ,

  -- Associations
  deal_ids TEXT[] NOT NULL DEFAULT '{}',
  contact_ids TEXT[] NOT NULL DEFAULT '{}',

  raw_properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, hubspot_company_id)
);

CREATE INDEX idx_companies_tenant ON hs_companies(tenant_id);
CREATE INDEX idx_companies_domain ON hs_companies(tenant_id, domain);
CREATE INDEX idx_companies_hubspot_id ON hs_companies(tenant_id, hubspot_company_id);

-- Pipeline stages cache
CREATE TABLE hs_pipeline_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  pipeline_id TEXT NOT NULL,
  pipeline_label TEXT NOT NULL,
  stage_id TEXT NOT NULL,
  stage_label TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  probability NUMERIC,
  is_closed_won BOOLEAN DEFAULT false,
  is_closed_lost BOOLEAN DEFAULT false,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, pipeline_id, stage_id)
);

CREATE INDEX idx_stages_tenant ON hs_pipeline_stages(tenant_id);
CREATE INDEX idx_stages_pipeline ON hs_pipeline_stages(tenant_id, pipeline_id);

-- HubSpot owners cache
CREATE TABLE hs_owners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  hubspot_owner_id TEXT NOT NULL,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  is_active BOOLEAN DEFAULT true,
  synced_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, hubspot_owner_id)
);

CREATE INDEX idx_owners_tenant ON hs_owners(tenant_id);

-- Sync log
CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL CHECK (sync_type IN ('incremental', 'full')),
  object_type TEXT NOT NULL CHECK (object_type IN ('deals', 'contacts', 'companies', 'pipelines', 'owners')),
  status TEXT NOT NULL CHECK (status IN ('started', 'completed', 'failed')),
  records_synced INTEGER DEFAULT 0,
  records_created INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  records_deleted INTEGER DEFAULT 0,
  error_message TEXT,
  duration_ms INTEGER,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_sync_logs_tenant ON sync_logs(tenant_id);
CREATE INDEX idx_sync_logs_started ON sync_logs(tenant_id, started_at DESC);

CREATE TRIGGER trg_hs_connections_updated BEFORE UPDATE ON hubspot_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hs_deals_updated BEFORE UPDATE ON hs_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hs_contacts_updated BEFORE UPDATE ON hs_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hs_companies_updated BEFORE UPDATE ON hs_companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Migration 003 — Scores & Alerts

```sql
-- 003_scores_alerts.sql

-- Daily computed scores
CREATE TABLE daily_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  score_date DATE NOT NULL,

  -- Adoption Score (0-100)
  adoption_score NUMERIC NOT NULL,

  -- Sub-scores (0-100 each)
  data_discipline_score NUMERIC NOT NULL,
  pipeline_rigor_score NUMERIC NOT NULL,
  activity_logging_score NUMERIC NOT NULL,
  process_adherence_score NUMERIC NOT NULL,
  tool_usage_score NUMERIC NOT NULL,

  -- Domain Health (0-100 each)
  domain_lead_management NUMERIC,
  domain_pipeline NUMERIC,
  domain_velocity NUMERIC,
  domain_closing NUMERIC,
  domain_revenue NUMERIC,
  domain_activity NUMERIC,
  domain_data_quality NUMERIC,

  -- Per-owner scores (JSONB array)
  -- [{ ownerId, ownerName, adoptionScore, subScores: {...} }]
  owner_scores JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Detailed breakdown for drill-down
  -- { metrics: { L1: { value, status }, L2: {...}, ... } }
  metrics_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Quick wins computed
  -- [{ id, title, impact, effort, domain, metric_id }]
  quick_wins JSONB NOT NULL DEFAULT '[]'::jsonb,

  computed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  computation_duration_ms INTEGER,

  UNIQUE(tenant_id, score_date)
);

CREATE INDEX idx_daily_scores_tenant_date ON daily_scores(tenant_id, score_date DESC);

-- Weekly aggregated scores (for trend charts)
CREATE TABLE weekly_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,  -- Monday
  week_number INTEGER NOT NULL,
  year INTEGER NOT NULL,

  adoption_score NUMERIC NOT NULL,
  data_discipline_score NUMERIC,
  pipeline_rigor_score NUMERIC,
  activity_logging_score NUMERIC,
  process_adherence_score NUMERIC,
  tool_usage_score NUMERIC,

  domain_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  owner_scores JSONB NOT NULL DEFAULT '[]'::jsonb,

  UNIQUE(tenant_id, week_start)
);

CREATE INDEX idx_weekly_scores_tenant ON weekly_scores(tenant_id, week_start DESC);

-- Alerts
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  alert_type TEXT NOT NULL CHECK (alert_type IN (
    'score_drop', 'metric_critical', 'metric_warning',
    'stalled_deal', 'unworked_deal', 'data_quality',
    'pipeline_hygiene', 'win_rate_drop', 'velocity_spike',
    'revenue_risk', 'quick_win'
  )),
  severity TEXT NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),

  title TEXT NOT NULL,
  description TEXT NOT NULL,

  -- Context
  metric_id TEXT,            -- e.g. 'L1', 'P5', 'D3'
  domain TEXT,               -- e.g. 'pipeline', 'velocity'
  owner_id TEXT,             -- HubSpot owner ID (if owner-specific)
  deal_id TEXT,              -- HubSpot deal ID (if deal-specific)

  -- Values
  current_value NUMERIC,
  previous_value NUMERIC,
  threshold NUMERIC,

  -- Status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  acknowledged_by UUID REFERENCES users(id),
  acknowledged_at TIMESTAMPTZ,
  resolved_at TIMESTAMPTZ,

  -- AI suggestion
  ai_suggestion TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_alerts_tenant_status ON alerts(tenant_id, status);
CREATE INDEX idx_alerts_tenant_type ON alerts(tenant_id, alert_type);
CREATE INDEX idx_alerts_tenant_created ON alerts(tenant_id, created_at DESC);
CREATE INDEX idx_alerts_severity ON alerts(tenant_id, severity);

CREATE TRIGGER trg_alerts_updated BEFORE UPDATE ON alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Migration 004 — Pilot Notes & Actions

```sql
-- 004_pilot_notes.sql

-- Pilot notes (cockpit page)
CREATE TABLE pilot_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),

  content TEXT NOT NULL,
  note_type TEXT NOT NULL DEFAULT 'general' CHECK (note_type IN (
    'general', 'decision', 'observation', 'action', 'review'
  )),

  -- Optional context links
  metric_id TEXT,
  domain TEXT,
  deal_id TEXT,

  -- Tags
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_pilot_notes_tenant ON pilot_notes(tenant_id, created_at DESC);
CREATE INDEX idx_pilot_notes_type ON pilot_notes(tenant_id, note_type);

-- OKRs & Objectives
CREATE TABLE objectives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id),

  title TEXT NOT NULL,
  description TEXT,
  objective_type TEXT NOT NULL CHECK (objective_type IN ('objective', 'key_result')),
  parent_id UUID REFERENCES objectives(id),  -- Key Results link to parent Objective

  -- Target
  target_metric_id TEXT,
  target_value NUMERIC,
  current_value NUMERIC,
  unit TEXT,  -- '%', '€', 'days', 'count'

  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'on_track' CHECK (status IN ('on_track', 'at_risk', 'behind', 'completed', 'cancelled')),
  progress NUMERIC DEFAULT 0,  -- 0-100

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_objectives_tenant ON objectives(tenant_id);
CREATE INDEX idx_objectives_parent ON objectives(parent_id);
CREATE INDEX idx_objectives_period ON objectives(tenant_id, period_start, period_end);

-- Action items (Kanban)
CREATE TABLE actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  title TEXT NOT NULL,
  description TEXT,

  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done', 'cancelled')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

  -- Assignment
  assignee_id UUID REFERENCES users(id),
  assignee_owner_id TEXT,  -- HubSpot owner ID

  -- Source
  source TEXT CHECK (source IN ('manual', 'ai_suggestion', 'alert', 'quick_win', 'weekly_review')),
  source_id TEXT,  -- Alert ID, Quick Win ID, etc.

  -- Context
  metric_id TEXT,
  domain TEXT,
  deal_id TEXT,

  -- Dates
  due_date DATE,
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_actions_tenant_status ON actions(tenant_id, status);
CREATE INDEX idx_actions_assignee ON actions(tenant_id, assignee_id);
CREATE INDEX idx_actions_due ON actions(tenant_id, due_date);

-- Weekly reviews (auto-generated)
CREATE TABLE weekly_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  week_start DATE NOT NULL,
  week_end DATE NOT NULL,

  -- AI-generated content
  summary TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,    -- [{ title, description, type: 'positive'|'negative'|'neutral' }]
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{ title, description, priority, domain }]

  -- Score comparison
  score_start NUMERIC,
  score_end NUMERIC,
  score_delta NUMERIC,

  -- Key metrics deltas
  metrics_deltas JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Status
  is_sent BOOLEAN DEFAULT false,
  sent_at TIMESTAMPTZ,

  generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, week_start)
);

CREATE INDEX idx_weekly_reviews_tenant ON weekly_reviews(tenant_id, week_start DESC);

CREATE TRIGGER trg_pilot_notes_updated BEFORE UPDATE ON pilot_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_objectives_updated BEFORE UPDATE ON objectives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_actions_updated BEFORE UPDATE ON actions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Migration 005 — Conversations (AI Chat)

```sql
-- 005_conversations.sql

-- Chat conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),

  title TEXT,  -- Auto-generated from first message

  -- Metadata
  message_count INTEGER DEFAULT 0,
  total_credits_used NUMERIC DEFAULT 0,

  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_conversations_tenant ON conversations(tenant_id);
CREATE INDEX idx_conversations_user ON conversations(user_id, created_at DESC);

-- Chat messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,

  -- AI metadata
  model TEXT,  -- 'haiku' or 'sonnet'
  tokens_input INTEGER,
  tokens_output INTEGER,
  cost_eur NUMERIC,
  credits_used NUMERIC DEFAULT 0,

  -- Tool calls
  tool_calls JSONB,  -- [{ name, arguments, result }]

  -- Feedback
  feedback TEXT CHECK (feedback IN ('positive', 'negative')),
  feedback_comment TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at);
CREATE INDEX idx_messages_tenant ON messages(tenant_id, created_at DESC);

-- AI response cache
CREATE TABLE ai_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  cache_key TEXT NOT NULL,  -- Hash of normalized query
  query_text TEXT NOT NULL,
  response_text TEXT NOT NULL,

  model TEXT NOT NULL,
  cache_type TEXT NOT NULL CHECK (cache_type IN ('factual', 'analysis')),

  -- TTL
  expires_at TIMESTAMPTZ NOT NULL,
  hit_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, cache_key)
);

CREATE INDEX idx_ai_cache_lookup ON ai_cache(tenant_id, cache_key) WHERE expires_at > now();

-- Credit usage tracking
CREATE TABLE credit_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),

  credits_used NUMERIC NOT NULL DEFAULT 1,
  usage_type TEXT NOT NULL CHECK (usage_type IN ('chat', 'insight', 'export')),

  -- Reference
  message_id UUID REFERENCES messages(id),

  -- Period tracking
  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_credit_usage_tenant_period ON credit_usage(tenant_id, billing_period_start, billing_period_end);
CREATE INDEX idx_credit_usage_user ON credit_usage(tenant_id, user_id);

-- Batch insights (daily AI-generated)
CREATE TABLE batch_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  insight_date DATE NOT NULL,
  insight_type TEXT NOT NULL CHECK (insight_type IN (
    'daily_summary', 'anomaly', 'trend', 'recommendation', 'coaching'
  )),

  domain TEXT,
  metric_id TEXT,
  owner_id TEXT,

  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),

  -- Was it shown to user?
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, insight_date, insight_type, COALESCE(metric_id, ''), COALESCE(owner_id, ''))
);

CREATE INDEX idx_insights_tenant_date ON batch_insights(tenant_id, insight_date DESC);
CREATE INDEX idx_insights_unread ON batch_insights(tenant_id, is_read) WHERE is_read = false;

CREATE TRIGGER trg_conversations_updated BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Migration 006 — Billing

```sql
-- 006_billing.sql

-- Subscription events log
CREATE TABLE billing_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  event_type TEXT NOT NULL CHECK (event_type IN (
    'subscription_created', 'subscription_updated', 'subscription_cancelled',
    'payment_succeeded', 'payment_failed',
    'plan_upgraded', 'plan_downgraded',
    'credits_purchased', 'credits_reset'
  )),

  stripe_event_id TEXT UNIQUE,
  stripe_invoice_id TEXT,

  plan_from TEXT,
  plan_to TEXT,
  amount_eur NUMERIC,

  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_billing_events_tenant ON billing_events(tenant_id, created_at DESC);
CREATE INDEX idx_billing_events_stripe ON billing_events(stripe_event_id);

-- Monthly credit allocations
CREATE TABLE credit_allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  billing_period_start DATE NOT NULL,
  billing_period_end DATE NOT NULL,

  credits_allocated INTEGER NOT NULL,
  credits_used INTEGER NOT NULL DEFAULT 0,
  credits_remaining INTEGER GENERATED ALWAYS AS (credits_allocated - credits_used) STORED,

  -- Bonus credits (promotions, etc.)
  bonus_credits INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE(tenant_id, billing_period_start)
);

CREATE INDEX idx_credit_alloc_tenant ON credit_allocations(tenant_id, billing_period_start DESC);

CREATE TRIGGER trg_credit_alloc_updated BEFORE UPDATE ON credit_allocations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

---

## Migration 007 — Indexes & RLS Policies

```sql
-- 007_indexes_rls.sql

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================

-- Helper function to get current user's tenant_id
CREATE OR REPLACE FUNCTION auth.tenant_id()
RETURNS UUID AS $$
  SELECT (auth.jwt() ->> 'tenant_id')::uuid;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hubspot_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE hs_deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE hs_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hs_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE hs_pipeline_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE hs_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilot_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE batch_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_allocations ENABLE ROW LEVEL SECURITY;

-- Tenant: users can only see their own tenant
CREATE POLICY tenant_select ON tenants FOR SELECT
  USING (id = auth.tenant_id());

-- Users: same tenant only
CREATE POLICY users_select ON users FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY users_update ON users FOR UPDATE
  USING (tenant_id = auth.tenant_id() AND id = auth.uid());

-- Generic tenant isolation policy macro (applied to all data tables)
-- For each table below: SELECT, INSERT, UPDATE, DELETE filtered by tenant_id

-- HubSpot data (read-only for app users, writes via service role)
CREATE POLICY hs_deals_select ON hs_deals FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY hs_contacts_select ON hs_contacts FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY hs_companies_select ON hs_companies FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY hs_stages_select ON hs_pipeline_stages FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY hs_owners_select ON hs_owners FOR SELECT
  USING (tenant_id = auth.tenant_id());

-- Scores (read-only for app users)
CREATE POLICY scores_daily_select ON daily_scores FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY scores_weekly_select ON weekly_scores FOR SELECT
  USING (tenant_id = auth.tenant_id());

-- Alerts
CREATE POLICY alerts_select ON alerts FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY alerts_update ON alerts FOR UPDATE
  USING (tenant_id = auth.tenant_id());

-- Pilot notes (CRUD per tenant)
CREATE POLICY notes_select ON pilot_notes FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY notes_insert ON pilot_notes FOR INSERT
  WITH CHECK (tenant_id = auth.tenant_id());
CREATE POLICY notes_update ON pilot_notes FOR UPDATE
  USING (tenant_id = auth.tenant_id());
CREATE POLICY notes_delete ON pilot_notes FOR DELETE
  USING (tenant_id = auth.tenant_id());

-- Objectives (CRUD per tenant)
CREATE POLICY obj_select ON objectives FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY obj_insert ON objectives FOR INSERT
  WITH CHECK (tenant_id = auth.tenant_id());
CREATE POLICY obj_update ON objectives FOR UPDATE
  USING (tenant_id = auth.tenant_id());

-- Actions (CRUD per tenant)
CREATE POLICY actions_select ON actions FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY actions_insert ON actions FOR INSERT
  WITH CHECK (tenant_id = auth.tenant_id());
CREATE POLICY actions_update ON actions FOR UPDATE
  USING (tenant_id = auth.tenant_id());

-- Conversations & messages
CREATE POLICY conv_select ON conversations FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY conv_insert ON conversations FOR INSERT
  WITH CHECK (tenant_id = auth.tenant_id());
CREATE POLICY msg_select ON messages FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY msg_insert ON messages FOR INSERT
  WITH CHECK (tenant_id = auth.tenant_id());

-- Reviews
CREATE POLICY reviews_select ON weekly_reviews FOR SELECT
  USING (tenant_id = auth.tenant_id());

-- Insights
CREATE POLICY insights_select ON batch_insights FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY insights_update ON batch_insights FOR UPDATE
  USING (tenant_id = auth.tenant_id());

-- Billing (read-only)
CREATE POLICY billing_select ON billing_events FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY credits_select ON credit_allocations FOR SELECT
  USING (tenant_id = auth.tenant_id());
CREATE POLICY usage_select ON credit_usage FOR SELECT
  USING (tenant_id = auth.tenant_id());

-- Sync logs (read-only, admin only)
CREATE POLICY sync_logs_select ON sync_logs FOR SELECT
  USING (
    tenant_id = auth.tenant_id()
    AND EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- HubSpot connections (admin only)
CREATE POLICY hs_conn_select ON hubspot_connections FOR SELECT
  USING (
    tenant_id = auth.tenant_id()
    AND EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- AI cache (read-only per tenant)
CREATE POLICY cache_select ON ai_cache FOR SELECT
  USING (tenant_id = auth.tenant_id());

-- ========================================
-- ADDITIONAL PERFORMANCE INDEXES
-- ========================================

-- Composite indexes for common dashboard queries
CREATE INDEX idx_deals_tenant_stage_owner ON hs_deals(tenant_id, dealstage, hubspot_owner_id)
  WHERE deleted_at IS NULL;

CREATE INDEX idx_deals_tenant_won ON hs_deals(tenant_id, closedate)
  WHERE hs_is_closed_won = true;

CREATE INDEX idx_deals_tenant_open ON hs_deals(tenant_id, createdate)
  WHERE hs_is_closed = false;

CREATE INDEX idx_deals_tenant_stalled ON hs_deals(tenant_id)
  WHERE hs_is_stalled = true AND hs_is_closed = false;

CREATE INDEX idx_alerts_active ON alerts(tenant_id, severity, created_at DESC)
  WHERE status = 'active';

CREATE INDEX idx_actions_open ON actions(tenant_id, priority, due_date)
  WHERE status IN ('todo', 'in_progress');

-- Full-text search on deals
CREATE INDEX idx_deals_search ON hs_deals
  USING gin(to_tsvector('simple', COALESCE(dealname, '')));

-- JSONB indexes for stage timestamps
CREATE INDEX idx_deals_stage_ts ON hs_deals
  USING gin(stage_timestamps);
```

---

## Table Summary

| Table | Purpose | Est. Rows (per tenant) |
|-------|---------|----------------------|
| tenants | Customer accounts | 1 |
| users | Team members | 1-50 |
| hubspot_connections | OAuth tokens | 1 |
| hs_deals | Cached deals | 100-10,000 |
| hs_contacts | Cached contacts | 500-50,000 |
| hs_companies | Cached companies | 200-20,000 |
| hs_pipeline_stages | Pipeline config | 5-30 |
| hs_owners | Sales reps | 1-50 |
| sync_logs | Sync audit trail | 100-1,000/month |
| daily_scores | Daily adoption scores | 365/year |
| weekly_scores | Weekly trends | 52/year |
| alerts | Active alerts | 10-100 |
| pilot_notes | Manager notes | 10-500 |
| objectives | OKRs | 5-20 |
| actions | Action items | 20-200 |
| weekly_reviews | Auto reviews | 52/year |
| conversations | Chat sessions | 10-100/month |
| messages | Chat messages | 100-1,000/month |
| ai_cache | Response cache | 50-500 |
| credit_usage | Credit tracking | 100-1,000/month |
| batch_insights | AI insights | 30-100/month |
| billing_events | Payment log | 1-10/month |
| credit_allocations | Monthly credits | 12/year |

---

## Scale Notes

### Phase 1 (0-100 tenants)
- Single Supabase instance (Free/Pro plan)
- All tables in `public` schema
- Standard indexes sufficient

### Phase 2 (100-1,000 tenants)
- Supabase Pro plan
- Add connection pooling (PgBouncer)
- Consider partitioning `hs_deals` by `tenant_id` if single tenants exceed 100K deals
- Add read replicas for dashboard queries

### Phase 3 (1,000+ tenants)
- Migrate analytics queries to materialized views or ClickHouse
- Shard by tenant_id ranges
- Separate OLTP (writes) from OLAP (reads) databases
- Archive old sync_logs and messages (>90 days)
