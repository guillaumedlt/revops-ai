-- 003_scores_alerts.sql
-- Daily/weekly computed scores + alerts

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
  week_start DATE NOT NULL,
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
  metric_id TEXT,
  domain TEXT,
  owner_id TEXT,
  deal_id TEXT,

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
