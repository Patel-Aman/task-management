import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task, TaskStatus } from '../schemas/Task.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { QueryTasksDto, UpdateTaskDto } from './dto/task.dto';

describe('TasksService', () => {
  let tasksService: TasksService;
  let model: Model<Task>;

  const mockTask = {
    id: '61c0ccf11d7bf83d153d7c06',
    title: 'Test Task',
    description: 'Task Description',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTasksService = {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
    countDocuments: jest.fn(),
    find: jest.fn(),
    sort: jest.fn(),
    skip: jest.fn(),
    limit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTasksService,
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  describe('getAllTasks', () => {
    it('should return tasks and total count', async () => {
      const queryDto: QueryTasksDto = {
        page: '1',
        limit: '10',
        search: 'test',
        status: TaskStatus.PENDING,
      };

      const mockTasks = [mockTask];
      const mockTotal = 1;

      mockTasksService.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockTasks),
            }),
          }),
        }),
      });

      mockTasksService.countDocuments.mockResolvedValue(mockTotal);

      const result = await tasksService.getAllTasks(queryDto);

      expect(result).toEqual({
        tasks: mockTasks,
        total: mockTotal,
      });

      expect(mockTasksService.find).toHaveBeenCalledWith({
        $or: [
          { title: { $regex: 'test', $options: 'i' } },
          { description: { $regex: 'test', $options: 'i' } },
        ],
        status: TaskStatus.PENDING,
      });
    });

    it('should return tasks without search and status filters', async () => {
      const queryDto: QueryTasksDto = {
        page: '1',
        limit: '10',
      };

      const mockTasks = [mockTask];
      const mockTotal = 1;

      mockTasksService.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(mockTasks),
            }),
          }),
        }),
      });

      mockTasksService.countDocuments.mockResolvedValue(mockTotal);

      const result = await tasksService.getAllTasks(queryDto);

      expect(result).toEqual({
        tasks: mockTasks,
        total: mockTotal,
      });

      expect(mockTasksService.find).toHaveBeenCalledWith({});
    });
  });

  describe('getTaskById', () => {
    it('should find and return a task by ID', async () => {
      mockTasksService.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTask),
      });

      const result = await tasksService.getTaskById(mockTask.id);

      expect(mockTasksService.findById).toHaveBeenCalledWith(mockTask.id);
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task is not found', async () => {
      mockTasksService.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(tasksService.getTaskById(mockTask.id)).rejects.toThrow(
        NotFoundException,
      );

      expect(mockTasksService.findById).toHaveBeenCalledWith(mockTask.id);
    });
  });

  describe('updateTask', () => {
    it('should update and return a task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Task',
        status: TaskStatus.IN_PROGRESS,
      };

      const updatedTask = { ...mockTask, ...updateTaskDto };

      mockTasksService.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedTask),
      });

      const result = await tasksService.updateTask(mockTask.id, updateTaskDto);

      expect(mockTasksService.findByIdAndUpdate).toHaveBeenCalledWith(
        mockTask.id,
        updateTaskDto,
      );
      expect(result).toEqual(updatedTask);
    });

    it('should throw NotFoundException if task to update is not found', async () => {
      mockTasksService.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        tasksService.updateTask(mockTask.id, {
          status: TaskStatus.COMPLETED,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteTask', () => {
    it('should delete and return task id', async () => {
      mockTasksService.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTask),
      });

      const result = await tasksService.deleteTask(mockTask.id);

      expect(mockTasksService.findByIdAndDelete).toHaveBeenCalledWith(
        mockTask.id,
      );
      expect(result).toEqual(mockTask.id);
    });

    it('should throw NotFoundException if task to delete is not found', async () => {
      mockTasksService.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(tasksService.deleteTask(mockTask.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
