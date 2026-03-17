-- 004_pilot_notes.sql
-- Pilot notes, OKRs, action items, weekly reviews

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
  parent_id UUID REFERENCES objectives(id),

  -- Target
  target_metric_id TEXT,
  target_value NUMERIC,
  current_value NUMERIC,
  unit TEXT,

  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'on_track' CHECK (status IN ('on_track', 'at_risk', 'behind', 'completed', 'cancelled')),
  progress NUMERIC DEFAULT 0,

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
  assignee_owner_id TEXT,

  -- Source
  source TEXT CHECK (source IN ('manual', 'ai_suggestion', 'alert', 'quick_win', 'weekly_review')),
  source_id TEXT,

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
  highlights JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommendations JSONB NOT NULL DEFAULT '[]'::jsonb,

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

-- Triggers
CREATE TRIGGER trg_pilot_notes_updated BEFORE UPDATE ON pilot_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_objectives_updated BEFORE UPDATE ON objectives
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_actions_updated BEFORE UPDATE ON actions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
