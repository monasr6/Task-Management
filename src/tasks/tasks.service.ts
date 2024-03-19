import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  ///////////////////////  Before using Repository (Database) in memory   ///////////////////////
  // private tasks: Task[] = [];
  // async getAllTasks(): Promise<Task[]> {
  //   return this.tasks;
  // }
  // async createTask(createTask: CreateTaskDto): Promise<Task> {
  //   const { title, description } = createTask;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     state: TaskState.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // async getTaskById(id: string): Promise<Task> {
  //   return this.tasks.find((task) => task.id === id);
  // }
  // async deleteTask(id: string): Promise<boolean> {
  //   const task = this.getTaskById(id);
  //   if (!task) return false;
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   return true;
  // }
  // async updateTaskState(id: string, state: TaskState): Promise<boolean> {
  //   const task = await this.getTaskById(id);
  //   if (!task) return false;
  //   task.state = state;
  //   return true;
  // }
}
