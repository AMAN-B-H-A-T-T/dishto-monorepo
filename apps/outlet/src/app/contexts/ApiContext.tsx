import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { createApiClient } from '@lib/api-client';
import type { AxiosInstance } from '@lib/api-client';
import { useToken } from './TokenContext';

interface ApiContextType {
  api: AxiosInstance;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

/**
 * Provides a shared axios instance configured with automatic token injection
 * and transparent 403 → refresh → retry logic.
 *
 * Must be rendered inside `<TokenProvider>` so it can access token callbacks.
 */
export const ApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    getAccessToken,
    getRefreshToken,
    handleSetTokens,
    handleRefreshFail,
  } = useToken();

  const api = useMemo(
    () =>
      createApiClient({
        baseURL: '',
        getAccessToken,
        getRefreshToken,
        setTokens: handleSetTokens,
        onRefreshFail: handleRefreshFail,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const value = useMemo(() => ({ api }), [api]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

/**
 * Returns the shared axios instance.
 *
 * ```tsx
 * const { api } = useApi();
 * const { data } = await api.get('/api/protected/resource');
 * ```
 */
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
