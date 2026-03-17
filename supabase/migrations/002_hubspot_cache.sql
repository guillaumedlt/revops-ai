-- 002_hubspot_cache.sql
-- HubSpot OAuth connections + cached CRM objects

-- HubSpot OAuth tokens
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
  hs_time_in_current_stage NUMERIC,
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

  -- Stage timestamps (JSONB — contains hs_date_entered_* and hs_date_exited_*)
  stage_timestamps JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Cumulative time in stages (JSONB — contains hs_v2_cumulative_time_in_*)
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
  hs_time_to_first_engagement NUMERIC,
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

-- Triggers
CREATE TRIGGER trg_hs_connections_updated BEFORE UPDATE ON hubspot_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hs_deals_updated BEFORE UPDATE ON hs_deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hs_contacts_updated BEFORE UPDATE ON hs_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hs_companies_updated BEFORE UPDATE ON hs_companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
