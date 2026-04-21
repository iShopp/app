'use client';

import { useCallback } from 'react';

export function useShallowMerge<T extends Record<string, unknown>>() {
  return useCallback((source: T, incoming: Partial<T>): T => ({ ...source, ...incoming }), []);
}

export function usePermissionlessRepair<T extends Record<string, unknown>>() {
  return useShallowMerge<T>();
}
