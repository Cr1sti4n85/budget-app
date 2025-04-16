import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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
    const newUser = this.userRepo.create(createUserDto);
    return await this.userRepo.save(newUser);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
