import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';

interface AdminUser {
  id: string;
  email: string;
}

interface AuthContextProps {
  token: string | null;
  user: AdminUser | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Load from localStorage if available
  const getInitialToken = () => localStorage.getItem('token');
  const getInitialUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };
  const [token, setToken] = useState<string | null>(getInitialToken());
  const [user, setUser] = useState<AdminUser | null>(getInitialUser());
  const [status, setStatus] = useState<'idle' | 'loading' | 'authenticated' | 'unauthenticated'>(token ? 'authenticated' : 'idle');
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setStatus('loading');
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      setToken(response.data.accessToken);
      setUser(response.data.admin);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
      setStatus('authenticated');
      return true;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
      setStatus('unauthenticated');
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  };

  const logout = async () => {
    setStatus('loading');
    setError(null);
    try {
      await api.post('/auth/logout');
    } catch {}
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setStatus('unauthenticated');
  };

  const refreshSession = async () => {
    setStatus('loading');
    setError(null);
    try {
      const response = await api.post('/auth/refresh');
      setToken(response.data.accessToken);
      setUser(response.data.admin);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.admin));
      setStatus('authenticated');
    } catch (err: any) {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setStatus('unauthenticated');
      setError(err?.response?.data?.message || 'Session refresh failed');
    }
  };

  useEffect(() => {
    refreshSession();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, status, error, login, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
