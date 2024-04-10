import { IsString } from 'class-validator';
import { TaskState } from '../task-status.enum';

export class QueryFilterDto {
  @IsString()
  search: string;

  state: TaskState;
}
