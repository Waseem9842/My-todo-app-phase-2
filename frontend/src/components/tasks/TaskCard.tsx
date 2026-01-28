// TaskCard component
// Displays a single task with options to edit, delete, and toggle completion

import React, { useState } from 'react';
import { Task } from '@/types/task';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// TaskCard props interface
interface TaskCardProps {
  task: Task;
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
  onTaskToggleCompletion?: (taskId: number, completed: boolean) => void;
}

// TaskCard component implementation
const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onTaskUpdate,
  onTaskDelete,
  onTaskToggleCompletion
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editCompleted, setEditCompleted] = useState(task.completed);

  // Handle completion toggle
  const handleToggleCompletion = () => {
    if (onTaskToggleCompletion) {
      onTaskToggleCompletion(task.id, !task.completed);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (onTaskDelete) {
      onTaskDelete(task.id);
    }
  };

  // Handle edit
  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditCompleted(task.completed);
  };

  // Handle save
  const handleSave = () => {
    if (onTaskUpdate) {
      const updatedTask = {
        ...task,
        title: editTitle,
        description: editDescription,
        completed: editCompleted
      };
      onTaskUpdate(updatedTask);
    }
    setIsEditing(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditCompleted(task.completed);
    setIsEditing(false);
  };

  return (
    <Card className={`transition-all duration-200 ${task.completed ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggleCompletion}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-lg font-medium text-gray-900 dark:text-white border border-gray-300 rounded-md px-2 py-1"
                  maxLength={255}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full text-sm text-gray-500 dark:text-gray-400 border border-gray-300 rounded-md px-2 py-1"
                  rows={3}
                  maxLength={1000}
                  placeholder="Add description..."
                />
                <div className="mt-2 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="default" size="sm" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {task.description}
                  </p>
                )}
                <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>Updated: {new Date(task.updated_at).toLocaleDateString()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
        {!isEditing && (
          <>
            <Button
              variant={task.completed ? "secondary" : "outline"}
              size="sm"
              onClick={handleToggleCompletion}
            >
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

// Export the TaskCard component
export { TaskCard };