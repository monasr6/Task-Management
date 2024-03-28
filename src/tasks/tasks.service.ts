import { CreateTaskDto } from './dto/tasks.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const result = await task.remove();
    return result ? true : false;
  }

  async updateTaskState(id: number, state: TaskState, user: User) {
    const task = await this.getTaskById(id, user);
    task.state = state;
    await task.save();
    return task;
  }
}
