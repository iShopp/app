'use client';

import { useState, useCallback, useEffect } from 'react';
import type { User } from '@/types';
import { authApi } from '@/lib/api';

const AUTH_STORAGE_KEY = 'ishop_auth';

const VALID_ROLES = ['customer', 'admin', 'affiliate'] as const;

function normalizeRole(raw: string): User['role'] {
  const lower = raw.toLowerCase();
  if ((VALID_ROLES as readonly string[]).includes(lower)) {
    return lower as User['role'];
  }
  return 'customer';
}

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
      const response = await authApi.signIn(email, password);
      const { access_token, user } = response.data;
      const normalizedUser: User = {
        ...user,
        role: normalizeRole(user.role as string),
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: normalizedUser, token: access_token }));
      setState({ user: normalizedUser, token: access_token, isLoading: false });
      return { success: true };
    } catch (err: unknown) {
      setState((prev) => ({ ...prev, isLoading: false }));
      const message = err instanceof Error ? err.message : 'Sign in failed';
      return { success: false, error: message };
    }
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const response = await authApi.signUp({ name, email, password });
      const { access_token, user } = response.data;
      const normalizedUser: User = {
        ...user,
        role: normalizeRole(user.role as string),
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: normalizedUser, token: access_token }));
      setState({ user: normalizedUser, token: access_token, isLoading: false });
      return { success: true };
    } catch (err: unknown) {
      setState((prev) => ({ ...prev, isLoading: false }));
      const message = err instanceof Error ? err.message : 'Sign up failed';
      return { success: false, error: message };
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
