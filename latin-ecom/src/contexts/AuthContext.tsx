import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { apiClient, setAuthToken } from '../api/client';
import { ApiItemResponse, AuthSuccess, User } from '../utils/types';

const STORAGE_KEY = 'latin-ecom/auth-token';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!token) {
      setStatus('unauthenticated');
      return;
    }

    setAuthToken(token);
    apiClient
      .get<ApiItemResponse<User>>('/api/auth/me')
      .then((response) => {
        setUser(response.data);
        setStatus('authenticated');
      })
      .catch(() => {
        setAuthToken(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEY);
        }
        setStatus('unauthenticated');
      });
  }, []);

  const login = async (email: string, password: string) => {
    setStatus('loading');
    try {
      const response = await apiClient.post<ApiItemResponse<AuthSuccess>>('/api/auth/login', {
        email,
        password
      });
      setAuthToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, response.data.token);
      }
      setUser(response.data.user);
      setStatus('authenticated');
    } catch (error) {
      setStatus(user ? 'authenticated' : 'unauthenticated');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setStatus('unauthenticated');
  };

  const value = useMemo(
    () => ({
      user,
      status,
      login,
      logout
    }),
    [user, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
