import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) createAuthDto: CreateAuthDto): Promise<User> {
    return this.authService.signup(createAuthDto);
  }

  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) createAuthDto: CreateAuthDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signin(createAuthDto);
  }

  @Post('updatePhoto')
  @UseGuards(AuthGuard)
  updatePhoto() {
    this.authService.updatePhoto();
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
