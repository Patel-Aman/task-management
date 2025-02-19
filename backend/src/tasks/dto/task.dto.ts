import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/schemas/Task.schema';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Implement User Authentication',
    description: 'The title of the task',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Add JWT authentication and user registration/login endpoints',
    description: 'Detailed description of the task',
    minLength: 5,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'Current status of the task',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class QueryTasksDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  @Transform(({ value }) => (value === '' ? undefined : value)) // Ignore empty status
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;
}
