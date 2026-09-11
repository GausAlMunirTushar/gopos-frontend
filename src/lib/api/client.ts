'use client';

import { authSession, type AuthSession } from '@/lib/auth/session';

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1';

export class ApiError extends Error {
  public constructor(
    message: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const buildUrl = (path: string, query?: Record<string, string | number | boolean | undefined>) => {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE_URL}${path}`);
  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
  });
  return url.toString();
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

export const apiClient = {
  async request<T>(
    path: string,
    options: RequestInit & { query?: Record<string, string | number | boolean | undefined> } = {},
    isRetry = false,
  ): Promise<ApiResponse<T>> {
    const session = authSession.get();
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');
    if (session?.accessToken) headers.set('Authorization', `Bearer ${session.accessToken}`);

    const response = await fetch(buildUrl(path, options.query), {
      ...options,
      headers,
      body: options.body,
    });

    // Handle 401 token expiry with automatic refresh
    if (response.status === 401 && !isRetry && session?.refreshToken && path !== '/auth/login' && path !== '/auth/refresh') {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(buildUrl('/auth/refresh'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: session.refreshToken }),
          });
          const refreshData = (await refreshRes.json()) as ApiResponse<AuthSession>;
          if (refreshRes.ok && refreshData.success && refreshData.data) {
            authSession.set(refreshData.data);
            isRefreshing = false;
            onRefreshed(refreshData.data.accessToken);
            return this.request<T>(path, options, true);
          }
        } catch {
          authSession.clear();
        } finally {
          isRefreshing = false;
        }
      } else {
        // Queue retry while refreshing
        return new Promise((resolve, reject) => {
          refreshSubscribers.push((newToken: string) => {
            headers.set('Authorization', `Bearer ${newToken}`);
            this.request<T>(path, { ...options, headers }, true)
              .then(resolve)
              .catch(reject);
          });
        });
      }
    }

    const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;
    if (!response.ok || !payload?.success) {
      throw new ApiError(payload?.message ?? 'Request failed', response.status, payload);
    }
    return payload;
  },
  get<T>(path: string, query?: Record<string, string | number | boolean | undefined>) {
    return this.request<T>(path, { method: 'GET', query });
  },
  post<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: 'POST', body: JSON.stringify(body) });
  },
  patch<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: 'PATCH', body: JSON.stringify(body) });
  },
  put<T>(path: string, body: unknown) {
    return this.request<T>(path, { method: 'PUT', body: JSON.stringify(body) });
  },
  delete<T>(path: string, query?: Record<string, string | number | boolean | undefined>) {
    return this.request<T>(path, { method: 'DELETE', query });
  },
  setSession(session: AuthSession) {
    authSession.set(session);
  },
  clearSession() {
    authSession.clear();
  },
};

