import { Model, Types } from 'mongoose';
import { TasksService } from './tasks.service';
import { Task } from 'src/schemas/Task.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockTask = {
  _id: new Types.ObjectId(),
  title: 'test task',
  description: 'this is a test task',
};

const updatedTask = {
  _id: mockTask._id,
  title: 'test done',
  description: 'this is a test task',
};

const mockTaskModel = {
  create: jest.fn().mockResolvedValue(mockTask),
  find: jest.fn().mockResolvedValue([mockTask]),
  findById: jest.fn().mockResolvedValue(mockTask),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockTask),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockTask),
};

describe('TaskService', () => {
  let service: TasksService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    expect(await service.createNewTask(mockTask)).toEqual(mockTask);
  });

  it('should get all the tasks', async () => {
    expect(await service.getAllTasks({})).toEqual({
      tasks: [mockTask],
      total: 1,
    });
  });

  it('should get a task by id', async () => {
    expect(await service.getTaskById(mockTask._id.toString())).toEqual(
      mockTask,
    );
  });

  it('should update a task', async () => {
    expect(
      await service.updateTask(mockTask._id.toString(), {
        title: 'test done',
      }),
    ).toEqual(updatedTask);
  });

  it('should delete a task', async () => {
    expect(await service.deleteTask(mockTask._id.toString())).toBeUndefined();
  });
});
