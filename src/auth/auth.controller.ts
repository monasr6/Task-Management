import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
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
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  updatePhoto(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<string> {
    return this.authService.updatePhoto(user, file);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
