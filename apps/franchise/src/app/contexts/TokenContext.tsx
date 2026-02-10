import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGE_LOGIN } from '../constants/page';

interface TokenContextType {
  /** Current access token (for checking auth status) */
  accessToken: string | null;
  /** Stable getter — always returns the latest access token */
  getAccessToken: () => string | null;
  /** Stable getter — always returns the latest refresh token */
  getRefreshToken: () => string | null;
  /** Persist new token pair after a successful refresh or login */
  handleSetTokens: (accessToken: string, refreshToken: string) => void;
  /** Called when the refresh token itself fails — clears everything, redirects to login */
  handleRefreshFail: () => void;
  /** Clear all tokens (used by logout) */
  clearTokens: () => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | null>(() =>
    localStorage.getItem('accessToken')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    localStorage.getItem('refreshToken')
  );

  // Refs so stable callbacks always read the latest value
  const accessTokenRef = useRef(accessToken);
  const refreshTokenRef = useRef(refreshToken);
  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);
  useEffect(() => {
    refreshTokenRef.current = refreshToken;
  }, [refreshToken]);

  const getAccessToken = useCallback(() => accessTokenRef.current, []);
  const getRefreshToken = useCallback(() => refreshTokenRef.current, []);

  const handleSetTokens = useCallback(
    (newAccess: string, newRefresh: string) => {
      setAccessToken(newAccess);
      setRefreshToken(newRefresh);
      localStorage.setItem('accessToken', newAccess);
      localStorage.setItem('refreshToken', newRefresh);
    },
    []
  );

  const clearTokens = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  const handleRefreshFail = useCallback(() => {
    clearTokens();
    navigate(PAGE_LOGIN.path);
  }, [clearTokens, navigate]);

  const value: TokenContextType = {
    accessToken,
    getAccessToken,
    getRefreshToken,
    handleSetTokens,
    handleRefreshFail,
    clearTokens,
  };

  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
