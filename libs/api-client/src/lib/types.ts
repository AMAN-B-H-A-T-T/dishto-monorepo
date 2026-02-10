import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * Configuration for creating an API client instance.
 * The app provides token getter/setter callbacks — the middleware never stores tokens itself.
 */
export interface ApiClientConfig {
  /** Base URL for all API requests (e.g. "https://api.dishto.in") */
  baseURL: string;

  /** Return the current access token, or null if none exists */
  getAccessToken: () => string | null;

  /** Return the current refresh token, or null if none exists */
  getRefreshToken: () => string | null;

  /**
   * Called after a successful token refresh.
   * The app should persist both tokens (state, localStorage, etc.)
   */
  setTokens: (accessToken: string, refreshToken: string) => void;

  /**
   * Called when the refresh token itself fails (e.g. expired).
   * The app should handle this — typically redirect to login or clear auth state.
   */
  onRefreshFail: () => void;

  /** Endpoint path for refreshing tokens. Defaults to "/api/manage/refresh" */
  refreshEndpoint?: string;
}

/** Queued request waiting for the token refresh to complete */
export interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

// Re-export axios types for convenience so consumers don't need to import axios directly
export type { AxiosInstance, AxiosRequestConfig, AxiosResponse };
