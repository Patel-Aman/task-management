import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, QueryTasksDto, UpdateTaskDto } from './dto/task.dto';
import { Task, TaskStatus } from 'src/schemas/Task.schema';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
    type: CreateTaskDto,
  })
  createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createNewTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
  })
  @ApiResponse({
    status: 200,
    description: 'Return all tasks with pagination',
    type: [Task],
  })
  getAllTasks(
    @Query(ValidationPipe) query: QueryTasksDto,
  ): Promise<{ tasks: Task[]; total: number }> {
    return this.tasksService.getAllTasks(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Return the task',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
