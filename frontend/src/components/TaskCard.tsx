import { deleteTask, updateTask } from '@/lib/features/task/taskSlice';
import { useAppDispatch } from '@/lib/hooks';
import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { Edit2, Trash2 } from 'lucide-react';

interface TaskUI {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export const TaskCard = ({ task }: { task: TaskUI }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleStatusChange = async (newStatus: string) => {
    await dispatch(
      updateTask({
        id: task.id,
        task: { status: newStatus as Task['status'] },
      })
    );
  };

  const handleEdit = () => {
    router.push(`/tasks/edit/${task.id}`);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await dispatch(deleteTask(task.id));
    }
  };

  return (
    <Card className="w-full mb-4 hover:shadow-lg transition-shadow">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{task.title}</h3>
        </div>
        <div className="flex items-center gap-4">
          <Select value={task.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" onClick={handleEdit}>
            <Edit2 className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
