import { CreateTaskDto } from './dto/tasks.dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskState } from './task-status.enum';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private logger = new Logger('TasksService'),
  ) {}

  async getAllTasks(user: User): Promise<Task[]> {
    return await this.taskRepository.find({ where: { user } });
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new UnauthorizedException('Task not found');
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.state = TaskState.OPEN;
    task.user = user;
    await task.save();
    task.user = undefined;
    return task;
  }
  async deleteTask(id: number, user: User): Promise<boolean> {
    const task = await this.getTaskById(id, user);
    if (!task) throw new UnauthorizedException('Task not found');
    try {
      const result = await task.remove();
      return result ? true : false;
    } catch (err) {
      this.logger.error('Error deleting task', err.stack);
      return false;
    }
  }

  async updateTaskState(id: number, state: TaskState, user: User) {
    const task = await this.getTaskById(id, user);
    task.state = state;
    try {
      await task.save();
    } catch (err) {
      this.logger.error('Error updating task state', err.stack);
    }
    return task;
  }
}
