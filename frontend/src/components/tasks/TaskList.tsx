// TaskList component
// Displays a list of tasks for the authenticated user with responsive layout

import React from 'react';
import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';

// TaskList props interface
interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
  onTaskToggleCompletion?: (taskId: number, completed: boolean) => void;
}

// TaskList component implementation
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading = false,
  error,
  onTaskUpdate,
  onTaskDelete,
  onTaskToggleCompletion
}) => {
  // Render loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // Render empty state
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating a new task.
        </p>
      </div>
    );
  }

  // Render task list with responsive grid
  return (
    <div className="space-y-4">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <li key={task.id} className="col-span-1">
            <TaskCard
              task={task}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
              onTaskToggleCompletion={onTaskToggleCompletion}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Export the TaskList component
export { TaskList };