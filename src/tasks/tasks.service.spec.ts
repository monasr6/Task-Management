import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/entities/user.entity';
import { QueryFilterDto } from './dto/queryFilter.dto';
import { Repository } from 'typeorm';
import { TaskState } from './task-status.enum';

const mockUser = { id: 1, username: 'Test User' } as User;
const mockQueryFilterDto = { search: 'test' } as QueryFilterDto;

describe('TasksService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useFactory: () => ({
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
            save: jest.fn().mockResolvedValue({ id: 1, title: 'Test Task' }),
          }),
        },
      ],
    }).compile();

    taskService = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should return an array of tasks', async () => {
    const result = await taskService.getAllTasks(mockQueryFilterDto, mockUser);
    expect(result).toEqual([]);
  });
  describe('getTaskById test', () => {
    it('should return a task by ID', async () => {
      const mockTask = { id: 1, title: 'Test Task' } as Task;
      taskRepository.findOne = jest.fn().mockResolvedValue(mockTask);
      const result = await taskService.getTaskById(1, mockUser);
      expect(result).toEqual(mockTask);
    });
  });
  describe('createTask test', () => {
    it('should create a task', async () => {
      const mockTask = { id: 1, title: 'Test Task' } as Task;
      taskRepository.create = jest.fn().mockReturnValue(mockTask);
      taskRepository.save = jest.fn().mockResolvedValue(mockTask);
      const res = await taskService.createTask(mockTask, mockUser);
      expect(taskService.createTask).toBeDefined();
      expect(res).toEqual(mockTask);
    });

    it('should throw an error if task is not created', async () => {
      taskRepository.create = jest.fn().mockReturnValue({} as Task);
      taskRepository.save = jest.fn().mockResolvedValue(null);
      try {
        await taskService.createTask({} as Task, mockUser);
      } catch (err) {
        expect(err.message).toEqual('Error creating task');
      }
    });
  });

  describe('deleteTask test', () => {
    it('should delete a task', async () => {
      taskRepository.findOne = jest
        .fn()
        .mockResolvedValue({ id: 1, title: 'Test Task' });
      taskRepository.delete = jest.fn().mockResolvedValue(true);
      const res = await taskService.deleteTask(1, mockUser);
      expect(res).toEqual(true);
    });

    it('should throw an error if task is not found', async () => {
      taskRepository.findOne = jest.fn().mockResolvedValue(null);
      try {
        await taskService.deleteTask(1, mockUser);
      } catch (err) {
        expect(err.message).toEqual('Task not found');
      }
    });
  });

  describe('update task test', () => {
    it('should update task', async () => {
      const save = jest.fn().mockResolvedValue(true);

      taskService.getTaskById = jest.fn().mockResolvedValue({
        state: TaskState.OPEN,
        id: 1,
        title: 'title test',
        save,
      });

      const result = await taskService.updateTaskState(
        1,
        TaskState.DONE,
        mockUser,
      );
      expect(result.state).toEqual(TaskState.DONE);
    });
  });
});
