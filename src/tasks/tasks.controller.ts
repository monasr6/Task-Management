/*
https://docs.nestjs.com/controllers#controllers
*/
import { TasksService } from './tasks.service';
import { Controller } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // async getAllTasks() {
  //   return await this.tasksService.getAllTasks();
  // }

  // @Get('/:id')
  // async getTaskById(@Param('id') id: string) {
  //   return await this.tasksService.getTaskById(id);
  // }

  // @Post()
  // async createTask(@Body() createTask: CreateTaskDto) {
  //   return await this.tasksService.createTask(createTask);
  // }

  // @Delete('/:id')
  // async deleteTask(@Param('id') id: string): Promise<boolean> {
  //   return await this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/state')
  // async updateTask(@Param('id') id: string, @Body() state: TaskState) {
  //   return await this.tasksService.updateTaskState(id, state);
  // }
}
