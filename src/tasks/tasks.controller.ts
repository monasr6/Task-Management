/*
https://docs.nestjs.com/controllers#controllers
*/
import { CreateTaskDto } from './dto/tasks.dto';
import { TaskState } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return await this.tasksService.getAllTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }
  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return await this.tasksService.deleteTask(id);
  }

  @Patch('/:id/state')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() state: TaskState,
  ) {
    return await this.tasksService.updateTaskState(id, state);
  }
}
