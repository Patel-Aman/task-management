/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schemas/Task.schema';
import { CreateTaskDto, QueryTasksDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createNewTask(CreateTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const newTask = new this.taskModel(CreateTaskDto);
    return newTask.save();
  }

  async getAllTasks(
    queryDto: QueryTasksDto,
  ): Promise<{ tasks: TaskDocument[]; total: number }> {
    const { page = '1', limit = '10', search, status } = queryDto;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const [tasks, total] = await Promise.all([
      this.taskModel
        .find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limitNumber)
        .exec(),
      this.taskModel.countDocuments(query),
    ]);
    return { tasks, total };
  }

  async getTaskById(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException('Task Not Found');
    }
    return task;
  }

  async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto)
      .exec();
    if (!updatedTask) {
      throw new NotFoundException('Task not found!');
    }

    return updatedTask;
  }

  async deleteTask(id: string): Promise<string> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Task Not Found');
    }
    return id;
  }
}
