import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { typeormConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
// import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    TasksModule,
    AuthModule,
    // ConfigModule.forRoot({
    //   envFilePath: 'dev.env',
    //   isGlobal: true,
    // }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
