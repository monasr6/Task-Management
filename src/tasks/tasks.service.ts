import { CreateTaskDto } from './dto/tasks.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
// import { TaskRepository } from './task.repository';
import { EntityManager, Repository } from 'typeorm';
import { TaskState } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly entityManager: EntityManager,
  ) {}

  async getAllTasks() {
    return await this.entityManager.find({ type: Task, name: 'Task' });
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new Error('Task not found');
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.state = TaskState.OPEN;
    await this.taskRepository.save(task);
    return task;
  }
}
