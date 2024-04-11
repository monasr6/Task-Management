import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/entities/user.entity';
import { QueryFilterDto } from './dto/queryFilter.dto';

const mockUser = { id: 1, username: 'Test User' } as User;
const mockQueryFilterDto = { search: 'test' } as QueryFilterDto;

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: () => ({
            find: jest.fn().mockResolvedValue([]),
          }),
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should return an array of tasks', async () => {
    const result = await service.getAllTasks(mockQueryFilterDto, mockUser);
    expect(result).toEqual([]);
  });
});
