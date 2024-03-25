import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { typeormConfig } from './config/typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
