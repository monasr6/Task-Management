import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(typeormConfig)],
  controllers: [],
  providers: [],
})
export class AppModule {}
