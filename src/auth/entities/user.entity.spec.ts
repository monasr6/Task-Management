import { User as UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new UserEntity()).toBeDefined();
  });

  it('validatePassword should return true if password is valid', async () => {
    const user = new UserEntity();
    bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');
    user.salt = 'salt';
    user.password = 'hashedPassword';
    expect(await user.validatePassword('password')).toBe(true);
  });

  it('validatePassword should return false if password is invalid', async () => {
    const user = new UserEntity();
    bcrypt.hash = jest.fn().mockResolvedValue('invalidPassword');
    user.salt = 'salt';
    user.password = 'hashedPassword';
    expect(await user.validatePassword('password')).toBe(false);
  });
});
