import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest(_err: any, user: any, info: any) {
    if (info || !user) {
      console.log(info);
      throw new UnauthorizedException(info.message);
    }
    return user;
  }
}
