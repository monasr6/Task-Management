import { Injectable } from '@nestjs/common';
import { Task, TaskState } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  async getAllTasks(): Promise<Task[]> {
    return this.tasks;
  }

  async createTask(createTask: CreateTaskDto): Promise<Task> {
    const { title, description } = createTask;
    const task: Task = {
      id: uuid(),
      title,
      description,
      state: TaskState.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  async getTaskById(id: string): Promise<Task> {
    return this.tasks.find((task) => task.id === id);
  }

  async deleteTask(id: string): Promise<boolean> {
    const task = this.getTaskById(id);
    if (!task) return false;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }

  async updateTaskState(id: string, state: TaskState): Promise<boolean> {
    const task = await this.getTaskById(id);
    if (!task) return false;
    task.state = state;
    return true;
  }
}
