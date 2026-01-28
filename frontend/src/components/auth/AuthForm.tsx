// AuthForm component
// A reusable form component for authentication-related forms

import React from 'react';

// AuthForm props interface
interface AuthFormProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  loading?: boolean;
  error?: string | null;
}

// AuthForm component implementation
const AuthForm: React.FC<AuthFormProps> = ({
  children,
  title,
  description,
  onSubmit,
  submitButtonText,
  loading = false,
  error
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={onSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {children}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the AuthForm component
export { AuthForm };