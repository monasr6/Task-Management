import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signup(createAuthDto: CreateAuthDto): Promise<User> {
    const { username, password } = createAuthDto;

    const salt: string = await bcrypt.genSalt();
    const user: User = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      await this.authRepository.save(user);

      delete user.salt;
      delete user.password;
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signin(createAuthDto: CreateAuthDto): Promise<{ accessToken: string }> {
    const { username, password } = createAuthDto;
    const user: User | undefined = await this.authRepository.findOne({
      where: { username },
    });
    if (user && (await user.validatePassword(password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new Error('Invalid credentials');
    }
  }

  findAll(): Promise<User[]> {
    return this.authRepository.find();
  }

  updatePhoto() {}
}
