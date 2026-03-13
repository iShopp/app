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
    // FIXME: Mock auth only — NEVER ship to production.
    // Role is assigned based on email string match which is insecure.
    // Replace with a real API call that returns the authenticated user's role from the backend.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Mock authentication must not be used in production. Connect to the real auth API.');
    }
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
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
    // FIXME: Mock auth only — NEVER ship to production.
    // Replace with a real API call.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Mock authentication must not be used in production. Connect to the real auth API.');
    }
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
