/*
https://docs.nestjs.com/modules
*/

import { TasksController } from './tasks.controller';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Module({
  imports: [],
  controllers: [TasksController, TasksController],
  providers: [TasksService],
})
export class TasksModule {}
