import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser(email);

      const isvalidPassword = await bcrypt.compare(password, user.password);

      if (!isvalidPassword) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: User, res: Response) {
    return 'holaaaaaaaaaaaaaaaa';
  }
}
