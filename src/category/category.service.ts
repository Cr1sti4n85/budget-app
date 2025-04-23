import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const existCategory = await this.categoryRepo.findBy({
      users: { id: userId },
      title: createCategoryDto.title,
    });

    if (existCategory.length > 0) {
      throw new BadRequestException('Esa categoría ya existe.');
    }

    const newCategory = this.categoryRepo.create({
      title: createCategoryDto.title,
      users: { id: userId },
    });

    return await this.categoryRepo.save(newCategory);
  }

  async findAll(id: number) {
    return await this.categoryRepo.find({
      where: {
        users: { id },
      },
      relations: {
        transactions: true,
      },
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: {
        users: true,
        transactions: true,
      },
    });

    if (!category) {
      throw new NotFoundException('No se encontró esa categoría');
    }
    return instanceToPlain(category);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('No se encontró esa categoría');
    }

    category.title = updateCategoryDto.title!;

    await this.categoryRepo.save(category);
    return category;
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('Categoría no encontrada.');
    }

    return this.categoryRepo.remove(category);
  }
}
