// Mobile Navigation Menu Component
// Responsive navigation menu that appears on smaller screens

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';

// MobileNavigationMenu props interface
interface MobileNavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// MobileNavigationMenu component implementation
const MobileNavigationMenu: React.FC<MobileNavigationMenuProps> = ({
  isOpen,
  onClose
}) => {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
      onClose(); // Close menu after logout
    }
  };

  // Don't render if menu is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Navigation panel */}
      <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all dark:bg-gray-800">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative w-full max-w-xs transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-sm">
            <div className="bg-white px-4 pb-4 pt-5 dark:bg-gray-800 sm:p-6 sm:pb-4">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white" id="mobile-menu-title">
                  Navigation
                </h3>

                <div className="mt-4">
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={onClose}
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/tasks"
                      className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={onClose}
                    >
                      My Tasks
                    </Link>

                    <Link
                      href="/profile"
                      className="flex items-center rounded-lg px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={onClose}
                    >
                      Profile
                    </Link>

                    {user && user.isAuthenticated && (
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className={`flex w-full items-center justify-center rounded-lg px-4 py-2 text-base font-medium ${
                          isLoggingOut
                            ? 'bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-400'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the MobileNavigationMenu component
export { MobileNavigationMenu };