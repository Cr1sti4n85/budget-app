import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepo.findOneBy({
      email: createUserDto.email,
    });
    if (existUser) {
      throw new BadRequestException('Este correo ya existe.');
    }
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
    return await this.userRepo.save(newUser);
  }

  async getUser(query: Record<string, unknown>) {
    const user = await this.userRepo.findOne({ where: query });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
