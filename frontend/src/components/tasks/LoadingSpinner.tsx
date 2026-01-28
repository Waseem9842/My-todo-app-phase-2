// LoadingSpinner component
// A reusable loading spinner component for loading states

import React from 'react';

// LoadingSpinner props interface
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  label?: string;
}

// LoadingSpinner component implementation
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  label = 'Loading...'
}) => {
  // Define size classes
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
      {label && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{label}</p>
      )}
    </div>
  );
};

// Export the LoadingSpinner component
export { LoadingSpinner };