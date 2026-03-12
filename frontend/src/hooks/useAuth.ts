'use client';

import { useState, useCallback, useEffect } from 'react';
import type { User } from '@/types';

const AUTH_STORAGE_KEY = 'ishop_auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const { user, token } = JSON.parse(stored) as { user: User; token: string };
        setState({ user, token, isLoading: false });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      // Mock auth for now - replace with real API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'customer',
        createdAt: new Date().toISOString(),
      };
      const mockToken = `mock-token-${Date.now()}`;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: mockUser, token: mockToken }));
      setState({ user: mockUser, token: mockToken, isLoading: false });
      return { success: true };
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Sign in failed' };
    }
  }, []);

  const signUp = useCallback(async (name: string, email: string, _password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const mockUser: User = {
        id: String(Date.now()),
        email,
        name,
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
      const mockToken = `mock-token-${Date.now()}`;
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: mockUser, token: mockToken }));
      setState({ user: mockUser, token: mockToken, isLoading: false });
      return { success: true };
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Sign up failed' };
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setState({ user: null, token: null, isLoading: false });
  }, []);

  return {
    user: state.user,
    token: state.token,
    isLoading: state.isLoading,
    isAuthenticated: !!state.user,
    isAdmin: state.user?.role === 'admin',
    isAffiliate: state.user?.role === 'affiliate',
    signIn,
    signUp,
    signOut,
  };
}
