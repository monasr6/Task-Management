import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './entities/user.entity';

/// create cutom decorator to get user
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    // console.log('data : ', data);
    // console.log(ctx);
    return request.user;
  },
);
