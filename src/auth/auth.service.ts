import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../types/user.types';
import { TokenPayload } from '../types/token.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.userService.getUser({ email });

      const isvalidPassword = await bcrypt.compare(password, user.password);

      if (!isvalidPassword) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Las credenciales no son válidas');
    }
  }

  async login(user: User, res: Response) {
    const expiresAccessToken = new Date();
    const expirationMs = parseInt(
      this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION_MS'),
    );

    expiresAccessToken.setTime(expiresAccessToken.getTime() + expirationMs);

    const expiresRefreshToken = new Date();
    const expirationRefreshMs = parseInt(
      this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION_MS'),
    );
    expiresRefreshToken.setTime(
      expiresRefreshToken.getTime() + expirationRefreshMs,
    );

    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: `${this.configService.getOrThrow<string>(
        'JWT_ACCESS_EXPIRATION_MS',
      )}ms`,
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: `${this.configService.getOrThrow<string>(
        'JWT_REFRESH_EXPIRATION_MS',
      )}ms`,
    });

    res
      .cookie('Authentication', accessToken, {
        httpOnly: true,
        secure:
          this.configService.getOrThrow<string>('NODE_ENV') === 'production',
        expires: expiresAccessToken,
      })
      .cookie('Refresh', refreshToken, {
        httpOnly: true,
        secure:
          this.configService.getOrThrow<string>('NODE_ENV') === 'production',
        expires: expiresRefreshToken,
        path: 'api/auth/refresh',
      });
  }
}
