import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from './TokenContext';

interface AuthContextType {
  /** Whether the user is authenticated (has an access token) */
  isAuth: boolean;
  /** Store tokens after a successful login */
  login: (accessToken: string, refreshToken: string) => void;
  /** Clear tokens and redirect to login */
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { accessToken, handleSetTokens, clearTokens } = useToken();

  const login = useCallback(
    (newAccess: string, newRefresh: string) => {
      handleSetTokens(newAccess, newRefresh);
    },
    [handleSetTokens]
  );

  const logout = useCallback(() => {
    clearTokens();
    navigate('/login');
  }, [clearTokens, navigate]);

  const value: AuthContextType = {
    isAuth: !!accessToken,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
