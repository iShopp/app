'use client';

import { useCallback } from 'react';

export function useShallowMerge<T>() {
  return useCallback((source: T, incoming: Partial<T>): T => ({ ...source, ...incoming }), []);
}

export function usePermissionlessRepair<T>() {
  return useShallowMerge<T>();
}
