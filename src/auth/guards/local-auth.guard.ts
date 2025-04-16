import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//local is the default name, you can overwrite it in the strategy
export class LocalAuthGuard extends AuthGuard('local') {}
