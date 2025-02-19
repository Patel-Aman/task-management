/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;
export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

// timestamp adds updatedAt and createdAt automatically
@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class Task {
  @ApiProperty({
    example: 'Implement User Authentication',
    description: 'The title of the task',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Add JWT authentication and user registration/login endpoints',
    description: 'Detailed description of the task',
  })
  @Prop()
  description?: string;

  @ApiProperty({
    enum: TaskStatus,
    example: TaskStatus.PENDING,
    description: 'Current status of the task',
  })
  @Prop({
    required: true,
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
