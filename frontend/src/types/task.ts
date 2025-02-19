export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskState {
  items: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
  total: number;
}
