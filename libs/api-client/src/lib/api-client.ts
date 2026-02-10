import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import type { ApiClientConfig, QueuedRequest } from './types.js';

const DEFAULT_REFRESH_ENDPOINT = '/api/manage/refresh';

/**
 * Creates a configured axios instance with automatic token injection and
 * transparent token refresh on 403 responses.
 *
 * Key behaviour:
 * - Every outgoing request gets an `Authorization: Bearer <accessToken>` header
 * - On a 403 response, the middleware pauses all in-flight requests, calls the
 *   refresh endpoint exactly once, then replays every failed request with the
 *   new access token.
 * - If the refresh itself fails, `onRefreshFail` is called and all queued
 *   requests are rejected.
 *
 * Usage:
 * ```ts
 * const api = createApiClient({
 *   baseURL: 'https://api.example.com',
 *   getAccessToken: () => localStorage.getItem('accessToken'),
 *   getRefreshToken: () => localStorage.getItem('refreshToken'),
 *   setTokens: (a, r) => { localStorage.setItem('accessToken', a); localStorage.setItem('refreshToken', r); },
 *   onRefreshFail: () => navigate('/login'),
 * });
 *
 * const { data } = await api.get('/api/protected/resource');
 * ```
 */
export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const {
    baseURL,
    getAccessToken,
    getRefreshToken,
    setTokens,
    onRefreshFail,
    refreshEndpoint = DEFAULT_REFRESH_ENDPOINT,
  } = config;

  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // ── State for the refresh-queue mechanism ──────────────────────────────
  let isRefreshing = false;
  let failedQueue: QueuedRequest[] = [];

  /**
   * Process the queue of requests that were waiting for the token refresh.
   * If a new token is available, resolve them so they retry; otherwise reject.
   */
  function processQueue(error: unknown, token: string | null = null): void {
    failedQueue.forEach(({ resolve, reject }) => {
      if (token) {
        resolve(token);
      } else {
        reject(error);
      }
    });
    failedQueue = [];
  }

  // ── Request interceptor: attach access token ──────────────────────────
  instance.interceptors.request.use(
    (requestConfig: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token) {
        requestConfig.headers.Authorization = `Bearer ${token}`;
      }
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  // ── Response interceptor: handle 403 → refresh → retry ────────────────
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Only intercept 403 status codes
      if (!error.response || error.response.status !== 403) {
        return Promise.reject(error);
      }

      // If the refresh endpoint itself returned 403, don't loop
      if (originalRequest.url === refreshEndpoint) {
        onRefreshFail();
        return Promise.reject(error);
      }

      // If this request was already retried once, don't retry again
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      // ── A refresh is already in progress — queue this request ────────
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          originalRequest._retry = true;
          return instance(originalRequest);
        });
      }

      // ── No refresh in progress — initiate one ────────────────────────
      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;
        processQueue(error, null);
        onRefreshFail();
        return Promise.reject(error);
      }

      try {
        // Call the refresh endpoint with the refresh token in the body
        const { data } = await axios.post(
          `${baseURL}${refreshEndpoint}`,
          { refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const newAccessToken: string = data.accessToken;
        const newRefreshToken: string = data.refreshToken;

        // Persist the new tokens via the app-provided callback
        setTokens(newAccessToken, newRefreshToken);

        // Update the default header for future requests
        instance.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        // Resolve all queued requests with the new token
        processQueue(null, newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Refresh failed — reject everything and notify the app
        processQueue(refreshError, null);
        onRefreshFail();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return instance;
}
