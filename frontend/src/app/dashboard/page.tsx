// Dashboard page component
// Shows authenticated user's overview and navigation to tasks

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    // If user is not authenticated, redirect to sign in
    if (!loading && (!user || !user.isAuthenticated)) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || !user.isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Manage your tasks and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Manage your todo list efficiently
            </p>
            <Button onClick={() => router.push('/tasks')}>
              View Tasks
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create a new task to stay organized
            </p>
            <Button onClick={() => router.push('/tasks/new')}>
              Create Task
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex space-x-4">
        <Button
          variant="outline"
          onClick={() => {
            logout();
            router.push('/signin');
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
