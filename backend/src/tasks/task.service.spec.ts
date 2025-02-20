/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Model, Types } from 'mongoose';
import { TasksService } from './tasks.service';
import { Task, TaskDocument } from '../schemas/Task.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

describe('TaskService Sequential Operations', () => {
  let service: TasksService;
  let model: Model<TaskDocument>;
  let createdTaskId: string;

  // Mock data
  const mockTaskDto = {
    title: 'test task',
    description: 'this is a test task',
  };

  // We'll store the created task here to use in subsequent tests
  let createdTask: any;

  beforeAll(async () => {
    const mockTaskModel = jest.fn().mockImplementation((dto) => ({
      ...dto,
      _id: new Types.ObjectId(),
      save: jest.fn().mockResolvedValue({
        ...dto,
        _id: new Types.ObjectId(),
        updatedAt: new Date(),
      }),
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: Object.assign(mockTaskModel, {
            create: jest.fn().mockImplementation((dto) =>
              Promise.resolve({
                ...dto,
                _id: new Types.ObjectId(),
                updatedAt: new Date(),
              }),
            ),
            find: jest.fn().mockReturnValue({
              sort: jest.fn().mockReturnThis(),
              skip: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              exec: jest.fn().mockResolvedValue([]),
            }),
            countDocuments: jest.fn().mockResolvedValue(0),
            findById: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(null),
            }),
            findByIdAndUpdate: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(null),
            }),
            findByIdAndDelete: jest.fn().mockReturnValue({
              exec: jest.fn().mockResolvedValue(null),
            }),
          }),
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<TaskDocument>>(getModelToken(Task.name));
  });

  it('1. should be defined', () => {
    expect(service).toBeDefined();
  });

  it('2. should create a task', async () => {
    const result = await service.createNewTask(mockTaskDto);
    createdTaskId = result.id.toString();

    expect(result).toMatchObject({
      title: mockTaskDto.title,
      description: mockTaskDto.description,
    });
    expect(result.id).toBeDefined();
  });

  it('3. should get all tasks and find the created task', async () => {
    const result = await service.getAllTasks({});

    expect(result.tasks.length).toBe(1);
    expect(result.total).toBe(1);
    expect(result.tasks[0]).toMatchObject({
      title: mockTaskDto.title,
      description: mockTaskDto.description,
    });
  });

  it('4. should get the task by id', async () => {
    const result = await service.getTaskById(createdTaskId);

    expect(result).toMatchObject({
      title: mockTaskDto.title,
      description: mockTaskDto.description,
    });
  });

  it('5. should update the task', async () => {
    const updateDto = { title: 'test done' };
    const result = await service.updateTask(createdTaskId, updateDto);

    expect(result).toMatchObject({
      title: 'test done',
      description: mockTaskDto.description,
    });
  });

  it('6. should delete the task', async () => {
    const result = await service.deleteTask(createdTaskId);
    expect(result).toBeUndefined();

    // Verify the task is deleted by trying to fetch it
    const allTasks = await service.getAllTasks({});
    expect(allTasks.total).toBe(0);
    expect(allTasks.tasks.length).toBe(0);
  });
});
