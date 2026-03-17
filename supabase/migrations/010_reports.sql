-- Reports system
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL DEFAULT 'Untitled Report',
  description TEXT,
  theme TEXT NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'gradient', 'minimal')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS report_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL,
  layout TEXT NOT NULL DEFAULT 'full' CHECK (layout IN ('title', 'full', 'two_column', 'kpi_row', 'chart_focus', 'table_focus')),
  title TEXT,
  content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  slide_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reports_tenant ON reports(tenant_id);
CREATE INDEX idx_report_slides_report ON report_slides(report_id);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY reports_tenant ON reports FOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);
CREATE POLICY report_slides_tenant ON report_slides FOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);
