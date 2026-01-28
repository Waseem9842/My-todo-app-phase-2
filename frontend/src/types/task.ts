// Task-related TypeScript types

// Task interface
export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  owner_id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Task creation interface
export interface TaskCreate {
  title: string;
  description?: string;
  completed?: boolean;
}

// Task update interface
export interface TaskUpdate {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Task API response interface
export interface TaskApiResponse {
  success: boolean;
  data?: Task | Task[];
  error?: string;
  statusCode?: number;
}

// Task state interface
export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  currentTask: Task | null;
}

// Task filter options
export interface TaskFilters {
  completed?: boolean;
  searchTerm?: string;
  sortBy?: 'created_at' | 'updated_at' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Task entity type definition for frontend
export type TaskEntity = Task;