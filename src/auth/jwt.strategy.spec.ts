import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

describe('jwt.strategy', () => {
  let jwtStrategy: JwtStrategy;
  let authRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: getRepositoryToken(User),
          useFactory: () => ({
            findOne: jest.fn(),
          }),
        },
      ],
    }).compile();
    authRepository = module.get(getRepositoryToken(User));
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('validate', () => {
    it('returns the user based on JWT payload', async () => {
      authRepository.findOne.mockResolvedValue('someUser');
      const result = await jwtStrategy.validate({ username: 'Test user' });
      expect(result).toEqual('someUser');
    });

    it('should throw Unauthorizedd if user is not found', async () => {
      authRepository.findOne = jest.fn().mockResolvedValue(null);
      await expect(
        jwtStrategy.validate({ username: 'Test user' }),
      ).rejects.toThrow('Unauthorizedd');
    });
  });
});
