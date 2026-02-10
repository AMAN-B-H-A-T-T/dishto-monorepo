import React, {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Loader, OutletErrorPage } from '@lib/ui';

import type { OutletInfo, UserInfo } from '../types/common';
import { FRANCHISE_SIGN_OUT, USER_INFO } from '../constants/endpoint.constant';
import { PAGE_LOGIN } from '../constants/page';
import { useApi } from './ApiContext';
import { useToken } from './TokenContext';

interface AuthContextType {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  outletSlug: OutletInfo | null | undefined;
  setOutletSlug: (outletSlug: OutletInfo | null) => void;
  user: boolean;
  setUser: (user: boolean) => void;
  authLoading: boolean;
  setAuthLoading: (authLoading: boolean) => void;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { api } = useApi();
  const { accessToken, clearTokens } = useToken();

  const [user, setUser] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [outletSlug, setOutletSlug] = useState<OutletInfo | null>(null);

  const getUserInfo = useCallback(async () => {
    if (!accessToken) {
      setAuthLoading(false);
      setIsAuth(false);
      return;
    }
    try {
      setAuthLoading(true);
      const { data } = await api.get(USER_INFO);

      const userData = data.data;
      setUserInfo(userData);
      setIsAuth(true);
      setOutletSlug(userData?.extras?.outlet);
    } catch (error) {
      setUserInfo(null);
      setIsAuth(false);
      setOutletSlug(null);
    } finally {
      setAuthLoading(false);
    }
  }, [api, accessToken]);

  const logout = async () => {
    try {
      setLoading(true);
      await api.post(FRANCHISE_SIGN_OUT, {});
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      clearTokens();
      navigate(PAGE_LOGIN.path);
      setTimeout(() => {
        setUserInfo(null);
        setIsAuth(false);
        setOutletSlug(null);
        setLoading(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (location.pathname === PAGE_LOGIN.path) {
      setAuthLoading(false);
      return;
    }
    getUserInfo();
  }, [getUserInfo, user, location.pathname]);

  useEffect(() => {
    if (userInfo) {
      setOutletSlug(userInfo?.extras?.outlet);
    }
  }, [userInfo]);

  const value: AuthContextType = {
    userInfo,
    setUserInfo,
    loading,
    setLoading,
    outletSlug,
    setOutletSlug,
    user,
    setUser,
    authLoading,
    setAuthLoading,
    isAuth,
    setIsAuth,
    refreshAuth: getUserInfo,
    logout,
  };

  if (authLoading) return <Loader />;

  if (isAuth && !outletSlug) {
    console.log('Outlet slug not found', outletSlug);
    return <OutletErrorPage />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
