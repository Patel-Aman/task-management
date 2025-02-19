'use client';

import { useEffect } from 'react';
import { TaskForm } from '@/components/TaskForm';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTaskById, fetchTasks } from '@/lib/features/task/taskSlice';
import { useParams } from 'next/navigation';

export default function EditTaskPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    selectedTask: task,
    loading,
    error,
  } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (id && !task) {
      dispatch(fetchTaskById(id as string));
    }
  }, [id, task, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!task) return <div>Task not found</div>;

  return <TaskForm task={task} isEditing />;
}
