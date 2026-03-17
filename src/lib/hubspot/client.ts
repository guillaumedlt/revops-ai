// HubSpot API Client — rate-limited with exponential backoff retry

const HUBSPOT_BASE_URL = "https://api.hubapi.com";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Pipeline {
  id: string;
  label: string;
  displayOrder: number;
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  label: string;
  displayOrder: number;
  metadata: {
    probability?: number;
    isClosed?: string;
  };
}

export interface Owner {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userId: number;
}

export interface SearchResponse {
  total: number;
  results: Array<{
    id: string;
    properties: Record<string, string | null>;
  }>;
  paging: {
    next?: { after: string };
  };
}

export interface ListResponse {
  results: Array<{
    id: string;
    properties: Record<string, string | null>;
  }>;
  paging?: {
    next?: { after: string };
  };
}

export interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  maxDelayMs: number;
}

const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
  initialDelayMs: 1_000,
  maxDelayMs: 8_000,
};

// ---------------------------------------------------------------------------
// Rate Limiter — 100 requests per 10 seconds per portal
// ---------------------------------------------------------------------------

interface RateLimitBucket {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitBucket>();

const RATE_LIMIT_WINDOW_MS = 10_000;
const RATE_LIMIT_MAX_REQUESTS = 100;

function getBucket(portalId: string): RateLimitBucket {
  let bucket = rateLimitMap.get(portalId);
  if (!bucket) {
    bucket = { timestamps: [] };
    rateLimitMap.set(portalId, bucket);
  }
  return bucket;
}

function pruneOldTimestamps(bucket: RateLimitBucket): void {
  const cutoff = Date.now() - RATE_LIMIT_WINDOW_MS;
  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);
}

export async function checkRateLimit(portalId: string): Promise<void> {
  const bucket = getBucket(portalId);
  pruneOldTimestamps(bucket);

  if (bucket.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    // Wait until the oldest timestamp in the window expires
    const oldestInWindow = bucket.timestamps[0];
    const waitMs = oldestInWindow + RATE_LIMIT_WINDOW_MS - Date.now() + 50; // 50ms buffer
    if (waitMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      pruneOldTimestamps(bucket);
    }
  }

  bucket.timestamps.push(Date.now());
}

// ---------------------------------------------------------------------------
// Fetch with Retry + Exponential Backoff
// ---------------------------------------------------------------------------

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  portalId: string,
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
    await checkRateLimit(portalId);

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      // Handle 429 rate limit — respect Retry-After header
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const waitMs = retryAfter
          ? parseInt(retryAfter, 10) * 1_000
          : Math.min(
              retryConfig.initialDelayMs * Math.pow(2, attempt),
              retryConfig.maxDelayMs
            );

        if (attempt < retryConfig.maxRetries) {
          await sleep(waitMs);
          continue;
        }
      }

      // Retry on 5xx server errors
      if (response.status >= 500 && attempt < retryConfig.maxRetries) {
        const delayMs = Math.min(
          retryConfig.initialDelayMs * Math.pow(2, attempt),
          retryConfig.maxDelayMs
        );
        await sleep(delayMs);
        continue;
      }

      // Non-retryable error — throw
      const body = await response.text();
      throw new Error(
        `HubSpot API error ${response.status}: ${body}`
      );
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // If it's a network error and we have retries left, retry
      if (
        attempt < retryConfig.maxRetries &&
        !(lastError.message.startsWith("HubSpot API error"))
      ) {
        const delayMs = Math.min(
          retryConfig.initialDelayMs * Math.pow(2, attempt),
          retryConfig.maxDelayMs
        );
        await sleep(delayMs);
        continue;
      }

      throw lastError;
    }
  }

  throw lastError ?? new Error("fetchWithRetry: unexpected failure");
}

// ---------------------------------------------------------------------------
// Helper: build headers
// ---------------------------------------------------------------------------

function authHeaders(accessToken: string): Record<string, string> {
  return {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
}

// ---------------------------------------------------------------------------
// API Methods
// ---------------------------------------------------------------------------

export async function getPipelines(
  accessToken: string,
  portalId: string
): Promise<Pipeline[]> {
  const response = await fetchWithRetry(
    `${HUBSPOT_BASE_URL}/crm/v3/pipelines/deals`,
    { method: "GET", headers: authHeaders(accessToken) },
    portalId
  );

  const data = await response.json();
  return data.results as Pipeline[];
}

export async function getOwners(
  accessToken: string,
  portalId: string
): Promise<Owner[]> {
  const response = await fetchWithRetry(
    `${HUBSPOT_BASE_URL}/crm/v3/owners`,
    { method: "GET", headers: authHeaders(accessToken) },
    portalId
  );

  const data = await response.json();
  return data.results as Owner[];
}

export async function searchObjects(
  objectType: string,
  filters: Array<{
    propertyName: string;
    operator: string;
    value?: string;
  }>,
  properties: string[],
  accessToken: string,
  portalId: string,
  after?: string
): Promise<SearchResponse> {
  const body: Record<string, unknown> = {
    filterGroups: filters.length > 0 ? [{ filters }] : [],
    properties,
    limit: 100,
  };

  if (after) {
    body.after = after;
  }

  const response = await fetchWithRetry(
    `${HUBSPOT_BASE_URL}/crm/v3/objects/${objectType}/search`,
    {
      method: "POST",
      headers: authHeaders(accessToken),
      body: JSON.stringify(body),
    },
    portalId
  );

  return response.json() as Promise<SearchResponse>;
}

export async function* searchObjectsIterator(
  objectType: string,
  filters: Array<{
    propertyName: string;
    operator: string;
    value?: string;
  }>,
  properties: string[],
  accessToken: string,
  portalId: string
): AsyncGenerator<{ id: string; properties: Record<string, string | null> }> {
  let after: string | undefined;

  do {
    const response = await searchObjects(
      objectType,
      filters,
      properties,
      accessToken,
      portalId,
      after
    );

    for (const result of response.results) {
      yield result;
    }

    after = response.paging?.next?.after;
  } while (after);
}

// ---------------------------------------------------------------------------
// List API — GET-based pagination (avoids search API property limits)
// ---------------------------------------------------------------------------

export async function listObjects(
  objectType: string,
  properties: string[],
  accessToken: string,
  portalId: string,
  after?: string
): Promise<ListResponse> {
  const params = new URLSearchParams({
    limit: "100",
    properties: properties.join(","),
  });
  if (after) params.set("after", after);

  const response = await fetchWithRetry(
    `${HUBSPOT_BASE_URL}/crm/v3/objects/${objectType}?${params}`,
    { method: "GET", headers: authHeaders(accessToken) },
    portalId
  );

  return response.json() as Promise<ListResponse>;
}

export async function* listObjectsIterator(
  objectType: string,
  properties: string[],
  accessToken: string,
  portalId: string
): AsyncGenerator<{ id: string; properties: Record<string, string | null> }> {
  let after: string | undefined;
  do {
    const response = await listObjects(objectType, properties, accessToken, portalId, after);
    for (const result of response.results) {
      yield result;
    }
    after = response.paging?.next?.after;
  } while (after);
}

export async function getAssociations(
  fromType: string,
  objectId: string,
  toType: string,
  accessToken: string,
  portalId: string
): Promise<string[]> {
  const response = await fetchWithRetry(
    `${HUBSPOT_BASE_URL}/crm/v4/objects/${fromType}/${objectId}/associations/${toType}`,
    { method: "GET", headers: authHeaders(accessToken) },
    portalId
  );

  const data = await response.json();
  // v4 associations return { results: [{ toObjectId, associationTypes: [...] }] }
  return (
    data.results?.map(
      (r: { toObjectId: string }) => r.toObjectId
    ) ?? []
  );
}
