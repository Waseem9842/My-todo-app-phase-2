// TaskForm component
// Provides a form for creating and updating tasks

import React, { useState } from 'react';
import { Task, TaskCreate, TaskUpdate } from '@/types/task';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

// TaskForm props interface
interface TaskFormProps {
  task?: Task | null; // If provided, the form is for editing
  onSubmit: (taskData: TaskCreate | TaskUpdate) => void;
  onCancel?: () => void;
  loading?: boolean;
  error?: string | null;
}

// TaskForm component implementation
const TaskForm: React.FC<TaskFormProps> = ({
  task = null,
  onSubmit,
  onCancel,
  loading = false,
  error
}) => {
  // Initialize form state based on whether we're creating or editing
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [completed, setCompleted] = useState(task?.completed || false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare task data based on whether we're creating or updating
    const taskData = task
      ? {
          title: title || task.title,
          description: description || task.description,
          completed: completed
        } as TaskUpdate
      : {
          title,
          description,
          completed
        } as TaskCreate;

    onSubmit(taskData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {task ? 'Edit Task' : 'Create New Task'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              minLength={1}
              maxLength={255}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
              maxLength={1000}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="completed" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Mark as completed
            </label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={loading || !title.trim()}
            >
              {loading
                ? (task ? 'Updating...' : 'Creating...')
                : (task ? 'Update Task' : 'Create Task')}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
};

// Export the TaskForm component
export { TaskForm };