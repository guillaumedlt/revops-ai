# API Routes Reference — RevOps AI SaaS

**Project:** Next.js 14+ App Router | TypeScript | Supabase | HubSpot | Claude AI | Stripe | Vercel

**Last Updated:** 2026-03-17

---

## Table of Contents

1. [Response Format Convention](#response-format-convention)
2. [Authentication & Security](#authentication--security)
3. [Auth Routes](#auth-routes)
4. [Metrics Routes](#metrics-routes)
5. [Chat Route](#chat-route)
6. [Cron Routes](#cron-routes)
7. [Webhook Routes](#webhook-routes)
8. [Export Routes](#export-routes)
9. [Settings Routes](#settings-routes)
10. [Pilot Routes](#pilot-routes)
11. [Common Error Responses](#common-error-responses)

---

## Response Format Convention

All API responses follow this envelope structure:

```typescript
type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  metadata: {
    timestamp: string; // ISO 8601
    cached: boolean;
    sampleSize?: number; // For metrics
    pageInfo?: {
      page: number;
      perPage: number;
      total: number;
      hasMore: boolean;
    };
  };
};
```

**HTTP Status Codes:**
- `200 OK` — Success
- `201 Created` — Resource created
- `400 Bad Request` — Validation error (error field will be populated)
- `401 Unauthorized` — Missing/invalid auth
- `403 Forbidden` — Insufficient permissions
- `404 Not Found` — Resource not found
- `409 Conflict` — Business logic error (e.g., duplicate tenant)
- `500 Internal Server Error` — Server error

**Monetary Values:** All in EUR (€)
**Dates:** All ISO 8601 format (YYYY-MM-DDTHH:mm:ssZ)
**Pagination:** When applicable, use `page` and `perPage` query params (default perPage=20, max=100)

---

## Authentication & Security

### Auth Context
All authenticated endpoints receive a context object:

```typescript
type AuthContext = {
  tenantId: string; // UUID
  userId: string; // User UUID from auth.users
  accessToken: string;
  expiresAt: number; // Unix timestamp
};
```

### Middleware

Implement middleware in `lib/middleware.ts`:

```typescript
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;

  if (!token) {
    return null;
  }

  try {
    const verified = await jwtVerify(token, secret);
    return {
      tenantId: verified.payload.tenant_id as string,
      userId: verified.payload.user_id as string,
      accessToken: verified.payload.hubspot_access_token as string,
      expiresAt: verified.payload.exp as number,
    };
  } catch {
    return null;
  }
}

export function requireAuth(handler: Function) {
  return async (request: NextRequest) => {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json(
        {
          data: null,
          error: 'Unauthorized',
          metadata: { timestamp: new Date().toISOString(), cached: false },
        },
        { status: 401 }
      );
    }
    return handler(request, auth);
  };
}

export function requireCronSecret(handler: Function) {
  return async (request: NextRequest) => {
    const secret = request.headers.get('x-cron-secret');
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json(
        {
          data: null,
          error: 'Invalid cron secret',
          metadata: { timestamp: new Date().toISOString(), cached: false },
        },
        { status: 403 }
      );
    }
    return handler(request);
  };
}
```

---

## Auth Routes

### POST /api/auth/hubspot

**Purpose:** Initiate HubSpot OAuth flow. Generate and return authorization URL.

**Method:** `POST`
**Auth:** None
**Rate Limit:** 10 per minute per IP

**Request Body:**

```typescript
const InitiateOAuthSchema = z.object({
  redirectUrl: z.string().url().describe('Frontend URL to redirect to after OAuth'),
});
```

**Response (200):**

```typescript
type InitiateOAuthResponse = {
  authUrl: string; // HubSpot OAuth authorization URL with state parameter
  state: string; // Store this client-side to verify callback
};
```

**Implementation Notes:**

- Generate a random `state` parameter (32 bytes, hex-encoded)
- Store state in Redis with 10-minute TTL: `oauth:state:{state}`
- Construct URL using HubSpot OAuth endpoint:
  ```
  https://app.hubapi.com/oauth/authorize?
    client_id={HUBSPOT_CLIENT_ID}
    &redirect_uri={callback_url}
    &scope=crm.objects.contacts.read,crm.objects.deals.read,...
    &state={state}
  ```
- Return full URL and state to client

**Example Response:**

```json
{
  "data": {
    "authUrl": "https://app.hubapi.com/oauth/authorize?client_id=...",
    "state": "abc123..."
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:30:00Z",
    "cached": false
  }
}
```

---

### GET /api/auth/hubspot/callback

**Purpose:** Handle OAuth callback, exchange code for tokens, create or link tenant.

**Method:** `GET`
**Auth:** None
**Query Parameters:**

```typescript
const CallbackQuerySchema = z.object({
  code: z.string().describe('Authorization code from HubSpot'),
  state: z.string().describe('State parameter for CSRF protection'),
});
```

**Response (200):**

```typescript
type CallbackResponse = {
  authToken: string; // JWT signed with JWT_SECRET
  redirectUrl: string; // Frontend URL to redirect to
  isNewTenant: boolean; // True if tenant was just created
  tenantId: string;
};
```

**Response (400 - Invalid State):**

```json
{
  "data": null,
  "error": "Invalid or expired state parameter",
  "metadata": { "timestamp": "...", "cached": false }
}
```

**Implementation Notes:**

1. **Validate state:**
   - Retrieve state from Redis: `oauth:state:{state}`
   - If not found or expired, return 400 error
   - Delete state from Redis immediately

2. **Exchange code for tokens:**
   ```typescript
   const response = await fetch('https://api.hubapi.com/crm/v3/oauth/tokens', {
     method: 'POST',
     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     body: new URLSearchParams({
       grant_type: 'authorization_code',
       client_id: process.env.HUBSPOT_CLIENT_ID!,
       client_secret: process.env.HUBSPOT_CLIENT_SECRET!,
       redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/hubspot/callback`,
       code,
     }).toString(),
   });
   ```

3. **Extract tenant from HubSpot:**
   - Call `GET /crm/v3/objects/contacts?limit=1` with access token to verify validity
   - Extract portal ID from response headers or fallback to stored value

4. **Create or get tenant in Supabase:**
   ```sql
   INSERT INTO tenants (hubspot_portal_id, name, created_at)
   VALUES ($1, $2, NOW())
   ON CONFLICT (hubspot_portal_id) DO UPDATE SET updated_at = NOW()
   RETURNING id, hubspot_portal_id
   ```

5. **Create or get user:**
   ```sql
   INSERT INTO users (tenant_id, email, hubspot_access_token,
                       hubspot_refresh_token, token_expires_at, created_at)
   VALUES ($1, $2, $3, $4, $5, NOW())
   ON CONFLICT (tenant_id, email) DO UPDATE
   SET hubspot_access_token = $3,
       hubspot_refresh_token = $4,
       token_expires_at = $5,
       updated_at = NOW()
   RETURNING id, email
   ```

6. **Generate JWT:**
   ```typescript
   const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
   const jwt = await new SignJWT({
     tenant_id: tenantId,
     user_id: userId,
     email: userEmail,
     hubspot_access_token: accessToken,
     exp: expiresAt,
   })
     .setProtectedHeader({ alg: 'HS256' })
     .sign(secret);
   ```

7. **Set HTTP-only cookie:**
   ```typescript
   response.cookies.set('auth_token', jwt, {
     httpOnly: true,
     secure: process.env.NODE_ENV === 'production',
     sameSite: 'lax',
     maxAge: 7 * 24 * 60 * 60,
   });
   ```

8. **Return redirect URL:**
   - If new tenant: `{NEXT_PUBLIC_BASE_URL}/onboarding`
   - If existing: `{NEXT_PUBLIC_BASE_URL}/dashboard`

**Example Response (New Tenant):**

```json
{
  "data": {
    "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "redirectUrl": "https://app.example.com/onboarding",
    "isNewTenant": true,
    "tenantId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "error": null,
  "metadata": { "timestamp": "2026-03-17T10:35:00Z", "cached": false }
}
```

---

### POST /api/auth/logout

**Purpose:** Invalidate session and clear auth token.

**Method:** `POST`
**Auth:** Required (JWT)
**Request Body:** Empty object `{}`

**Response (200):**

```typescript
type LogoutResponse = {
  message: string;
};
```

**Implementation Notes:**

- Clear auth_token cookie
- Optionally blacklist JWT in Redis for immediate revocation (store `blacklist:jwt:{jti}` with TTL = token expiry)
- Return success message

**Example Response:**

```json
{
  "data": {
    "message": "Logged out successfully"
  },
  "error": null,
  "metadata": { "timestamp": "2026-03-17T10:40:00Z", "cached": false }
}
```

---

## Metrics Routes

All metrics endpoints:
- **Method:** `GET`
- **Auth:** Required (JWT)
- **Caching:** 5-minute Redis cache per tenant + filters

### Common Query Parameters

```typescript
const MetricsQuerySchema = z.object({
  dateRange: z.object({
    start: z.string().datetime().describe('ISO 8601 start date'),
    end: z.string().datetime().describe('ISO 8601 end date'),
  }).optional().describe('Defaults to last 30 days'),

  ownerIds: z.array(z.string()).optional().describe('Filter by HubSpot owner IDs'),

  pipeline: z.array(z.string()).optional().describe('Filter by pipeline IDs'),

  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(20),
});
```

**Cache Key Pattern:**
```
metrics:{tenant_id}:{route}:{hash(filters)}
```

---

### GET /api/metrics/adoption-score

**Purpose:** Returns overall adoption score and sub-scores across key RevOps dimensions.

**Response (200):**

```typescript
type AdoptionScoreResponse = {
  overallScore: number; // 0-100
  lastUpdated: string; // ISO 8601
  dimensions: {
    dataQuality: {
      score: number;
      status: 'excellent' | 'good' | 'fair' | 'poor';
      trend: 'improving' | 'stable' | 'declining';
    };
    engagement: {
      score: number;
      status: 'excellent' | 'good' | 'fair' | 'poor';
      trend: 'improving' | 'stable' | 'declining';
      avgActivitiesPerDeal: number;
    };
    forecast: {
      score: number;
      status: 'excellent' | 'good' | 'fair' | 'poor';
      trend: 'improving' | 'stable' | 'declining';
      forecastAccuracy: number; // %
    };
    velocity: {
      score: number;
      status: 'excellent' | 'good' | 'fair' | 'poor';
      trend: 'improving' | 'stable' | 'declining';
      avgSalesCycleDays: number;
    };
  };
  domainHealth: {
    potentialRiskAreas: string[];
    recommendations: string[];
  };
};
```

**Implementation Notes:**

- Query contacts, deals, activities, and historical data from Supabase
- Calculate data quality: missing fields, duplicates, staleness (RLS filters by tenant_id)
- Calculate engagement: activity count, recency, deal progression
- Calculate forecast: compare predicted vs. actual close dates
- Calculate velocity: avg days in each stage, bottleneck stages
- Generate risk areas and recommendations based on thresholds
- Cache 1 hour (adoption score computed daily by cron)

**Example Response:**

```json
{
  "data": {
    "overallScore": 72,
    "lastUpdated": "2026-03-17T09:00:00Z",
    "dimensions": {
      "dataQuality": {
        "score": 85,
        "status": "good",
        "trend": "improving"
      },
      "engagement": {
        "score": 68,
        "status": "fair",
        "trend": "stable",
        "avgActivitiesPerDeal": 4.2
      },
      "forecast": {
        "score": 75,
        "status": "good",
        "trend": "improving",
        "forecastAccuracy": 78
      },
      "velocity": {
        "score": 62,
        "status": "fair",
        "trend": "declining",
        "avgSalesCycleDays": 42
      }
    },
    "domainHealth": {
      "potentialRiskAreas": [
        "Low activity volume in Q1",
        "3 deals stalled >60 days"
      ],
      "recommendations": [
        "Increase deal touches to 5+ per month",
        "Review and update lost deal analysis"
      ]
    }
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:45:00Z",
    "cached": true,
    "sampleSize": 240
  }
}
```

---

### GET /api/metrics/pipeline

**Purpose:** Pipeline value analysis by stage, owner, and weighted forecast.

**Response (200):**

```typescript
type PipelineResponse = {
  totalValue: {
    amount: number; // EUR
    count: number; // deal count
    currency: string;
  };
  byStage: Array<{
    stageName: string;
    stageOrder: number;
    value: number; // EUR
    count: number;
    avgDealSize: number; // EUR
    percentOfTotal: number;
  }>;
  byOwner: Array<{
    ownerId: string;
    ownerName: string;
    value: number; // EUR
    count: number;
    avgDealSize: number; // EUR
  }>;
  weighted: {
    totalWeighted: number; // EUR (considering probability)
    byStage: Array<{
      stageName: string;
      weightedValue: number; // EUR
      baseValue: number; // EUR
      probability: number; // 0-100 (derived from stage)
    }>;
  };
  forecast: {
    month: string; // YYYY-MM
    expectedRevenue: number; // EUR
    confidence: 'high' | 'medium' | 'low';
  }[];
};
```

**Implementation Notes:**

- Query `deals` table filtered by tenant_id and date range
- Join `deal_stages` to get stage names and probability weights
- Group by stage and owner
- Calculate weighted revenue: `deal_amount * (stage_probability / 100)`
- Generate monthly forecast by probability-weighted deal close dates
- Include pagination if many records

**Example Response:**

```json
{
  "data": {
    "totalValue": {
      "amount": 1250000,
      "count": 45,
      "currency": "EUR"
    },
    "byStage": [
      {
        "stageName": "Negotiation",
        "stageOrder": 4,
        "value": 450000,
        "count": 12,
        "avgDealSize": 37500,
        "percentOfTotal": 36
      },
      {
        "stageName": "Proposal",
        "stageOrder": 3,
        "value": 375000,
        "count": 15,
        "avgDealSize": 25000,
        "percentOfTotal": 30
      }
    ],
    "byOwner": [
      {
        "ownerId": "1234567",
        "ownerName": "Alice Johnson",
        "value": 550000,
        "count": 18,
        "avgDealSize": 30556
      }
    ],
    "weighted": {
      "totalWeighted": 875000,
      "byStage": [
        {
          "stageName": "Negotiation",
          "weightedValue": 405000,
          "baseValue": 450000,
          "probability": 90
        }
      ]
    },
    "forecast": [
      {
        "month": "2026-03",
        "expectedRevenue": 200000,
        "confidence": "high"
      }
    ]
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:46:00Z",
    "cached": true,
    "sampleSize": 45
  }
}
```

---

### GET /api/metrics/velocity

**Purpose:** Sales cycle velocity, time per stage, bottleneck identification.

**Response (200):**

```typescript
type VelocityResponse = {
  overallSalesCycle: {
    avgDaysToClose: number;
    medianDaysToClose: number;
    trend: number; // % change from previous period
  };
  byStage: Array<{
    stageName: string;
    stageOrder: number;
    avgDaysInStage: number;
    medianDaysInStage: number;
    dealCount: number;
    percentStalled: number; // % of deals >expected time
    expectedDays: number; // benchmark
  }>;
  bottlenecks: Array<{
    stageName: string;
    reason: string; // e.g., "Longest avg duration"
    severity: 'critical' | 'high' | 'medium';
    affectedDealCount: number;
  }>;
  timeDistribution: Array<{
    daysInSalesCycle: string; // "0-7", "8-14", etc.
    dealCount: number;
    percentage: number;
  }>;
};
```

**Implementation Notes:**

- Calculate days in each stage using `deal_stage_changes` history or `created_at` to `closed_at`
- Identify stalled deals: deals in stage for >2x expected duration with no recent activity
- Benchmark against industry/plan tier defaults
- Flag critical bottlenecks (>10 deals affected, >30 day avg)
- Distribution should be 5-10 buckets covering full range

**Example Response:**

```json
{
  "data": {
    "overallSalesCycle": {
      "avgDaysToClose": 42,
      "medianDaysToClose": 38,
      "trend": -8
    },
    "byStage": [
      {
        "stageName": "Qualification",
        "stageOrder": 1,
        "avgDaysInStage": 5,
        "medianDaysInStage": 4,
        "dealCount": 120,
        "percentStalled": 2,
        "expectedDays": 7
      },
      {
        "stageName": "Negotiation",
        "stageOrder": 4,
        "avgDaysInStage": 18,
        "medianDaysInStage": 15,
        "dealCount": 45,
        "percentStalled": 22,
        "expectedDays": 10
      }
    ],
    "bottlenecks": [
      {
        "stageName": "Negotiation",
        "reason": "Longest avg duration (18 days vs 10 expected)",
        "severity": "high",
        "affectedDealCount": 10
      }
    ],
    "timeDistribution": [
      {
        "daysInSalesCycle": "0-7",
        "dealCount": 12,
        "percentage": 27
      }
    ]
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:47:00Z",
    "cached": true,
    "sampleSize": 220
  }
}
```

---

### GET /api/metrics/closing

**Purpose:** Win rate, lost deal analysis, competitive loss trends.

**Response (200):**

```typescript
type ClosingResponse = {
  winRate: {
    percentage: number; // 0-100
    closedWonCount: number;
    closedLostCount: number;
    totalClosed: number;
    trend: number; // % change
  };
  byOwner: Array<{
    ownerId: string;
    ownerName: string;
    winRate: number; // %
    closedWon: number;
    closedLost: number;
  }>;
  losReason: Array<{
    reason: string;
    count: number;
    percentage: number;
    trend: number; // count change from previous period
  }>;
  lostToCompetitor: Array<{
    competitorName: string;
    count: number;
    avgDealSize: number; // EUR
  }>;
  avgDealSize: {
    won: number; // EUR
    lost: number; // EUR
  };
  benchmarking: {
    yourWinRate: number; // %
    industryBenchmark: number; // %
    yourRanking: string; // "Above", "At", or "Below"
  };
};
```

**Implementation Notes:**

- Query `deals` with `status = 'closedWon'` or `status = 'closedLost'`
- Extract `closedReason` and `lostReason` fields from HubSpot (stored in Supabase)
- Parse `closedReason` for competitor name (e.g., "Lost to Salesforce")
- Calculate win rate by owner
- Track lost reason trends month-over-month
- Include industry benchmarks from config (tier-based or hardcoded)

**Example Response:**

```json
{
  "data": {
    "winRate": {
      "percentage": 58,
      "closedWonCount": 87,
      "closedLostCount": 63,
      "totalClosed": 150,
      "trend": 5
    },
    "byOwner": [
      {
        "ownerId": "1234567",
        "ownerName": "Alice Johnson",
        "winRate": 72,
        "closedWon": 36,
        "closedLost": 14
      }
    ],
    "losReason": [
      {
        "reason": "Price",
        "count": 28,
        "percentage": 44,
        "trend": 3
      },
      {
        "reason": "Lost to competitor",
        "count": 22,
        "percentage": 35,
        "trend": -2
      }
    ],
    "lostToCompetitor": [
      {
        "competitorName": "Salesforce",
        "count": 12,
        "avgDealSize": 45000
      }
    ],
    "avgDealSize": {
      "won": 42500,
      "lost": 35000
    },
    "benchmarking": {
      "yourWinRate": 58,
      "industryBenchmark": 52,
      "yourRanking": "Above"
    }
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:48:00Z",
    "cached": true,
    "sampleSize": 150
  }
}
```

---

### GET /api/metrics/revenue

**Purpose:** Revenue won, by owner/account, and revenue forecast.

**Response (200):**

```typescript
type RevenueResponse = {
  totalRevenue: {
    won: number; // EUR
    recurring: number; // EUR (if applicable)
    arr: number; // Annual Recurring Revenue, EUR
    trend: number; // % change from previous period
  };
  byOwner: Array<{
    ownerId: string;
    ownerName: string;
    revenueWon: number; // EUR
    dealCount: number;
    avgDealSize: number; // EUR
    quota?: number; // EUR
    quotaAttainment?: number; // %
  }>;
  byAccount: Array<{
    accountId: string;
    accountName: string;
    totalRevenue: number; // EUR
    dealCount: number;
    avgDealSize: number; // EUR
    lastWon: string; // ISO 8601
  }>;
  forecast: Array<{
    month: string; // YYYY-MM
    forecastedRevenue: number; // EUR
    confidence: 'high' | 'medium' | 'low';
  }>;
  topAccounts: Array<{
    accountName: string;
    revenue: number; // EUR
    growthRate: number; // % YoY
  }>;
};
```

**Implementation Notes:**

- Sum `amount` from deals with `status = 'closedWon'` and `closed_date` in date range
- Calculate recurring revenue from subscription data (if tracked)
- Calculate ARR: monthly_recurring_revenue * 12
- Group by HubSpot owner and associated company/account
- Include quota from tenant settings (if configured)
- Forecast based on weighted pipeline * conversion rate
- Top accounts sorted by revenue (DESC), limit 10

**Example Response:**

```json
{
  "data": {
    "totalRevenue": {
      "won": 3250000,
      "recurring": 850000,
      "arr": 10200000,
      "trend": 12
    },
    "byOwner": [
      {
        "ownerId": "1234567",
        "ownerName": "Alice Johnson",
        "revenueWon": 1100000,
        "dealCount": 22,
        "avgDealSize": 50000,
        "quota": 1000000,
        "quotaAttainment": 110
      }
    ],
    "byAccount": [
      {
        "accountId": "acc_123",
        "accountName": "TechCorp Inc",
        "totalRevenue": 250000,
        "dealCount": 3,
        "avgDealSize": 83333,
        "lastWon": "2026-02-15T12:00:00Z"
      }
    ],
    "forecast": [
      {
        "month": "2026-04",
        "forecastedRevenue": 450000,
        "confidence": "high"
      }
    ],
    "topAccounts": [
      {
        "accountName": "TechCorp Inc",
        "revenue": 250000,
        "growthRate": 15
      }
    ]
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:49:00Z",
    "cached": true,
    "sampleSize": 180
  }
}
```

---

### GET /api/metrics/activity

**Purpose:** Activity volume, unworked deals, engagement trends.

**Response (200):**

```typescript
type ActivityResponse = {
  totalActivity: {
    count: number;
    email: number;
    call: number;
    meeting: number;
    task: number;
    note: number;
    trend: number; // % change
  };
  activityByOwner: Array<{
    ownerId: string;
    ownerName: string;
    activityCount: number;
    emailCount: number;
    callCount: number;
    avgActivitiesPerDeal: number;
  }>;
  unworkedDeals: {
    count: number;
    percentage: number; // % of open deals
    by30Days: number;
    by60Days: number;
    by90Days: number;
    avgStageTime: number; // days
  };
  engagementTrends: Array<{
    period: string; // YYYY-MM
    totalActivities: number;
    avgActivitiesPerDeal: number;
    dealsWithActivity: number;
  }>;
  activityHeatmap: {
    day: string; // "Monday", "Tuesday", etc.
    avgActivitiesPerDay: number;
  }[];
};
```

**Implementation Notes:**

- Query `activities` table filtered by tenant_id, date range, activity type
- Join with deals to count activities per deal
- Unworked deals: deals with no activity in specified days
- Activity types: email, call, meeting, task, note
- Engagement trends: group by month, calculate moving averages
- Heatmap: group activities by day of week

**Example Response:**

```json
{
  "data": {
    "totalActivity": {
      "count": 2840,
      "email": 1200,
      "call": 640,
      "meeting": 480,
      "task": 320,
      "note": 200,
      "trend": 8
    },
    "activityByOwner": [
      {
        "ownerId": "1234567",
        "ownerName": "Alice Johnson",
        "activityCount": 720,
        "emailCount": 320,
        "callCount": 180,
        "avgActivitiesPerDeal": 8.2
      }
    ],
    "unworkedDeals": {
      "count": 18,
      "percentage": 12,
      "by30Days": 8,
      "by60Days": 14,
      "by90Days": 18,
      "avgStageTime": 38
    },
    "engagementTrends": [
      {
        "period": "2026-01",
        "totalActivities": 850,
        "avgActivitiesPerDeal": 6.5,
        "dealsWithActivity": 130
      }
    ],
    "activityHeatmap": [
      {
        "day": "Monday",
        "avgActivitiesPerDay": 620
      }
    ]
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:50:00Z",
    "cached": true,
    "sampleSize": 150
  }
}
```

---

### GET /api/metrics/data-quality

**Purpose:** Data quality score, missing fields, duplicate detection.

**Response (200):**

```typescript
type DataQualityResponse = {
  overallScore: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  lastAudit: string; // ISO 8601
  missingFields: Array<{
    objectType: 'contact' | 'deal' | 'company' | 'activity';
    fieldName: string;
    completeness: number; // % of records with value
    priority: 'critical' | 'high' | 'medium' | 'low';
  }>;
  duplicates: {
    totalCount: number;
    byType: Array<{
      type: 'email' | 'phone' | 'company_name';
      count: number;
      affectedRecords: number;
    }>;
  };
  staleness: {
    contactsNotUpdatedInDays: number;
    dealsNotUpdatedInDays: number;
    averageRecordAge: number; // days
  };
  recommendations: string[];
  trend: 'improving' | 'stable' | 'declining';
};
```

**Implementation Notes:**

- Calculate completeness for key fields: first_name, last_name, email, phone, company, industry, etc.
- Detect duplicates:
  - Email: exact match, case-insensitive
  - Phone: normalized (remove spaces/dashes), match
  - Company: fuzzy match (Levenshtein distance <3)
- Staleness: max(last_modified_at) for each object type
- Grade mapping: A=90-100, B=80-89, C=70-79, D=60-69, F=<60
- Score weighted: field completeness 40%, duplicates 30%, staleness 30%
- Recommendations: suggest syncs, data cleanup, field mapping

**Example Response:**

```json
{
  "data": {
    "overallScore": 78,
    "grade": "C",
    "lastAudit": "2026-03-17T09:00:00Z",
    "missingFields": [
      {
        "objectType": "contact",
        "fieldName": "phone",
        "completeness": 65,
        "priority": "high"
      },
      {
        "objectType": "deal",
        "fieldName": "closeDate",
        "completeness": 92,
        "priority": "low"
      }
    ],
    "duplicates": {
      "totalCount": 24,
      "byType": [
        {
          "type": "email",
          "count": 12,
          "affectedRecords": 24
        }
      ]
    },
    "staleness": {
      "contactsNotUpdatedInDays": 45,
      "dealsNotUpdatedInDays": 8,
      "averageRecordAge": 120
    },
    "recommendations": [
      "Run duplicate merge for 12 email duplicates",
      "Update 95 contacts with missing phone numbers"
    ],
    "trend": "improving"
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:51:00Z",
    "cached": true,
    "sampleSize": 420
  }
}
```

---

### GET /api/metrics/lead-management

**Purpose:** Lead volume, conversion rates, source distribution.

**Response (200):**

```typescript
type LeadManagementResponse = {
  totalLeads: {
    count: number;
    newInPeriod: number;
    conversionRate: number; // % to MQL/SQL/Opportunity
    trend: number; // % change
  };
  bySource: Array<{
    source: string; // e.g., "Website", "LinkedIn", "Referral"
    count: number;
    percentage: number;
    conversionRate: number; // %
    avgTimeToConversion: number; // days
    costPerLead?: number; // EUR, if tracked
  }>;
  conversionFunnel: Array<{
    stage: string; // "Lead" -> "MQL" -> "SQL" -> "Opportunity"
    count: number;
    conversionFromPrevious: number; // %
    avgDaysInStage: number;
  }>;
  byOwner: Array<{
    ownerId: string;
    ownerName: string;
    leadsAssigned: number;
    leadsConverted: number;
    conversionRate: number; // %
  }>;
  qualityMetrics: {
    avgLeadScore: number; // 0-100
    bounceRate: number; // invalid emails %
    responseRate: number; // % replied to first touch
  };
};
```

**Implementation Notes:**

- Lead source tracked in HubSpot `hs_lead_status` or custom field
- Conversion: track stage progression from Lead → Opportunity
- Funnel stages: Lead → MQL → SQL → Opportunity (customizable per tenant)
- Cost per lead: track if paid source (can be optional)
- Lead score: custom field or AI-computed score
- Bounce rate: email validity from verification service
- Response rate: activity count within 7 days of lead creation

**Example Response:**

```json
{
  "data": {
    "totalLeads": {
      "count": 320,
      "newInPeriod": 85,
      "conversionRate": 28,
      "trend": 6
    },
    "bySource": [
      {
        "source": "Website",
        "count": 180,
        "percentage": 56,
        "conversionRate": 32,
        "avgTimeToConversion": 12,
        "costPerLead": 18
      }
    ],
    "conversionFunnel": [
      {
        "stage": "Lead",
        "count": 320,
        "conversionFromPrevious": null,
        "avgDaysInStage": 8
      },
      {
        "stage": "MQL",
        "count": 210,
        "conversionFromPrevious": 66,
        "avgDaysInStage": 5
      }
    ],
    "byOwner": [
      {
        "ownerId": "1234567",
        "ownerName": "Alice Johnson",
        "leadsAssigned": 45,
        "leadsConverted": 14,
        "conversionRate": 31
      }
    ],
    "qualityMetrics": {
      "avgLeadScore": 68,
      "bounceRate": 8,
      "responseRate": 42
    }
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T10:52:00Z",
    "cached": true,
    "sampleSize": 320
  }
}
```

---

## Chat Route

### POST /api/chat

**Purpose:** Streaming chat endpoint for AI-powered conversational agent. Deducts credits from tenant account.

**Method:** `POST`
**Auth:** Required (JWT)
**Rate Limit:** 100 requests per minute per tenant

**Request Body:**

```typescript
const ChatRequestSchema = z.object({
  message: z.string().min(1).max(4000).describe('User message'),
  conversationId: z.string().uuid().optional().describe('Existing conversation ID for threading'),
  context: z.object({
    currentDashboard: z.enum(['overview', 'pipeline', 'metrics', 'settings']).optional(),
    selectedDateRange: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }).optional(),
  }).optional().describe('UI context for better agent responses'),
});
```

**Response (200 - Streaming):**

Uses `text/event-stream` content type. Each event is a newline-delimited JSON object:

```typescript
type StreamingChatEvent =
  | {
      type: 'token';
      token: string;
    }
  | {
      type: 'metadata';
      conversationId: string;
      messageId: string;
      model: 'haiku' | 'sonnet';
      inputTokens: number;
      outputTokens: number;
      creditsUsed: number;
      totalCreditsRemaining: number;
    }
  | {
      type: 'action';
      actionType: 'fetch_metric' | 'generate_report' | 'suggest_action';
      actionData: Record<string, unknown>;
    }
  | {
      type: 'error';
      error: string;
    }
  | {
      type: 'done';
    };
```

**Implementation Notes:**

1. **Validate auth and credits:**
   - Retrieve tenant's current credit balance from `billing_usage` table
   - Haiku costs: 1 credit per 1000 input + 1 credit per 500 output tokens
   - Sonnet costs: 2 credits per 1000 input + 1 credit per 250 output tokens

2. **Create or retrieve conversation:**
   ```sql
   INSERT INTO conversations (tenant_id, user_id, created_at)
   VALUES ($1, $2, NOW())
   RETURNING id
   ```

3. **Build context-aware system prompt:**
   - Include tenant adoption score, key metrics
   - Include selected date range
   - Include current dashboard context

4. **Route to model based on heuristics:**
   - Default to Haiku (cheaper, faster)
   - Switch to Sonnet if message contains: "analyze", "detailed", "comprehensive", "forecast", "recommend"

5. **Stream response:**
   ```typescript
   const response = await anthropic.messages.stream({
     model: 'claude-3-5-haiku-20241022',
     max_tokens: 1024,
     system: systemPrompt,
     messages: [{ role: 'user', content: message }],
   });

   for await (const chunk of response) {
     if (chunk.type === 'content_block_delta') {
       res.write(`data: ${JSON.stringify({ type: 'token', token: chunk.delta.text })}\n\n`);
     }
   }
   ```

6. **Save message and usage:**
   ```sql
   INSERT INTO messages (conversation_id, role, content, model, input_tokens,
                         output_tokens, created_at)
   VALUES ($1, 'user', $2, $3, $4, $5, NOW());

   INSERT INTO billing_usage (tenant_id, usage_type, amount, created_at)
   VALUES ($1, $3, $6, NOW());
   ```

7. **Send metadata event with final counts:**
   - Calculate total credits used
   - Check if tenant exceeded plan limits
   - Return remaining balance

8. **Error handling:**
   - Insufficient credits: send error event, close stream with 402 status
   - API errors: retry once, then send error event
   - Timeout: close stream, save partial message

**Example Stream (Token-by-token):**

```
data: {"type":"token","token":"Based"}
data: {"type":"token","token":" on"}
data: {"type":"token","token":" your"}
...
data: {"type":"metadata","conversationId":"123e4567-e89b-12d3-a456-426614174000","messageId":"msg_789","model":"haiku","inputTokens":245,"outputTokens":312,"creditsUsed":2,"totalCreditsRemaining":498}
data: {"type":"done"}
```

---

## Cron Routes

All cron routes:
- **Auth:** Require `X-Cron-Secret` header matching `process.env.CRON_SECRET`
- **Response:** Always return task execution summary
- **Rate Limit:** None (cron-only)

### POST /api/cron/sync-hubspot

**Purpose:** Trigger incremental HubSpot sync for all tenants. Fetches changed contacts, deals, and companies.

**Method:** `POST`
**Auth:** `X-Cron-Secret` header required
**Request Body:** Empty `{}`

**Response (200):**

```typescript
type SyncHubspotResponse = {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  tenantsProcessed: number;
  recordsSync: {
    contacts: number;
    deals: number;
    companies: number;
    activities: number;
  };
  errors: Array<{
    tenantId: string;
    error: string;
  }>;
  duration: number; // milliseconds
};
```

**Implementation Notes:**

1. **Query all active tenants:**
   ```sql
   SELECT id, hubspot_portal_id FROM tenants WHERE is_active = true
   ```

2. **For each tenant:**
   - Retrieve latest sync timestamp from `sync_log` table
   - Use HubSpot search API with `hs_lastmodifieddate` filter:
     ```
     GET /crm/v3/objects/contacts/search
     Filter: hs_lastmodifieddate > {lastSyncTime}
     ```

3. **Sync contacts:**
   - Fetch email, phone, first_name, last_name, company, lifecycle_stage
   - Upsert to `contacts` table (RLS enforces tenant_id)
   - Update `hubspot_contact_id` mapping

4. **Sync deals:**
   - Fetch dealname, amount, dealstage, closedate, hubspot_owner_id
   - Upsert to `deals` table
   - Track deal_stage_changes for velocity metrics

5. **Sync companies:**
   - Fetch company name, domain, industry, employee_count
   - Upsert to `companies` table

6. **Sync activities:**
   - Fetch recent emails, calls, meetings, tasks (last 7 days)
   - Insert into `activities` table

7. **Log sync:**
   ```sql
   INSERT INTO sync_log (tenant_id, sync_type, records_count, last_sync_at, status)
   VALUES ($1, 'hubspot', $2, NOW(), 'completed')
   ```

8. **Handle errors:**
   - Catch rate limits (429), retry with exponential backoff
   - Log API errors but continue with next tenant
   - Return summary of all processed tenants

**Example Response:**

```json
{
  "data": {
    "jobId": "sync_20260317_103000",
    "status": "completed",
    "tenantsProcessed": 12,
    "recordsSync": {
      "contacts": 3420,
      "deals": 284,
      "companies": 156,
      "activities": 8940
    },
    "errors": [
      {
        "tenantId": "550e8400-e29b-41d4-a716-446655440001",
        "error": "HubSpot API rate limit exceeded, retry scheduled"
      }
    ],
    "duration": 45000
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T11:00:00Z",
    "cached": false
  }
}
```

---

### POST /api/cron/compute-scores

**Purpose:** Compute daily adoption scores and save to database for all tenants.

**Method:** `POST`
**Auth:** `X-Cron-Secret` header required
**Request Body:** Empty `{}`

**Response (200):**

```typescript
type ComputeScoresResponse = {
  jobId: string;
  tenantsProcessed: number;
  scoresComputed: Array<{
    tenantId: string;
    overallScore: number;
    dataQuality: number;
    engagement: number;
    forecast: number;
    velocity: number;
  }>;
  errors: Array<{
    tenantId: string;
    error: string;
  }>;
  duration: number; // milliseconds
};
```

**Implementation Notes:**

1. **Query all active tenants:**
   ```sql
   SELECT id FROM tenants WHERE is_active = true
   ```

2. **For each tenant, compute dimensions (logic from /api/metrics/adoption-score):**
   - Data Quality: field completeness, duplicates, staleness
   - Engagement: activity count, recency, deal progression
   - Forecast: accuracy of predicted vs actual close dates
   - Velocity: sales cycle speed, bottleneck detection

3. **Calculate weighted overall score:**
   - Data Quality: 40%
   - Engagement: 25%
   - Forecast: 20%
   - Velocity: 15%

4. **Save scores:**
   ```sql
   INSERT INTO adoption_scores (tenant_id, overall_score, data_quality,
                                 engagement, forecast, velocity, computed_at)
   VALUES ($1, $2, $3, $4, $5, $6, NOW())
   ```

5. **Track changes:**
   - Compare to previous day's score
   - Calculate trend (improving/stable/declining)
   - Store in `adoption_score_history`

6. **Error handling:**
   - Catch any calculation errors, log, continue
   - Return partial results

**Example Response:**

```json
{
  "data": {
    "jobId": "compute_20260317_000000",
    "tenantsProcessed": 12,
    "scoresComputed": [
      {
        "tenantId": "550e8400-e29b-41d4-a716-446655440000",
        "overallScore": 72,
        "dataQuality": 85,
        "engagement": 68,
        "forecast": 75,
        "velocity": 62
      }
    ],
    "errors": [],
    "duration": 28000
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T00:00:00Z",
    "cached": false
  }
}
```

---

### POST /api/cron/weekly-review

**Purpose:** Generate weekly review summaries for all tenants and send via email.

**Method:** `POST`
**Auth:** `X-Cron-Secret` header required
**Request Body:** Empty `{}`

**Response (200):**

```typescript
type WeeklyReviewResponse = {
  jobId: string;
  tenantsProcessed: number;
  reviewsSent: number;
  errors: Array<{
    tenantId: string;
    error: string;
  }>;
  duration: number; // milliseconds
};
```

**Implementation Notes:**

1. **Query active tenants with email notifications enabled:**
   ```sql
   SELECT t.id, u.email FROM tenants t
   JOIN users u ON t.id = u.tenant_id
   WHERE t.is_active = true AND u.notify_weekly_review = true
   ```

2. **For each tenant, generate report:**
   - Fetch metrics for last 7 days
   - Compare to previous week
   - Identify key changes (positive/negative)
   - Extract top 3 action items

3. **Build email content:**
   - Summary card: overall score, top changes
   - Pipeline snapshot: total value, won/lost, win rate
   - Engagement summary: activity volume, unworked deals
   - Recommendations: top 3 actions

4. **Send via email service (e.g., SendGrid):**
   ```typescript
   await sgMail.send({
     to: userEmail,
     from: 'insights@app.example.com',
     subject: `Weekly Review: Your RevOps Metrics (${weekOf})`,
     html: reviewHtml,
   });
   ```

5. **Save delivery:**
   ```sql
   INSERT INTO weekly_reviews (tenant_id, sent_at, content_hash)
   VALUES ($1, NOW(), $2)
   ```

6. **Error handling:**
   - Email delivery failures: queue for retry
   - Missing data: skip metrics, continue with others
   - Return count of successfully sent reviews

**Example Response:**

```json
{
  "data": {
    "jobId": "review_20260316_000000",
    "tenantsProcessed": 12,
    "reviewsSent": 11,
    "errors": [
      {
        "tenantId": "550e8400-e29b-41d4-a716-446655440001",
        "error": "User email not found"
      }
    ],
    "duration": 15000
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-16T00:00:00Z",
    "cached": false
  }
}
```

---

## Webhook Routes

### POST /api/webhooks/stripe

**Purpose:** Handle Stripe webhook events for subscription changes, payment failures, etc.

**Method:** `POST`
**Auth:** None (Stripe signature verification required)
**Content-Type:** `application/json`

**Request:**

Stripe sends raw request body + `stripe-signature` header. Verify signature:

```typescript
const sig = request.headers.get('stripe-signature');
const body = await request.text();

try {
  const event = stripe.webhooks.constructEvent(
    body,
    sig!,
    process.env.STRIPE_WEBHOOK_SECRET!
  );
} catch (err) {
  return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
}
```

**Handled Events:**

1. **`customer.subscription.created`:**
   - Extract tenant_id from metadata
   - Create `subscription` record
   - Initialize credit balance based on plan tier

2. **`customer.subscription.updated`:**
   - Update `subscription` record with new plan, next_billing_date
   - If plan changed, recalculate credit allocation

3. **`customer.subscription.deleted`:**
   - Mark subscription as `status = 'canceled'`
   - Disable access (set tenant `is_active = false`)

4. **`invoice.payment_succeeded`:**
   - Log payment in `billing_payments` table
   - Reset failed payment counter

5. **`invoice.payment_failed`:**
   - Increment failed payment counter
   - Send alert email to tenant

**Response (200):**

```typescript
type StripeWebhookResponse = {
  received: boolean;
  eventId: string;
};
```

**Implementation Notes:**

```typescript
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature');
  const body = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  switch (event.type) {
    case 'customer.subscription.created':
      const subscription = event.data.object;
      const tenantId = subscription.metadata.tenant_id;

      await supabase.from('subscriptions').insert({
        tenant_id: tenantId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer,
        plan_id: subscription.items.data[0].price.product,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000),
        current_period_end: new Date(subscription.current_period_end * 1000),
      });

      // Initialize credits based on plan
      const plan = await getStripePlan(subscription.items.data[0].price.product);
      await supabase.from('billing_usage').insert({
        tenant_id: tenantId,
        usage_type: 'credit_allocation',
        amount: plan.monthlyCredits,
      });
      break;

    case 'customer.subscription.deleted':
      await supabase.from('tenants')
        .update({ is_active: false })
        .eq('id', event.data.object.metadata.tenant_id);
      break;

    // ... other cases
  }

  return NextResponse.json({ received: true, eventId: event.id });
}
```

---

## Export Routes

### POST /api/export/pdf

**Purpose:** Generate PDF export of dashboard metrics and insights.

**Method:** `POST`
**Auth:** Required (JWT)
**Content-Type:** `application/json`

**Request Body:**

```typescript
const ExportPdfRequestSchema = z.object({
  sections: z.array(z.enum([
    'adoption_score',
    'pipeline',
    'revenue',
    'closing',
    'velocity',
    'activity',
    'data_quality',
    'recommendations'
  ])).describe('Sections to include in PDF'),

  dateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional().describe('Date range for metrics'),

  title: z.string().max(200).optional().describe('Custom report title'),

  includeCharts: z.boolean().default(true).describe('Include chart visualizations'),
});
```

**Response (200):**

Returns PDF file with `Content-Type: application/pdf` and `Content-Disposition: attachment`

**Response (202 - For large reports):**

```typescript
type ExportPdfAsyncResponse = {
  jobId: string;
  status: 'processing';
  downloadUrl: string;
  expiresAt: string; // ISO 8601, 24 hours from now
};
```

**Implementation Notes:**

1. **Fetch all requested metrics:**
   - Call internal metric endpoints with same auth context
   - Build data object with all sections

2. **Generate PDF:**
   - Use library like `pdfkit` or `puppeteer`
   - Include company branding (logo, colors from tenant settings)
   - Add charts using `chart.js` rendered to PNG

3. **For large reports:**
   - If >30 sections or >100KB PDF, return 202 with job ID
   - Queue background task to generate PDF
   - Store in S3 with signed URL
   - Return download URL valid for 24 hours

4. **Example PDF structure:**
   ```
   [Logo + Title]

   Generated: March 17, 2026
   Period: March 1-17, 2026

   1. Executive Summary
      - Overall Adoption Score: 72/100
      - Key Changes: ...

   2. Pipeline Overview
      - Total Value: €1.25M
      - [Chart: Pipeline by Stage]

   3. Revenue
      - Won This Period: €325K
      - [Chart: Revenue Trend]

   ... (other sections)
   ```

5. **Error handling:**
   - Invalid sections: return 400 with list of valid sections
   - Insufficient data: skip section, note in report
   - File generation timeout: return 202 with retry link

**Example Response (Sync):**

File download with headers:
```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="RevOps_Report_Mar2026.pdf"
Content-Length: 2048576

[PDF binary data]
```

**Example Response (Async):**

```json
{
  "data": {
    "jobId": "export_pdf_550e8400",
    "status": "processing",
    "downloadUrl": "https://app.example.com/downloads/export_pdf_550e8400?token=...",
    "expiresAt": "2026-03-18T11:30:00Z"
  },
  "error": null,
  "metadata": {
    "timestamp": "2026-03-17T11:30:00Z",
    "cached": false
  }
}
```

---

## Settings Routes

### GET /api/settings

**Purpose:** Retrieve tenant settings (targets, preferences, integrations).

**Method:** `GET`
**Auth:** Required (JWT)

**Response (200):**

```typescript
type SettingsResponse = {
  general: {
    tenantName: string;
    timezone: string;
    dateFormat: string; // "DD/MM/YYYY", "MM/DD/YYYY", etc.
    currency: 'EUR';
  };
  targets: {
    monthlyRevenueTarget: number; // EUR
    winRateTarget: number; // %
    avgSalesCycleTarget: number; // days
    activityPerDealTarget: number;
  };
  notifications: {
    emailOnWeeklyReview: boolean;
    emailOnLowDataQuality: boolean;
    emailOnMissedTargets: boolean;
    slackChannel?: string;
  };
  integrations: {
    hubspot: {
      connected: boolean;
      portalId: string;
      lastSyncAt: string; // ISO 8601
      syncFrequency: 'hourly' | 'daily' | '6hours';
    };
    stripe?: {
      connected: boolean;
      planId: string;
    };
  };
  advanced: {
    dataRetentionDays: number;
    allowMultipleAdmins: boolean;
    customReportingFields: string[];
  };
};
```

**Implementation Notes:**

```sql
SELECT * FROM tenant_settings WHERE tenant_id = $1;
```

---

### PUT /api/settings

**Purpose:** Update tenant settings.

**Method:** `PUT`
**Auth:** Required (JWT), must be tenant admin
**Request Body:**

```typescript
const UpdateSettingsSchema = z.object({
  general: z.object({
    tenantName: z.string().max(100).optional(),
    timezone: z.string().optional(),
    dateFormat: z.enum(['DD/MM/YYYY', 'MM/DD/YYYY']).optional(),
  }).optional(),

  targets: z.object({
    monthlyRevenueTarget: z.number().positive().optional(),
    winRateTarget: z.number().min(0).max(100).optional(),
    avgSalesCycleTarget: z.number().positive().optional(),
    activityPerDealTarget: z.number().positive().optional(),
  }).optional(),

  notifications: z.object({
    emailOnWeeklyReview: z.boolean().optional(),
    emailOnLowDataQuality: z.boolean().optional(),
    emailOnMissedTargets: z.boolean().optional(),
    slackChannel: z.string().optional(),
  }).optional(),
}).strict();
```

**Response (200):**

Same as GET /api/settings

**Implementation Notes:**

```sql
UPDATE tenant_settings
SET general = COALESCE($2, general),
    targets = COALESCE($3, targets),
    notifications = COALESCE($4, notifications),
    updated_at = NOW()
WHERE tenant_id = $1
RETURNING *;
```

---

### GET /api/settings/billing

**Purpose:** Retrieve subscription status and credit usage.

**Method:** `GET`
**Auth:** Required (JWT), must be tenant owner/admin
**Response (200):**

```typescript
type BillingResponse = {
  subscription: {
    status: 'active' | 'past_due' | 'canceled' | 'trial';
    planName: string;
    planId: string;
    monthlyPrice: number; // EUR
    billingCycle: {
      currentPeriodStart: string; // ISO 8601
      currentPeriodEnd: string; // ISO 8601
      renewalDate: string; // ISO 8601
    };
    canceledAt?: string; // ISO 8601, if canceled
  };
  credits: {
    monthlyAllocation: number;
    currentBalance: number;
    used: number;
    resetDate: string; // ISO 8601
    resetSchedule: 'monthly' | 'annual';
  };
  usage: {
    messages: number; // chat API calls
    chatTokens: number; // consumed tokens
    costEstimate: number; // EUR
  };
  nextInvoice?: {
    dueDate: string; // ISO 8601
    amount: number; // EUR
    status: 'upcoming' | 'draft';
  };
  paymentMethod?: {
    type: 'card' | 'bank_transfer';
    lastFour: string;
    expiryMonth?: number;
    expiryYear?: number;
  };
};
```

**Implementation Notes:**

```sql
SELECT
  s.status, s.plan_id, s.current_period_start, s.current_period_end,
  bu.monthly_allocation, bu.current_balance,
  SUM(CASE WHEN bu.usage_type = 'chat' THEN bu.amount ELSE 0 END) as chat_tokens
FROM subscriptions s
LEFT JOIN billing_usage bu ON s.tenant_id = bu.tenant_id
WHERE s.tenant_id = $1
GROUP BY s.id, bu.id;
```

---

## Pilot Routes

Pilot program: Early adopter features, A/B testing, custom workflows.

### GET /api/pilot/notes

**Purpose:** Retrieve pilot session notes.

**Method:** `GET`
**Auth:** Required (JWT)
**Query Parameters:**

```typescript
const PilotNotesQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
```

**Response (200):**

```typescript
type PilotNotesResponse = {
  notes: Array<{
    id: string; // UUID
    title: string;
    content: string;
    createdAt: string; // ISO 8601
    updatedAt: string; // ISO 8601
    tags: string[];
  }>;
  pagination: {
    page: number;
    perPage: number;
    total: number;
    hasMore: boolean;
  };
};
```

**Implementation Notes:**

```sql
SELECT * FROM pilot_notes
WHERE tenant_id = $1
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;
```

---

### POST /api/pilot/notes

**Purpose:** Create a pilot session note.

**Method:** `POST`
**Auth:** Required (JWT)
**Request Body:**

```typescript
const CreatePilotNoteSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
  tags: z.array(z.string()).max(10).optional(),
});
```

**Response (201):**

Same structure as GET, single note object.

**Implementation Notes:**

```sql
INSERT INTO pilot_notes (tenant_id, user_id, title, content, tags, created_at)
VALUES ($1, $2, $3, $4, $5, NOW())
RETURNING *;
```

---

### GET/POST/PUT /api/pilot/actions

**Purpose:** CRUD action items for pilots (similar structure to notes).

**Methods:** `GET`, `POST`, `PUT`
**Auth:** Required (JWT)

**Response Structure:**

```typescript
type PilotAction = {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string; // user email
  dueDate?: string; // ISO 8601
  createdAt: string;
  updatedAt: string;
};
```

**Implementation Notes:**

- GET: Fetch actions, filter by status/priority
- POST: Create new action
- PUT: Update action status/priority/assignee
- All endpoints: RLS filters by tenant_id

---

### GET/POST /api/pilot/objectives

**Purpose:** CRUD OKRs for pilot programs.

**Methods:** `GET`, `POST`
**Auth:** Required (JWT)

**Response Structure:**

```typescript
type PilotObjective = {
  id: string;
  objective: string; // "Improve data quality score by 10%"
  keyResults: Array<{
    id: string;
    result: string;
    targetValue: number;
    currentValue: number;
    progress: number; // %
  }>;
  owner?: string; // user email
  quarter: string; // "Q1 2026"
  status: 'draft' | 'active' | 'completed' | 'abandoned';
  createdAt: string;
  updatedAt: string;
};
```

**Implementation Notes:**

- OKRs tied to tenant pilots or specific users
- Track progress against key results monthly
- Can archive/complete OKRs

---

## Common Error Responses

### 400 Bad Request

Returned when request validation fails:

```json
{
  "data": null,
  "error": "Invalid request: 'dateRange.start' must be a valid ISO 8601 datetime",
  "metadata": {
    "timestamp": "2026-03-17T11:35:00Z",
    "cached": false
  }
}
```

### 401 Unauthorized

Missing or invalid authentication:

```json
{
  "data": null,
  "error": "Unauthorized",
  "metadata": {
    "timestamp": "2026-03-17T11:35:00Z",
    "cached": false
  }
}
```

### 403 Forbidden

Insufficient permissions (e.g., non-admin trying to update settings):

```json
{
  "data": null,
  "error": "Forbidden: Only tenant admins can modify settings",
  "metadata": {
    "timestamp": "2026-03-17T11:35:00Z",
    "cached": false
  }
}
```

### 404 Not Found

Resource not found:

```json
{
  "data": null,
  "error": "Pilot note not found",
  "metadata": {
    "timestamp": "2026-03-17T11:35:00Z",
    "cached": false
  }
}
```

### 409 Conflict

Business logic conflict:

```json
{
  "data": null,
  "error": "Conflict: Tenant already exists for this HubSpot portal",
  "metadata": {
    "timestamp": "2026-03-17T11:35:00Z",
    "cached": false
  }
}
```

### 500 Internal Server Error

Unhandled server error:

```json
{
  "data": null,
  "error": "Internal server error",
  "metadata": {
    "timestamp": "2026-03-17T11:35:00Z",
    "cached": false
  }
}
```

---

## Summary Table

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/hubspot` | POST | None | Initiate OAuth |
| `/api/auth/hubspot/callback` | GET | None | OAuth callback |
| `/api/auth/logout` | POST | JWT | Logout |
| `/api/metrics/adoption-score` | GET | JWT | Overall adoption score |
| `/api/metrics/pipeline` | GET | JWT | Pipeline analysis |
| `/api/metrics/velocity` | GET | JWT | Sales cycle velocity |
| `/api/metrics/closing` | GET | JWT | Win rate & lost deals |
| `/api/metrics/revenue` | GET | JWT | Revenue metrics |
| `/api/metrics/activity` | GET | JWT | Activity volume |
| `/api/metrics/data-quality` | GET | JWT | Data quality score |
| `/api/metrics/lead-management` | GET | JWT | Lead pipeline |
| `/api/chat` | POST | JWT | Streaming chat |
| `/api/cron/sync-hubspot` | POST | Cron Secret | Sync HubSpot |
| `/api/cron/compute-scores` | POST | Cron Secret | Compute adoption scores |
| `/api/cron/weekly-review` | POST | Cron Secret | Generate weekly reviews |
| `/api/webhooks/stripe` | POST | Signature | Stripe webhooks |
| `/api/export/pdf` | POST | JWT | Export PDF report |
| `/api/settings` | GET/PUT | JWT | Tenant settings |
| `/api/settings/billing` | GET | JWT | Billing & credits |
| `/api/pilot/notes` | GET/POST | JWT | Pilot notes CRUD |
| `/api/pilot/actions` | GET/POST/PUT | JWT | Action items CRUD |
| `/api/pilot/objectives` | GET/POST | JWT | OKRs CRUD |

---

## Notes for Implementation

1. **Database Schema:** Ensure RLS policies enforce `tenant_id` on all queries
2. **Caching:** Use Redis with tenant_id + filters as cache key
3. **Rate Limiting:** Implement via middleware (e.g., `ratelimit` library)
4. **Error Logging:** Log all errors with tenant_id and user_id for debugging
5. **Monitoring:** Track API response times, error rates, credit usage
6. **Documentation:** Keep OpenAPI/Swagger spec in sync with this doc
7. **Testing:** Unit tests for Zod schemas, integration tests for auth flow
8. **Security:** Validate all inputs, sanitize outputs, use HTTPS only
9. **Performance:** Add pagination/limits to prevent large result sets
10. **Audit Trail:** Log all settings changes, billing events, and admin actions

