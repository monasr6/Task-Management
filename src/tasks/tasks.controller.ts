/*
https://docs.nestjs.com/controllers#controllers
*/
import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(@GetUser() user: User): Promise<Task[]> {
    return await this.tasksService.getAllTasks(user);
  }

  @Get('/:id')
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.getTaskById(id, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto, user);
  }
  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<boolean> {
    return await this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/state')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() state: TaskState,
    @GetUser() user: User,
  ) {
    return await this.tasksService.updateTaskState(id, state, user);
  }
}
