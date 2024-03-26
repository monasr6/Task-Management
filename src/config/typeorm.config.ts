import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'example',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
