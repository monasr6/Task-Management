/*
https://docs.nestjs.com/controllers#controllers
*/
import { Task, TaskState } from './tasks.model';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/tasks.dto';

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
  async createTask(@Body() createTask: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTask);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<boolean> {
    return await this.tasksService.deleteTask(id);
  }

  @Patch('/:id/state')
  async updateTask(@Param('id') id: string, @Body() state: TaskState) {
    return await this.tasksService.updateTaskState(id, state);
  }
}
