import { Task } from './tasks.model';
import { TasksService } from './tasks.service';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTask } from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return await this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTask: CreateTask): Promise<Task> {
    return await this.tasksService.createTask(createTask);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<boolean> {
    return await this.tasksService.deleteTask(id);
  }
}
