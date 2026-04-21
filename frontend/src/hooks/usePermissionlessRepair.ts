'use client';

import { useCallback } from 'react';

export function usePermissionlessRepair<T>() {
  return useCallback((source: T, incoming: Partial<T>): T => ({ ...source, ...incoming }), []);
}
