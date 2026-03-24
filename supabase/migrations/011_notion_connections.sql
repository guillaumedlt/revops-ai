-- Notion OAuth connections (one per tenant)
CREATE TABLE IF NOT EXISTS notion_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  workspace_id TEXT NOT NULL,
  workspace_name TEXT NOT NULL DEFAULT '',
  bot_id TEXT NOT NULL DEFAULT '',
  token_type TEXT NOT NULL DEFAULT 'bearer',
  duplicated_template_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE notion_connections ENABLE ROW LEVEL SECURITY;

-- Index
CREATE INDEX IF NOT EXISTS idx_notion_connections_tenant ON notion_connections(tenant_id);
