import { TaskState } from '../task-status.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export interface UpdateTaskDto {
  id: string;
  state: TaskState;
}
