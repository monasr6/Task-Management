import { Injectable } from '@nestjs/common';
import { Task, TaskState } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTask } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTask: CreateTask): Task {
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

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTask(id: string): boolean {
    const task = this.getTaskById(id);
    if (!task) return false;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return true;
  }
}
