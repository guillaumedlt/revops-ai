export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  metadata: {
    timestamp: string;
    cached: boolean;
    sampleSize?: number;
    pageInfo?: {
      page: number;
      perPage: number;
      total: number;
      hasMore: boolean;
    };
  };
};

export type AuthContext = {
  tenantId: string;
  userId: string;
  email: string;
};

export function apiSuccess<T>(data: T, cached = false): ApiResponse<T> {
  return {
    data,
    error: null,
    metadata: { timestamp: new Date().toISOString(), cached },
  };
}

export function apiError(error: string): ApiResponse<null> {
  return {
    data: null,
    error,
    metadata: { timestamp: new Date().toISOString(), cached: false },
  };
}
