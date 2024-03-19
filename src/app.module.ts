import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
