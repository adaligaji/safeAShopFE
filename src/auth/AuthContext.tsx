import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import api from '../api/client';
import type { LoginResponse, User } from '../types';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('safeashop_token'));
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('safeashop_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (username: string, password: string) => {
    const response = await api.post<LoginResponse>('/login', { username, password });
    const data = response.data;

    localStorage.setItem('safeashop_token', data.token);
    localStorage.setItem('safeashop_user', JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('safeashop_token');
    localStorage.removeItem('safeashop_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, token, login, logout, isAuthenticated: Boolean(token && user) }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe utilizarse dentro de AuthProvider');
  return context;
}
