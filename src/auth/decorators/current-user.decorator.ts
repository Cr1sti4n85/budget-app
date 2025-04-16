import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// This decorator extracts the current user from the request object.
//which was set by the local strategy validate method
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().user,
);
