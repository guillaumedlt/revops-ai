-- 007_indexes_rls.sql
-- Row Level Security policies + additional performance indexes

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================

-- Helper function to get current user's tenant_id from JWT claims
CREATE OR REPLACE FUNCTION public.tenant_id()
RETURNS UUID AS $$
  SELECT COALESCE(
    (current_setting('request.jwt.claims', true)::json ->> 'tenant_id')::uuid,
    NULL
  );
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

-- ========================================
-- POLICIES
-- ========================================

-- Tenant: users can only see their own tenant
CREATE POLICY tenant_select ON tenants FOR SELECT
  USING (id = public.tenant_id());

-- Users: same tenant only
CREATE POLICY users_select ON users FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY users_update ON users FOR UPDATE
  USING (tenant_id = public.tenant_id() AND id = auth.uid());

-- HubSpot data (read-only for app users, writes via service role)
CREATE POLICY hs_deals_select ON hs_deals FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY hs_contacts_select ON hs_contacts FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY hs_companies_select ON hs_companies FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY hs_stages_select ON hs_pipeline_stages FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY hs_owners_select ON hs_owners FOR SELECT
  USING (tenant_id = public.tenant_id());

-- Scores (read-only for app users)
CREATE POLICY scores_daily_select ON daily_scores FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY scores_weekly_select ON weekly_scores FOR SELECT
  USING (tenant_id = public.tenant_id());

-- Alerts
CREATE POLICY alerts_select ON alerts FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY alerts_update ON alerts FOR UPDATE
  USING (tenant_id = public.tenant_id());

-- Pilot notes (CRUD per tenant)
CREATE POLICY notes_select ON pilot_notes FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY notes_insert ON pilot_notes FOR INSERT
  WITH CHECK (tenant_id = public.tenant_id());
CREATE POLICY notes_update ON pilot_notes FOR UPDATE
  USING (tenant_id = public.tenant_id());
CREATE POLICY notes_delete ON pilot_notes FOR DELETE
  USING (tenant_id = public.tenant_id());

-- Objectives (CRUD per tenant)
CREATE POLICY obj_select ON objectives FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY obj_insert ON objectives FOR INSERT
  WITH CHECK (tenant_id = public.tenant_id());
CREATE POLICY obj_update ON objectives FOR UPDATE
  USING (tenant_id = public.tenant_id());

-- Actions (CRUD per tenant)
CREATE POLICY actions_select ON actions FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY actions_insert ON actions FOR INSERT
  WITH CHECK (tenant_id = public.tenant_id());
CREATE POLICY actions_update ON actions FOR UPDATE
  USING (tenant_id = public.tenant_id());

-- Conversations & messages
CREATE POLICY conv_select ON conversations FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY conv_insert ON conversations FOR INSERT
  WITH CHECK (tenant_id = public.tenant_id());
CREATE POLICY msg_select ON messages FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY msg_insert ON messages FOR INSERT
  WITH CHECK (tenant_id = public.tenant_id());

-- Reviews
CREATE POLICY reviews_select ON weekly_reviews FOR SELECT
  USING (tenant_id = public.tenant_id());

-- Insights
CREATE POLICY insights_select ON batch_insights FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY insights_update ON batch_insights FOR UPDATE
  USING (tenant_id = public.tenant_id());

-- Billing (read-only)
CREATE POLICY billing_select ON billing_events FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY credits_select ON credit_allocations FOR SELECT
  USING (tenant_id = public.tenant_id());
CREATE POLICY usage_select ON credit_usage FOR SELECT
  USING (tenant_id = public.tenant_id());

-- Sync logs (read-only, admin only)
CREATE POLICY sync_logs_select ON sync_logs FOR SELECT
  USING (
    tenant_id = public.tenant_id()
    AND EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- HubSpot connections (admin only)
CREATE POLICY hs_conn_select ON hubspot_connections FOR SELECT
  USING (
    tenant_id = public.tenant_id()
    AND EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid()
      AND role IN ('owner', 'admin')
    )
  );

-- AI cache (read-only per tenant)
CREATE POLICY cache_select ON ai_cache FOR SELECT
  USING (tenant_id = public.tenant_id());

-- ========================================
-- ADDITIONAL PERFORMANCE INDEXES
-- ========================================

-- Composite indexes for common dashboard queries
CREATE INDEX idx_deals_tenant_stage_owner ON hs_deals(tenant_id, dealstage, hubspot_owner_id);

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
