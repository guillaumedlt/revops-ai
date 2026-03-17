-- 005_conversations.sql
-- Chat conversations, messages, AI cache, credit usage, batch insights

-- Chat conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),

  title TEXT,

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
  model TEXT,
  tokens_input INTEGER,
  tokens_output INTEGER,
  cost_eur NUMERIC,
  credits_used NUMERIC DEFAULT 0,

  -- Tool calls
  tool_calls JSONB,

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

  cache_key TEXT NOT NULL,
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

-- Triggers
CREATE TRIGGER trg_conversations_updated BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
