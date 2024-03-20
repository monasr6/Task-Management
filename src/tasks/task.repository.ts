import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity'; // Double-check this import path
import { CreateTaskDto } from './dto/tasks.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // Your repository methods...
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    await task.save();
    return task;
  }
}
