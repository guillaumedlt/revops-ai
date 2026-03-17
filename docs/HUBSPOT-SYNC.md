# HubSpot Sync Engine Reference

A comprehensive guide for building the HubSpot read-only integration for the RevOps AI SaaS platform. This document covers OAuth flows, API client design, data synchronization strategies, and error handling patterns.

**Stack:** Next.js 14+ | TypeScript | Supabase PostgreSQL | Multi-tenant (tenant_id)

---

## 1. OAuth Flow

### 1.1 Authorization URL Construction

Generate the authorization URL to redirect users to HubSpot's login:

```typescript
// lib/hubspot/oauth.ts
export function generateAuthorizationUrl(tenantId: string): string {
  const params = new URLSearchParams({
    client_id: process.env.HUBSPOT_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/hubspot/callback`,
    scope: [
      'crm.objects.deals.read',
      'crm.objects.contacts.read',
      'crm.objects.companies.read',
      'crm.schemas.deals.read',
    ].join(' '),
    state: encodeURIComponent(JSON.stringify({ tenantId, timestamp: Date.now() })),
  });

  return `https://app.hubapi.com/oauth/authorize?${params.toString()}`;
}
```

**Required Scopes:**
- `crm.objects.deals.read` — Read deal objects and properties
- `crm.objects.contacts.read` — Read contact objects and properties
- `crm.objects.companies.read` — Read company objects and properties
- `crm.schemas.deals.read` — Read deal schema (for discovering dynamic stage properties)

---

### 1.2 Callback Handler: Exchange Code for Tokens

Handle the OAuth callback and exchange the authorization code for access and refresh tokens:

```typescript
// app/api/hubspot/callback/route.ts
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  if (!code || !state) {
    return new Response('Missing code or state', { status: 400 });
  }

  let tenantId: string;
  try {
    const decoded = JSON.parse(decodeURIComponent(state));
    tenantId = decoded.tenantId;
  } catch {
    return new Response('Invalid state parameter', { status: 400 });
  }

  // Exchange code for tokens
  const tokenResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.HUBSPOT_CLIENT_ID!,
      client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/hubspot/callback`,
      code,
    }).toString(),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.json();
    console.error('Token exchange failed:', error);
    return new Response(`Token exchange failed: ${error.error_description}`, { status: 400 });
  }

  const tokens = await tokenResponse.json();

  // Store encrypted tokens in Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error: upsertError } = await supabase
    .from('hubspot_connections')
    .upsert(
      {
        tenant_id: tenantId,
        access_token: tokens.access_token, // Should be encrypted at application level
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000),
        status: 'active',
        last_sync_at: null,
        last_full_sync_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { onConflict: 'tenant_id' }
    );

  if (upsertError) {
    console.error('Failed to store connection:', upsertError);
    return new Response('Failed to store connection', { status: 500 });
  }

  // Redirect to dashboard
  return new Response(null, {
    status: 302,
    headers: { Location: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/hubspot/success` },
  });
}
```

---

### 1.3 Token Storage Schema

The `hubspot_connections` table stores OAuth credentials:

```sql
CREATE TABLE hubspot_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL UNIQUE REFERENCES tenants(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL, -- Should be encrypted with Supabase Vault or similar
  refresh_token TEXT NOT NULL, -- Should be encrypted
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'active', -- 'active', 'revoked', 'error'
  last_sync_at TIMESTAMPTZ,
  last_full_sync_at TIMESTAMPTZ,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_hubspot_connections_tenant ON hubspot_connections(tenant_id);
CREATE INDEX idx_hubspot_connections_expires ON hubspot_connections(expires_at);
```

---

### 1.4 Token Refresh Logic

Refresh the access token 30 minutes before expiry:

```typescript
// lib/hubspot/auth.ts
interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export async function getValidAccessToken(
  tenantId: string,
  supabase: ReturnType<typeof createClient>
): Promise<string> {
  const { data: connection, error } = await supabase
    .from('hubspot_connections')
    .select('access_token, refresh_token, expires_at')
    .eq('tenant_id', tenantId)
    .single();

  if (error) throw new Error(`Connection not found: ${error.message}`);

  // Check if token expires within 30 minutes
  const expiresAt = new Date(connection.expires_at).getTime();
  const now = Date.now();
  const thirtyMinutesMs = 30 * 60 * 1000;

  if (expiresAt - now > thirtyMinutesMs) {
    return connection.access_token;
  }

  // Token expired or expiring soon, refresh it
  return refreshAccessToken(tenantId, connection.refresh_token, supabase);
}

async function refreshAccessToken(
  tenantId: string,
  refreshToken: string,
  supabase: ReturnType<typeof createClient>
): Promise<string> {
  try {
    const response = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.HUBSPOT_CLIENT_ID!,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
        refresh_token: refreshToken,
      }).toString(),
    });

    if (!response.ok) {
      const error = await response.json();
      // Handle invalid_grant (refresh token revoked/expired)
      if (error.error === 'invalid_grant') {
        await supabase
          .from('hubspot_connections')
          .update({
            status: 'revoked',
            error_message: 'Refresh token invalid. User must re-authorize.',
          })
          .eq('tenant_id', tenantId);
        throw new Error('HUBSPOT_REVOKED: User must re-authorize.');
      }
      throw new Error(`Token refresh failed: ${error.error_description}`);
    }

    const tokens: TokenResponse = await response.json();

    // Update stored tokens
    await supabase
      .from('hubspot_connections')
      .update({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000),
        updated_at: new Date(),
      })
      .eq('tenant_id', tenantId);

    return tokens.access_token;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}
```

---

## 2. HubSpot API Client

### 2.1 Base Configuration

```typescript
// lib/hubspot/client.ts
const HUBSPOT_BASE_URL = 'https://api.hubapi.com';
const RATE_LIMIT = 100; // requests per 10 seconds
const RATE_LIMIT_WINDOW_MS = 10000;

interface RateLimiter {
  requestCount: number;
  windowStart: number;
}

const rateLimiters = new Map<string, RateLimiter>();

function getRateLimiter(portalId: string): RateLimiter {
  if (!rateLimiters.has(portalId)) {
    rateLimiters.set(portalId, { requestCount: 0, windowStart: Date.now() });
  }
  return rateLimiters.get(portalId)!;
}

async function checkRateLimit(portalId: string): Promise<void> {
  const limiter = getRateLimiter(portalId);
  const now = Date.now();

  // Reset window if 10 seconds have passed
  if (now - limiter.windowStart >= RATE_LIMIT_WINDOW_MS) {
    limiter.requestCount = 0;
    limiter.windowStart = now;
  }

  if (limiter.requestCount >= RATE_LIMIT) {
    const waitTime = RATE_LIMIT_WINDOW_MS - (now - limiter.windowStart);
    console.log(`Rate limit reached. Waiting ${waitTime}ms...`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    limiter.requestCount = 0;
    limiter.windowStart = Date.now();
  }

  limiter.requestCount++;
}
```

---

### 2.2 Retry Strategy with Exponential Backoff

```typescript
// lib/hubspot/client.ts
interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1000,
  maxDelayMs: 8000,
};

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  portalId: string,
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
    try {
      await checkRateLimit(portalId);

      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'User-Agent': 'RevOps-AI/1.0',
        },
      });

      // Handle rate limiting response (429)
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000;
        console.log(`Rate limited. Waiting ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < retryConfig.maxRetries) {
        const delayMs = Math.min(
          retryConfig.initialDelayMs * Math.pow(2, attempt),
          retryConfig.maxDelayMs
        );
        console.log(
          `Request failed (attempt ${attempt + 1}/${retryConfig.maxRetries}). Retrying in ${delayMs}ms...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new Error(`Request failed after ${retryConfig.maxRetries} retries: ${lastError?.message}`);
}
```

---

### 2.3 Batch Read Endpoint

Fetch up to 100 objects in a single batch request:

```typescript
// lib/hubspot/client.ts
export interface BatchReadRequest {
  inputs: Array<{ id: string }>;
  properties: string[];
}

export async function batchReadObjects(
  objectType: 'deals' | 'contacts' | 'companies',
  ids: string[],
  properties: string[],
  accessToken: string,
  portalId: string
): Promise<Record<string, any>[]> {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${objectType}/batch/read`;

  const chunks = [];
  for (let i = 0; i < ids.length; i += 100) {
    chunks.push(ids.slice(i, i + 100));
  }

  const results: Record<string, any>[] = [];

  for (const chunk of chunks) {
    const payload: BatchReadRequest = {
      inputs: chunk.map((id) => ({ id })),
      properties,
    };

    const response = await fetchWithRetry(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
      portalId
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Batch read failed (${response.status}): ${error.message || error.errorMessage}`
      );
    }

    const data = await response.json();
    results.push(...(data.results || []));
  }

  return results;
}
```

---

### 2.4 Search Endpoint with Pagination

```typescript
// lib/hubspot/client.ts
export interface SearchRequest {
  filterGroups: Array<{
    filters: Array<{
      propertyName: string;
      operator: string;
      value?: string | number;
    }>;
  }>;
  sorts?: Array<{ propertyName: string; direction: 'ASCENDING' | 'DESCENDING' }>;
  query?: string;
  limit: number;
  after?: string;
}

export interface SearchResponse {
  total: number;
  results: Array<{
    id: string;
    properties: Record<string, any>;
    createdAt: string;
    updatedAt: string;
    archived: boolean;
  }>;
  paging: {
    next?: { after: string };
  };
}

export async function searchObjects(
  objectType: 'deals' | 'contacts' | 'companies',
  filter: {
    propertyName: string;
    operator: string;
    value?: string | number;
  },
  properties: string[],
  accessToken: string,
  portalId: string,
  afterCursor?: string
): Promise<SearchResponse> {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${objectType}/search`;

  const payload: SearchRequest = {
    filterGroups: [{ filters: [filter] }],
    limit: 100,
    after: afterCursor,
  };

  const response = await fetchWithRetry(
    url,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    },
    portalId
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Search failed (${response.status}): ${error.message || error.errorMessage}`
    );
  }

  return response.json();
}

export async function* searchObjectsIterator(
  objectType: 'deals' | 'contacts' | 'companies',
  filter: {
    propertyName: string;
    operator: string;
    value?: string | number;
  },
  properties: string[],
  accessToken: string,
  portalId: string
): AsyncGenerator<SearchResponse['results']> {
  let afterCursor: string | undefined = undefined;

  while (true) {
    const response = await searchObjects(
      objectType,
      filter,
      properties,
      accessToken,
      portalId,
      afterCursor
    );

    yield response.results;

    if (!response.paging.next) break;
    afterCursor = response.paging.next.after;
  }
}
```

---

### 2.5 Pipeline & Stages Endpoint

```typescript
// lib/hubspot/client.ts
export interface PipelineStage {
  id: string;
  label: string;
  displayOrder: number;
  metadata: {
    probability?: number;
    isClosed?: string; // 'WON' | 'LOST' | null
  };
}

export interface Pipeline {
  id: string;
  label: string;
  displayOrder: number;
  stages: PipelineStage[];
}

export async function getPipelines(
  accessToken: string,
  portalId: string
): Promise<Pipeline[]> {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/pipelines/deals`;

  const response = await fetchWithRetry(
    url,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
    portalId
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch pipelines: ${error.message}`);
  }

  const data = await response.json();
  return data.results || [];
}
```

---

### 2.6 Owners Endpoint

```typescript
// lib/hubspot/client.ts
export interface Owner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userId: number;
}

export async function getOwners(accessToken: string, portalId: string): Promise<Owner[]> {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/owners`;

  const response = await fetchWithRetry(
    url,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
    portalId
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch owners: ${error.message}`);
  }

  const data = await response.json();
  return data.results || [];
}
```

---

### 2.7 Associations Endpoint

```typescript
// lib/hubspot/client.ts
export interface AssociationResponse {
  results: Array<{
    id: string;
    type: string;
    associatedObjectId: string;
  }>;
  paging?: { next?: { after: string } };
}

export async function getAssociations(
  fromObjectType: 'deals' | 'contacts' | 'companies',
  objectId: string,
  toObjectType: 'deals' | 'contacts' | 'companies',
  accessToken: string,
  portalId: string
): Promise<string[]> {
  const url = `${HUBSPOT_BASE_URL}/crm/v4/associations/${fromObjectType}/${objectId}/batch/read`;

  const response = await fetchWithRetry(
    url,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    },
    portalId
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch associations: ${error.message}`);
  }

  const data: AssociationResponse = await response.json();
  return data.results
    .filter((assoc) => assoc.type.startsWith(toObjectType))
    .map((assoc) => assoc.associatedObjectId);
}
```

---

## 3. Properties to Sync

### 3.1 Deal Properties (21 Static + Dynamic Stage Properties)

**Static Properties:**

```typescript
const DEAL_PROPERTIES = [
  'dealname',
  'dealstage',
  'pipeline',
  'amount',
  'closedate',
  'createdate',
  'hubspot_owner_id',
  'hs_lastmodifieddate',
  'notes_last_updated',
  'hs_last_sales_activity_date',
  'hs_date_entered_closedwon',
  'hs_date_entered_closedlost',
  'hs_is_closed_won',
  'hs_is_closed',
  'hs_time_in_current_stage',
  'hs_is_stalled',
  'days_to_close',
  'closed_lost_reason',
  'hs_closed_lost_category',
  'hs_deal_stage_probability',
  'hs_analytics_source',
  'hs_analytics_source_data_1',
];
```

**Dynamic Stage Properties** (discovered from pipeline stages):

```typescript
// For each stage in each pipeline, include:
// hs_date_entered_{STAGE_ID}
// hs_date_exited_{STAGE_ID}
// hs_v2_cumulative_time_in_{STAGE_ID}

export async function getDealPropertiesForPipelines(
  pipelines: Pipeline[]
): Promise<string[]> {
  const properties = new Set(DEAL_PROPERTIES);

  for (const pipeline of pipelines) {
    for (const stage of pipeline.stages) {
      properties.add(`hs_date_entered_${stage.id}`);
      properties.add(`hs_date_exited_${stage.id}`);
      properties.add(`hs_v2_cumulative_time_in_${stage.id}`);
    }
  }

  return Array.from(properties);
}
```

---

### 3.2 Contact Properties

```typescript
const CONTACT_PROPERTIES = [
  'email',
  'firstname',
  'lastname',
  'phone',
  'company',
  'jobtitle',
  'lifecyclestage',
  'hs_lead_status',
  'hubspot_owner_id',
  'createdate',
  'hs_lastmodifieddate',
  'hs_time_to_first_engagement',
  'notes_last_updated',
  'num_notes',
  'num_contacted_notes',
  'hs_sales_email_last_replied',
  'hs_is_unworked',
  'hs_analytics_source',
];
```

---

### 3.3 Company Properties

```typescript
const COMPANY_PROPERTIES = [
  'name',
  'domain',
  'industry',
  'city',
  'country',
  'numberofemployees',
  'annualrevenue',
  'hubspot_owner_id',
  'total_revenue',
  'createdate',
  'hs_lastmodifieddate',
];
```

---

## 4. Data Mapping: HubSpot API → Supabase

Complete field mapping with type conversions:

```typescript
// lib/hubspot/mapping.ts

export interface DealRecord {
  id: string;
  tenant_id: string;
  dealname: string | null;
  dealstage: string | null;
  pipeline: string | null;
  amount: number | null;
  closedate: string | null; // TIMESTAMPTZ
  createdate: string; // TIMESTAMPTZ
  hubspot_owner_id: string | null;
  hs_lastmodifieddate: string; // TIMESTAMPTZ
  notes_last_updated: string | null; // TIMESTAMPTZ
  hs_last_sales_activity_date: string | null; // TIMESTAMPTZ
  hs_date_entered_closedwon: string | null; // TIMESTAMPTZ
  hs_date_entered_closedlost: string | null; // TIMESTAMPTZ
  hs_is_closed_won: boolean;
  hs_is_closed: boolean;
  hs_time_in_current_stage: number | null; // milliseconds
  hs_is_stalled: boolean;
  days_to_close: number | null;
  closed_lost_reason: string | null;
  hs_closed_lost_category: string | null;
  hs_deal_stage_probability: number | null;
  hs_analytics_source: string | null;
  hs_analytics_source_data_1: string | null;
  dynamic_stage_properties: Record<string, string | number | null>; // JSONB
  contact_ids: string[]; // JSONB array
  company_ids: string[]; // JSONB array
  raw_data: Record<string, any>; // JSONB (full HubSpot response)
  synced_at: string; // TIMESTAMPTZ
  archived: boolean;
}

export function mapDealFromHubSpot(
  hsRecord: Record<string, any>,
  tenantId: string
): Omit<DealRecord, 'contact_ids' | 'company_ids'> {
  const props = hsRecord.properties || {};

  // Helper to convert HubSpot timestamp (milliseconds) to ISO string
  const toTimestamp = (value: string | number | null): string | null => {
    if (!value) return null;
    const ms = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(ms) ? null : new Date(ms).toISOString();
  };

  // Helper to convert HubSpot boolean strings
  const toBoolean = (value: string | boolean | null): boolean => {
    if (typeof value === 'boolean') return value;
    return value === 'true' || value === 'True';
  };

  // Helper to parse numbers
  const toNumber = (value: string | number | null): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? null : num;
  };

  // Extract dynamic stage properties
  const dynamicStageProperties: Record<string, any> = {};
  for (const [key, val] of Object.entries(props)) {
    if (
      key.startsWith('hs_date_entered_') ||
      key.startsWith('hs_date_exited_') ||
      key.startsWith('hs_v2_cumulative_time_in_')
    ) {
      dynamicStageProperties[key] = toTimestamp(val as string) || toNumber(val as string);
    }
  }

  return {
    id: hsRecord.id,
    tenant_id: tenantId,
    dealname: props.dealname || null,
    dealstage: props.dealstage || null,
    pipeline: props.pipeline || null,
    amount: toNumber(props.amount),
    closedate: toTimestamp(props.closedate as string),
    createdate: toTimestamp(props.createdate as string) || new Date().toISOString(),
    hubspot_owner_id: props.hubspot_owner_id || null,
    hs_lastmodifieddate:
      toTimestamp(props.hs_lastmodifieddate as string) || new Date().toISOString(),
    notes_last_updated: toTimestamp(props.notes_last_updated as string),
    hs_last_sales_activity_date: toTimestamp(props.hs_last_sales_activity_date as string),
    hs_date_entered_closedwon: toTimestamp(props.hs_date_entered_closedwon as string),
    hs_date_entered_closedlost: toTimestamp(props.hs_date_entered_closedlost as string),
    hs_is_closed_won: toBoolean(props.hs_is_closed_won),
    hs_is_closed: toBoolean(props.hs_is_closed),
    hs_time_in_current_stage: toNumber(props.hs_time_in_current_stage),
    hs_is_stalled: toBoolean(props.hs_is_stalled),
    days_to_close: toNumber(props.days_to_close),
    closed_lost_reason: props.closed_lost_reason || null,
    hs_closed_lost_category: props.hs_closed_lost_category || null,
    hs_deal_stage_probability: toNumber(props.hs_deal_stage_probability),
    hs_analytics_source: props.hs_analytics_source || null,
    hs_analytics_source_data_1: props.hs_analytics_source_data_1 || null,
    dynamic_stage_properties: dynamicStageProperties,
    raw_data: hsRecord,
    synced_at: new Date().toISOString(),
    archived: hsRecord.archived || false,
  };
}

export interface ContactRecord {
  id: string;
  tenant_id: string;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  phone: string | null;
  company: string | null;
  jobtitle: string | null;
  lifecyclestage: string | null;
  hs_lead_status: string | null;
  hubspot_owner_id: string | null;
  createdate: string; // TIMESTAMPTZ
  hs_lastmodifieddate: string; // TIMESTAMPTZ
  hs_time_to_first_engagement: string | null; // TIMESTAMPTZ
  notes_last_updated: string | null; // TIMESTAMPTZ
  num_notes: number | null;
  num_contacted_notes: number | null;
  hs_sales_email_last_replied: string | null; // TIMESTAMPTZ
  hs_is_unworked: boolean;
  hs_analytics_source: string | null;
  raw_data: Record<string, any>; // JSONB
  synced_at: string; // TIMESTAMPTZ
  archived: boolean;
}

export function mapContactFromHubSpot(
  hsRecord: Record<string, any>,
  tenantId: string
): ContactRecord {
  const props = hsRecord.properties || {};

  const toTimestamp = (value: string | number | null): string | null => {
    if (!value) return null;
    const ms = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(ms) ? null : new Date(ms).toISOString();
  };

  const toBoolean = (value: string | boolean | null): boolean => {
    if (typeof value === 'boolean') return value;
    return value === 'true' || value === 'True';
  };

  const toNumber = (value: string | number | null): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? null : num;
  };

  return {
    id: hsRecord.id,
    tenant_id: tenantId,
    email: props.email || null,
    firstname: props.firstname || null,
    lastname: props.lastname || null,
    phone: props.phone || null,
    company: props.company || null,
    jobtitle: props.jobtitle || null,
    lifecyclestage: props.lifecyclestage || null,
    hs_lead_status: props.hs_lead_status || null,
    hubspot_owner_id: props.hubspot_owner_id || null,
    createdate: toTimestamp(props.createdate as string) || new Date().toISOString(),
    hs_lastmodifieddate:
      toTimestamp(props.hs_lastmodifieddate as string) || new Date().toISOString(),
    hs_time_to_first_engagement: toTimestamp(props.hs_time_to_first_engagement as string),
    notes_last_updated: toTimestamp(props.notes_last_updated as string),
    num_notes: toNumber(props.num_notes),
    num_contacted_notes: toNumber(props.num_contacted_notes),
    hs_sales_email_last_replied: toTimestamp(props.hs_sales_email_last_replied as string),
    hs_is_unworked: toBoolean(props.hs_is_unworked),
    hs_analytics_source: props.hs_analytics_source || null,
    raw_data: hsRecord,
    synced_at: new Date().toISOString(),
    archived: hsRecord.archived || false,
  };
}

export interface CompanyRecord {
  id: string;
  tenant_id: string;
  name: string | null;
  domain: string | null;
  industry: string | null;
  city: string | null;
  country: string | null;
  numberofemployees: number | null;
  annualrevenue: number | null;
  hubspot_owner_id: string | null;
  total_revenue: number | null;
  createdate: string; // TIMESTAMPTZ
  hs_lastmodifieddate: string; // TIMESTAMPTZ
  raw_data: Record<string, any>; // JSONB
  synced_at: string; // TIMESTAMPTZ
  archived: boolean;
}

export function mapCompanyFromHubSpot(
  hsRecord: Record<string, any>,
  tenantId: string
): CompanyRecord {
  const props = hsRecord.properties || {};

  const toTimestamp = (value: string | number | null): string | null => {
    if (!value) return null;
    const ms = typeof value === 'string' ? parseInt(value, 10) : value;
    return isNaN(ms) ? null : new Date(ms).toISOString();
  };

  const toNumber = (value: string | number | null): number | null => {
    if (value === null || value === undefined || value === '') return null;
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? null : num;
  };

  return {
    id: hsRecord.id,
    tenant_id: tenantId,
    name: props.name || null,
    domain: props.domain || null,
    industry: props.industry || null,
    city: props.city || null,
    country: props.country || null,
    numberofemployees: toNumber(props.numberofemployees),
    annualrevenue: toNumber(props.annualrevenue),
    hubspot_owner_id: props.hubspot_owner_id || null,
    total_revenue: toNumber(props.total_revenue),
    createdate: toTimestamp(props.createdate as string) || new Date().toISOString(),
    hs_lastmodifieddate:
      toTimestamp(props.hs_lastmodifieddate as string) || new Date().toISOString(),
    raw_data: hsRecord,
    synced_at: new Date().toISOString(),
    archived: hsRecord.archived || false,
  };
}
```

---

## 5. Sync Strategy

### 5.1 Incremental Sync (Hourly via Vercel Cron)

Syncs only recently modified records to reduce API calls and improve performance.

```typescript
// lib/hubspot/sync.ts
export async function incrementalSync(
  tenantId: string,
  supabase: ReturnType<typeof createClient>,
  objectType: 'deals' | 'contacts' | 'companies'
): Promise<SyncResult> {
  const connection = await getValidConnection(tenantId, supabase);
  const lastSyncAt = connection.last_sync_at || new Date(0);

  const properties =
    objectType === 'deals'
      ? await getDealPropertiesForPipelines(await getPipelines(connection.access_token, tenantId))
      : objectType === 'contacts'
        ? CONTACT_PROPERTIES
        : COMPANY_PROPERTIES;

  const upserted: string[] = [];
  const errors: Array<{ id: string; error: string }> = [];

  try {
    for await (const batch of searchObjectsIterator(
      objectType,
      {
        propertyName: 'hs_lastmodifieddate',
        operator: 'GTE',
        value: lastSyncAt.getTime(),
      },
      properties,
      connection.access_token,
      tenantId
    )) {
      for (const record of batch) {
        try {
          const mapped =
            objectType === 'deals'
              ? mapDealFromHubSpot(record, tenantId)
              : objectType === 'contacts'
                ? mapContactFromHubSpot(record, tenantId)
                : mapCompanyFromHubSpot(record, tenantId);

          const { error } = await supabase
            .from(`hs_${objectType}`)
            .upsert(mapped, { onConflict: 'id,tenant_id' });

          if (error) throw error;
          upserted.push(record.id);
        } catch (error) {
          errors.push({
            id: record.id,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }

    // Update last_sync_at
    await supabase
      .from('hubspot_connections')
      .update({ last_sync_at: new Date() })
      .eq('tenant_id', tenantId);

    return { success: true, objectType, upserted, errors, syncType: 'incremental' };
  } catch (error) {
    throw new Error(`Incremental sync failed for ${objectType}: ${error}`);
  }
}
```

---

### 5.2 Full Sync (Daily at 2:00 AM UTC)

Syncs all records and detects soft deletions:

```typescript
// lib/hubspot/sync.ts
export async function fullSync(
  tenantId: string,
  supabase: ReturnType<typeof createClient>,
  objectType: 'deals' | 'contacts' | 'companies'
): Promise<SyncResult> {
  const connection = await getValidConnection(tenantId, supabase);

  const properties =
    objectType === 'deals'
      ? await getDealPropertiesForPipelines(await getPipelines(connection.access_token, tenantId))
      : objectType === 'contacts'
        ? CONTACT_PROPERTIES
        : COMPANY_PROPERTIES;

  const hsRecordIds = new Set<string>();
  const upserted: string[] = [];
  const errors: Array<{ id: string; error: string }> = [];

  try {
    // Fetch all records from HubSpot
    for await (const batch of searchObjectsIterator(
      objectType,
      {
        propertyName: 'hs_lastmodifieddate',
        operator: 'IS_KNOWN', // Fetch all with this property set
      },
      properties,
      connection.access_token,
      tenantId
    )) {
      for (const record of batch) {
        hsRecordIds.add(record.id);
        try {
          const mapped =
            objectType === 'deals'
              ? mapDealFromHubSpot(record, tenantId)
              : objectType === 'contacts'
                ? mapContactFromHubSpot(record, tenantId)
                : mapCompanyFromHubSpot(record, tenantId);

          const { error } = await supabase
            .from(`hs_${objectType}`)
            .upsert(mapped, { onConflict: 'id,tenant_id' });

          if (error) throw error;
          upserted.push(record.id);
        } catch (error) {
          errors.push({
            id: record.id,
            error: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }
    }

    // Detect soft-deleted records (exist in cache, but not in HubSpot)
    const { data: existingRecords } = await supabase
      .from(`hs_${objectType}`)
      .select('id')
      .eq('tenant_id', tenantId)
      .eq('archived', false);

    const softDeleted: string[] = [];
    for (const existing of existingRecords || []) {
      if (!hsRecordIds.has(existing.id)) {
        const { error } = await supabase
          .from(`hs_${objectType}`)
          .update({ archived: true })
          .eq('id', existing.id)
          .eq('tenant_id', tenantId);

        if (!error) {
          softDeleted.push(existing.id);
        }
      }
    }

    // Update last_full_sync_at
    await supabase
      .from('hubspot_connections')
      .update({ last_full_sync_at: new Date() })
      .eq('tenant_id', tenantId);

    return {
      success: true,
      objectType,
      upserted,
      softDeleted,
      errors,
      syncType: 'full',
    };
  } catch (error) {
    throw new Error(`Full sync failed for ${objectType}: ${error}`);
  }
}
```

---

### 5.3 Pipeline & Stages Sync

Must run before deal sync to discover dynamic properties:

```typescript
// lib/hubspot/sync.ts
export async function syncPipelineStages(
  tenantId: string,
  supabase: ReturnType<typeof createClient>
): Promise<void> {
  const connection = await getValidConnection(tenantId, supabase);
  const pipelines = await getPipelines(connection.access_token, tenantId);

  for (const pipeline of pipelines) {
    for (const stage of pipeline.stages) {
      const record = {
        id: `${pipeline.id}_${stage.id}`,
        tenant_id: tenantId,
        pipeline_id: pipeline.id,
        stage_id: stage.id,
        label: stage.label,
        display_order: stage.displayOrder,
        probability: stage.metadata?.probability || null,
        is_closed_won: stage.metadata?.isClosed === 'WON',
        is_closed_lost: stage.metadata?.isClosed === 'LOST',
        synced_at: new Date(),
      };

      const { error } = await supabase
        .from('hs_pipeline_stages')
        .upsert(record, { onConflict: 'id,tenant_id' });

      if (error) {
        console.error(`Failed to sync stage ${stage.id}:`, error);
      }
    }
  }
}
```

---

### 5.4 Owners Sync

```typescript
// lib/hubspot/sync.ts
export async function syncOwners(
  tenantId: string,
  supabase: ReturnType<typeof createClient>
): Promise<void> {
  const connection = await getValidConnection(tenantId, supabase);
  const owners = await getOwners(connection.access_token, tenantId);

  for (const owner of owners) {
    const record = {
      id: owner.id,
      tenant_id: tenantId,
      email: owner.email,
      firstname: owner.firstName,
      lastname: owner.lastName,
      user_id: owner.userId,
      synced_at: new Date(),
    };

    const { error } = await supabase
      .from('hs_owners')
      .upsert(record, { onConflict: 'id,tenant_id' });

    if (error) {
      console.error(`Failed to sync owner ${owner.id}:`, error);
    }
  }
}
```

---

### 5.5 Associations Sync

Fetch deal→contact and deal→company relationships:

```typescript
// lib/hubspot/sync.ts
export async function syncAssociations(
  tenantId: string,
  supabase: ReturnType<typeof createClient>
): Promise<void> {
  const connection = await getValidConnection(tenantId, supabase);

  // Fetch all deals
  const { data: deals } = await supabase
    .from('hs_deals')
    .select('id')
    .eq('tenant_id', tenantId)
    .eq('archived', false);

  for (const deal of deals || []) {
    try {
      // Fetch contacts associated with this deal
      const contactIds = await getAssociations(
        'deals',
        deal.id,
        'contacts',
        connection.access_token,
        tenantId
      );

      // Fetch companies associated with this deal
      const companyIds = await getAssociations(
        'deals',
        deal.id,
        'companies',
        connection.access_token,
        tenantId
      );

      // Update deal with association IDs
      await supabase
        .from('hs_deals')
        .update({
          contact_ids: contactIds,
          company_ids: companyIds,
        })
        .eq('id', deal.id)
        .eq('tenant_id', tenantId);
    } catch (error) {
      console.error(`Failed to sync associations for deal ${deal.id}:`, error);
    }
  }
}
```

---

## 6. Sync Engine Architecture

The main orchestrator that coordinates all sync operations:

```typescript
// lib/hubspot/syncEngine.ts
import { createClient } from '@supabase/supabase-js';

export interface SyncResult {
  success: boolean;
  objectType: string;
  upserted?: string[];
  softDeleted?: string[];
  errors: Array<{ id: string; error: string }>;
  syncType: 'incremental' | 'full';
  duration: number;
}

export async function syncTenant(
  tenantId: string,
  forceFullSync: boolean = false
): Promise<SyncResult[]> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const startTime = Date.now();
  const results: SyncResult[] = [];

  try {
    console.log(`[HubSpot] Starting sync for tenant ${tenantId}`);

    // Step 1: Verify connection exists and is active
    const { data: connection } = await supabase
      .from('hubspot_connections')
      .select('*')
      .eq('tenant_id', tenantId)
      .single();

    if (!connection) {
      throw new Error('No HubSpot connection configured for this tenant');
    }

    if (connection.status === 'revoked') {
      throw new Error('HubSpot connection has been revoked. User must re-authorize.');
    }

    // Step 2: Refresh token if needed
    const accessToken = await getValidAccessToken(tenantId, supabase);

    // Step 3: Sync pipelines & stages (always first)
    console.log('[HubSpot] Syncing pipelines and stages...');
    await syncPipelineStages(tenantId, supabase);

    // Step 4: Sync owners
    console.log('[HubSpot] Syncing owners...');
    await syncOwners(tenantId, supabase);

    // Step 5: Sync deals
    console.log('[HubSpot] Syncing deals...');
    const dealsResult = forceFullSync
      ? await fullSync(tenantId, supabase, 'deals')
      : await incrementalSync(tenantId, supabase, 'deals');
    results.push(dealsResult);

    // Step 6: Sync contacts
    console.log('[HubSpot] Syncing contacts...');
    const contactsResult = forceFullSync
      ? await fullSync(tenantId, supabase, 'contacts')
      : await incrementalSync(tenantId, supabase, 'contacts');
    results.push(contactsResult);

    // Step 7: Sync companies
    console.log('[HubSpot] Syncing companies...');
    const companiesResult = forceFullSync
      ? await fullSync(tenantId, supabase, 'companies')
      : await incrementalSync(tenantId, supabase, 'companies');
    results.push(companiesResult);

    // Step 8: Sync associations
    console.log('[HubSpot] Syncing associations...');
    await syncAssociations(tenantId, supabase);

    // Step 9: Log sync result
    const duration = Date.now() - startTime;
    const totalRecords = (results[0]?.upserted?.length || 0) +
      (results[1]?.upserted?.length || 0) +
      (results[2]?.upserted?.length || 0);
    const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);

    await supabase.from('sync_logs').insert({
      tenant_id: tenantId,
      sync_type: forceFullSync ? 'full' : 'incremental',
      status: totalErrors === 0 ? 'success' : 'partial_success',
      records_synced: totalRecords,
      errors_count: totalErrors,
      duration_ms: duration,
      error_details: totalErrors > 0 ? results.map((r) => r.errors) : null,
      started_at: new Date(startTime),
      completed_at: new Date(),
    });

    console.log(`[HubSpot] Sync completed for tenant ${tenantId} in ${duration}ms`);
    return results;
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Log sync failure
    await supabase.from('sync_logs').insert({
      tenant_id: tenantId,
      sync_type: forceFullSync ? 'full' : 'incremental',
      status: 'error',
      error_details: { fatal: errorMessage },
      duration_ms: duration,
      started_at: new Date(startTime),
      completed_at: new Date(),
    });

    console.error(`[HubSpot] Sync failed for tenant ${tenantId}:`, errorMessage);
    throw error;
  }
}
```

---

### 6.1 Cron Schedule

```typescript
// app/api/cron/hubspot-sync/route.ts
import { syncTenant } from '@/lib/hubspot/syncEngine';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  // Verify Vercel cron secret
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Get all active tenants
  const { data: tenants } = await supabase
    .from('hubspot_connections')
    .select('tenant_id')
    .eq('status', 'active');

  const results = [];

  for (const { tenant_id } of tenants || []) {
    try {
      // Determine if full sync should run (2:00 AM UTC)
      const now = new Date();
      const isFullSyncTime = now.getUTCHours() === 2 && now.getUTCMinutes() < 5;

      await syncTenant(tenant_id, isFullSyncTime);
      results.push({ tenant_id, success: true });
    } catch (error) {
      results.push({
        tenant_id,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Configure in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/hubspot-sync",
      "schedule": "0 * * * *"
    }
  ]
}
```

---

## 7. Error Handling

### 7.1 Token Expiration During Sync

```typescript
// lib/hubspot/errors.ts
export class HubSpotAuthError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'HubSpotAuthError';
  }
}

export class HubSpotRateLimitError extends Error {
  constructor(public retryAfterSeconds: number, message: string) {
    super(message);
    this.name = 'HubSpotRateLimitError';
  }
}

// In sync operations, wrap with retry logic:
export async function syncWithErrorHandling(
  operation: () => Promise<any>,
  tenantId: string,
  supabase: ReturnType<typeof createClient>,
  maxRetries: number = 3
): Promise<any> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (lastError.message.includes('invalid_grant')) {
        // Token revoked, mark connection as revoked
        await supabase
          .from('hubspot_connections')
          .update({
            status: 'revoked',
            error_message: 'Refresh token invalid. User must re-authorize.',
          })
          .eq('tenant_id', tenantId);
        throw new HubSpotAuthError('invalid_grant', lastError.message);
      }

      if (lastError.message.includes('Rate limit')) {
        const retryAfter = parseInt(
          lastError.message.match(/\d+/)?.[0] || '5'
        );
        if (attempt < maxRetries) {
          const waitTime = retryAfter * 1000;
          console.log(`Rate limited. Waiting ${waitTime}ms before retry...`);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        throw new HubSpotRateLimitError(retryAfter, lastError.message);
      }

      // For other errors, retry once more
      if (attempt < maxRetries) {
        const backoffMs = Math.pow(2, attempt) * 1000;
        console.log(`Attempt ${attempt + 1} failed. Retrying in ${backoffMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        continue;
      }
    }
  }

  throw lastError;
}
```

---

### 7.2 Sync Log Schema

Track all sync operations for monitoring and debugging:

```sql
CREATE TABLE sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  sync_type TEXT NOT NULL, -- 'incremental' | 'full'
  status TEXT NOT NULL, -- 'success' | 'partial_success' | 'error'
  records_synced INTEGER,
  errors_count INTEGER DEFAULT 0,
  error_details JSONB, -- Array of errors or fatal error message
  duration_ms INTEGER,
  started_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_sync_logs_tenant ON sync_logs(tenant_id);
CREATE INDEX idx_sync_logs_status ON sync_logs(status);
CREATE INDEX idx_sync_logs_completed ON sync_logs(completed_at DESC);
```

---

## 8. Database Schema

### 8.1 HubSpot Cache Tables

```sql
-- Deals
CREATE TABLE hs_deals (
  id TEXT NOT NULL,
  tenant_id UUID NOT NULL,
  PRIMARY KEY (id, tenant_id),
  dealname TEXT,
  dealstage TEXT,
  pipeline TEXT,
  amount NUMERIC,
  closedate TIMESTAMPTZ,
  createdate TIMESTAMPTZ NOT NULL,
  hubspot_owner_id TEXT,
  hs_lastmodifieddate TIMESTAMPTZ NOT NULL,
  notes_last_updated TIMESTAMPTZ,
  hs_last_sales_activity_date TIMESTAMPTZ,
  hs_date_entered_closedwon TIMESTAMPTZ,
  hs_date_entered_closedlost TIMESTAMPTZ,
  hs_is_closed_won BOOLEAN DEFAULT FALSE,
  hs_is_closed BOOLEAN DEFAULT FALSE,
  hs_time_in_current_stage BIGINT,
  hs_is_stalled BOOLEAN DEFAULT FALSE,
  days_to_close INTEGER,
  closed_lost_reason TEXT,
  hs_closed_lost_category TEXT,
  hs_deal_stage_probability NUMERIC,
  hs_analytics_source TEXT,
  hs_analytics_source_data_1 TEXT,
  dynamic_stage_properties JSONB,
  contact_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
  company_ids TEXT[] DEFAULT ARRAY[]::TEXT[],
  raw_data JSONB,
  synced_at TIMESTAMPTZ NOT NULL,
  archived BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (hubspot_owner_id, tenant_id) REFERENCES hs_owners(id, tenant_id)
);

CREATE INDEX idx_hs_deals_tenant ON hs_deals(tenant_id);
CREATE INDEX idx_hs_deals_owner ON hs_deals(hubspot_owner_id, tenant_id);
CREATE INDEX idx_hs_deals_modified ON hs_deals(hs_lastmodifieddate DESC);

-- Contacts
CREATE TABLE hs_contacts (
  id TEXT NOT NULL,
  tenant_id UUID NOT NULL,
  PRIMARY KEY (id, tenant_id),
  email TEXT,
  firstname TEXT,
  lastname TEXT,
  phone TEXT,
  company TEXT,
  jobtitle TEXT,
  lifecyclestage TEXT,
  hs_lead_status TEXT,
  hubspot_owner_id TEXT,
  createdate TIMESTAMPTZ NOT NULL,
  hs_lastmodifieddate TIMESTAMPTZ NOT NULL,
  hs_time_to_first_engagement TIMESTAMPTZ,
  notes_last_updated TIMESTAMPTZ,
  num_notes INTEGER,
  num_contacted_notes INTEGER,
  hs_sales_email_last_replied TIMESTAMPTZ,
  hs_is_unworked BOOLEAN DEFAULT FALSE,
  hs_analytics_source TEXT,
  raw_data JSONB,
  synced_at TIMESTAMPTZ NOT NULL,
  archived BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (hubspot_owner_id, tenant_id) REFERENCES hs_owners(id, tenant_id)
);

CREATE INDEX idx_hs_contacts_tenant ON hs_contacts(tenant_id);
CREATE INDEX idx_hs_contacts_email ON hs_contacts(email, tenant_id);
CREATE INDEX idx_hs_contacts_owner ON hs_contacts(hubspot_owner_id, tenant_id);

-- Companies
CREATE TABLE hs_companies (
  id TEXT NOT NULL,
  tenant_id UUID NOT NULL,
  PRIMARY KEY (id, tenant_id),
  name TEXT,
  domain TEXT,
  industry TEXT,
  city TEXT,
  country TEXT,
  numberofemployees INTEGER,
  annualrevenue NUMERIC,
  hubspot_owner_id TEXT,
  total_revenue NUMERIC,
  createdate TIMESTAMPTZ NOT NULL,
  hs_lastmodifieddate TIMESTAMPTZ NOT NULL,
  raw_data JSONB,
  synced_at TIMESTAMPTZ NOT NULL,
  archived BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE,
  FOREIGN KEY (hubspot_owner_id, tenant_id) REFERENCES hs_owners(id, tenant_id)
);

CREATE INDEX idx_hs_companies_tenant ON hs_companies(tenant_id);
CREATE INDEX idx_hs_companies_domain ON hs_companies(domain, tenant_id);

-- Pipeline Stages
CREATE TABLE hs_pipeline_stages (
  id TEXT NOT NULL,
  tenant_id UUID NOT NULL,
  PRIMARY KEY (id, tenant_id),
  pipeline_id TEXT NOT NULL,
  stage_id TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER,
  probability NUMERIC,
  is_closed_won BOOLEAN DEFAULT FALSE,
  is_closed_lost BOOLEAN DEFAULT FALSE,
  synced_at TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE INDEX idx_hs_pipeline_stages_tenant ON hs_pipeline_stages(tenant_id);
CREATE INDEX idx_hs_pipeline_stages_pipeline ON hs_pipeline_stages(pipeline_id, tenant_id);

-- Owners
CREATE TABLE hs_owners (
  id TEXT NOT NULL,
  tenant_id UUID NOT NULL,
  PRIMARY KEY (id, tenant_id),
  email TEXT NOT NULL,
  firstname TEXT,
  lastname TEXT,
  user_id INTEGER,
  synced_at TIMESTAMPTZ NOT NULL,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

CREATE INDEX idx_hs_owners_tenant ON hs_owners(tenant_id);
CREATE INDEX idx_hs_owners_email ON hs_owners(email, tenant_id);
```

---

## 9. Implementation Checklist

- [ ] Set up HubSpot app and obtain `CLIENT_ID` and `CLIENT_SECRET`
- [ ] Implement OAuth flow (authorization URL generation, callback handler)
- [ ] Create `hubspot_connections` table with encryption for tokens
- [ ] Implement token refresh logic with 30-minute buffer
- [ ] Build HubSpot API client with rate limiting and retry logic
- [ ] Create data mapping functions for deals, contacts, companies
- [ ] Implement incremental and full sync strategies
- [ ] Set up pipeline stages sync (must run first)
- [ ] Set up owners and associations sync
- [ ] Create sync orchestrator (`syncTenant` function)
- [ ] Set up Vercel Cron jobs (hourly + daily full sync)
- [ ] Create sync logs table for monitoring
- [ ] Implement comprehensive error handling
- [ ] Add authentication guards to sync endpoints
- [ ] Set up alerting for sync failures
- [ ] Test with sample HubSpot portal

---

## 10. Security Considerations

1. **Token Storage**: Always encrypt access and refresh tokens at rest. Use Supabase Vault or similar.
2. **HTTPS Only**: All OAuth and API calls must use HTTPS.
3. **State Parameter**: Always validate state in OAuth callback to prevent CSRF.
4. **Rate Limiting**: Implement per-tenant rate limiting to prevent abuse.
5. **Scope Minimization**: Only request the scopes needed (read-only for this integration).
6. **Error Messages**: Never expose sensitive tokens or IDs in error messages.
7. **Audit Logging**: Log all sync operations for compliance.

---

## 11. Monitoring & Alerts

```typescript
// lib/hubspot/monitoring.ts
export async function checkSyncHealth(tenantId: string, supabase: ReturnType<typeof createClient>) {
  const { data: lastSync } = await supabase
    .from('sync_logs')
    .select('status, completed_at')
    .eq('tenant_id', tenantId)
    .order('completed_at', { ascending: false })
    .limit(1)
    .single();

  if (!lastSync) {
    return { healthy: false, reason: 'No sync history' };
  }

  const now = new Date();
  const lastSyncTime = new Date(lastSync.completed_at);
  const hoursSinceSync = (now.getTime() - lastSyncTime.getTime()) / (1000 * 60 * 60);

  if (hoursSinceSync > 25) {
    return { healthy: false, reason: `Last sync was ${hoursSinceSync.toFixed(1)} hours ago` };
  }

  if (lastSync.status === 'error') {
    return { healthy: false, reason: 'Last sync failed' };
  }

  return { healthy: true };
}
```

---

**Document Version:** 1.0
**Last Updated:** 2026-03-17
