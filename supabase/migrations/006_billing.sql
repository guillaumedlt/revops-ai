-- 006_billing.sql
-- Subscription events + monthly credit allocations

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
