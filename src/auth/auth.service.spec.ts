import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';

describe('YourService', () => {
  const mockUser = { username: 'Test User' } as User;

  let authService: AuthService;
  let authRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtStrategy,
        {
          provide: getRepositoryToken(User),
          useFactory: () => ({
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              username: 'Test User',
              validatePassword: jest.fn().mockResolvedValue(true),
            }),
          }),
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mocked_token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authService.hashPassword = jest.fn().mockResolvedValue('hashed_password');
    authRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signup test', () => {
    it('should create a user', async () => {
      authRepository.save = jest.fn().mockResolvedValue(mockUser);

      const res = await authService.signup(mockUser);
      expect(authService.signup).toBeDefined();
      expect(res).toEqual(mockUser);
    });

    it('should throw an error if user is not created', async () => {
      // authRepository.create = jest.fn().mockReturnValue({} as User);
      authRepository.save = jest.fn().mockRejectedValue(new Error());
      await expect(authService.signup({} as User)).rejects.toThrow();
    });
  });

  describe('signin test', () => {
    it('should return a token', async () => {
      const token = await authService.signin(mockUser);
      expect(token).toHaveProperty('accessToken');
    });

    it('should throw an error if user is not found', async () => {
      authRepository.findOne = jest.fn().mockResolvedValue(null);
      await expect(authService.signin(mockUser)).rejects.toThrow();
    });

    it('should throw an error if password is invalid', async () => {
      authRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      mockUser.validatePassword = jest.fn().mockResolvedValue(false);
      await expect(authService.signin(mockUser)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('findAll test', () => {
    it('should return an array of users', async () => {
      authRepository.find = jest.fn().mockResolvedValue([mockUser]);
      const res = await authService.findAll();
      expect(res).toEqual([mockUser]);
    });
  });

  describe('hashPassword test', () => {
    it('should return a hashed password', async () => {
      const res = await authService.hashPassword('password', 'salt');
      expect(res).toEqual('hashed_password');
    });
  });
});
