import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthRequest } from '../AuthUser';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<AuthRequest>();
    return request.user;
  },
);
