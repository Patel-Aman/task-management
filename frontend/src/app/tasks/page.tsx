'use client';

import { Button } from '@/components/ui/button';
import { fetchTasks } from '@/lib/features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from '@/components/TaskCard';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    items: tasks,
    loading,
    error,
  } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task: Task) => task.status === status);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button
          onClick={() => router.push('/tasks/new')}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['pending', 'in-progress', 'completed'].map((status) => (
          <div key={status} className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {status.replace('-', ' ')}
            </h2>
            <div className="space-y-4">
              {getTasksByStatus(status).map((task: Task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
