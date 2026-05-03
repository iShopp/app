'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/auth-context';
import type { User } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: User['role'];
  redirectTo?: string;
}

export default function ProtectedRoute({ children, requiredRole, redirectTo = '/auth/signin' }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace(redirectTo);
        return;
      }
      if (requiredRole && user?.role !== requiredRole) {
        router.replace('/');
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, redirectTo, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requiredRole && user?.role !== requiredRole) return null;

  return <>{children}</>;
}
