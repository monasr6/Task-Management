import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { typeormConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), TasksModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
