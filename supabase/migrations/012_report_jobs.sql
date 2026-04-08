-- Async report jobs — resumable, queueable report generation
-- Each job runs N agents sequentially, can be retried per-agent

CREATE TABLE IF NOT EXISTS report_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,

  -- Job metadata
  message TEXT NOT NULL,
  agent_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
  model TEXT NOT NULL DEFAULT 'claude-sonnet-4-6',

  -- Status: pending → running → completed | failed | partial
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'partial')),

  -- Progress per agent: { agent_id: { status: 'pending'|'running'|'done'|'failed', text: '...', error: '...', tool_calls: [...] } }
  progress JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Final consolidated text + parsed blocks (when completed)
  final_text TEXT,
  final_blocks JSONB,

  -- Tool cache shared across agents in this job
  tool_cache JSONB NOT NULL DEFAULT '{}'::jsonb,

  -- Error info if failed
  error_message TEXT,
  error_code TEXT,

  -- Worker lock (prevents 2 workers picking same job)
  locked_at TIMESTAMPTZ,
  locked_by TEXT,

  -- Retry tracking
  retry_count INTEGER NOT NULL DEFAULT 0,
  max_retries INTEGER NOT NULL DEFAULT 3,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_report_jobs_tenant ON report_jobs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_report_jobs_status ON report_jobs(status, created_at);
CREATE INDEX IF NOT EXISTS idx_report_jobs_user ON report_jobs(user_id, created_at DESC);

ALTER TABLE report_jobs ENABLE ROW LEVEL SECURITY;
