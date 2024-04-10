import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { User } from 'src/auth/entities/user.entity';
import { QueryFilterDto } from './dto/queryFilter.dto';

const mockUser = { id: 1, username: 'Test User' } as User;
const mockQueryFilterDto = { search: 'test' } as QueryFilterDto;

const mockTaskRepository = () => ({
  find: jest.fn(),
});

describe('TestingService', () => {
  let service: TasksService;
  let taskRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: taskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return an array of tasks', async () => {
    const result = await service.getAllTasks(mockQueryFilterDto, mockUser);
    expect(result).toEqual([]);
  });
});
