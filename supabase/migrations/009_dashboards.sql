-- 009: Dashboards & Widgets
-- Custom dashboards with pinnable AI-generated widgets

CREATE TABLE IF NOT EXISTS dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  layout JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS dashboard_widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID NOT NULL REFERENCES dashboards(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  x INTEGER NOT NULL DEFAULT 0,
  y INTEGER NOT NULL DEFAULT 0,
  w INTEGER NOT NULL DEFAULT 4,
  h INTEGER NOT NULL DEFAULT 3,
  widget_type TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT 'Widget',
  config JSONB DEFAULT '{}',
  source_message_id UUID,
  source_conversation_id UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_dashboards_tenant ON dashboards(tenant_id);
CREATE INDEX idx_dashboards_author ON dashboards(author_id);
CREATE INDEX idx_dashboard_widgets_dashboard ON dashboard_widgets(dashboard_id);
CREATE INDEX idx_dashboard_widgets_tenant ON dashboard_widgets(tenant_id);

-- RLS
ALTER TABLE dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_widgets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant isolation on dashboards"
  ON dashboards FOR ALL
  USING (tenant_id = current_setting('app.tenant_id', true)::uuid);

CREATE POLICY "Tenant isolation on dashboard_widgets"
  ON dashboard_widgets FOR ALL
  USING (tenant_id = current_setting('app.tenant_id', true)::uuid);
