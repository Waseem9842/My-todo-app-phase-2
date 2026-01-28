// Layout for authentication pages (signup, signin)
// Provides a consistent layout for all auth-related pages

import React from 'react';

// Auth layout props
interface AuthLayoutProps {
  children: React.ReactNode;
}

// Auth layout component implementation
export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Todo App
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Manage your tasks efficiently
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}