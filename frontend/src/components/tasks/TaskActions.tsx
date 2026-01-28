// TaskActions component
// Provides reusable action buttons for task operations (edit, delete, toggle completion)

import React from 'react';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/Button';

// TaskActions props interface
interface TaskActionsProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: number) => void;
  onToggleCompletion?: (taskId: number, completed: boolean) => void;
  loading?: boolean;
}

// TaskActions component implementation
const TaskActions: React.FC<TaskActionsProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleCompletion,
  loading = false
}) => {
  // Handle edit action
  const handleEdit = () => {
    if (onEdit) {
      onEdit(task);
    }
  };

  // Handle delete action
  const handleDelete = () => {
    if (onDelete) {
      onDelete(task.id);
    }
  };

  // Handle toggle completion
  const handleToggleCompletion = () => {
    if (onToggleCompletion) {
      onToggleCompletion(task.id, !task.completed);
    }
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggleCompletion}
        disabled={loading}
      >
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleEdit}
        disabled={loading}
      >
        Edit
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleDelete}
        disabled={loading}
      >
        Delete
      </Button>
    </div>
  );
};

// Export the TaskActions component
export { TaskActions };