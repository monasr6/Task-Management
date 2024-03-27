import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class userReository extends Repository<User> {
  async signup(createAuthDto: CreateAuthDto): Promise<void> {
    const { username, password } = createAuthDto;
    const auth = new User();
    auth.username = username;
    auth.password = password;

    try {
      this.save(auth);
    } catch (err) {
      throw new Error(err);
    }
  }
}
