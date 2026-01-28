'use client';

import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function DashboardClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  // If not authenticated, redirect to sign in
  if (!loading && (!user || !user.isAuthenticated)) {
    router.push('/signin');
    return null;
  }

  return <>{children}</>;
}
