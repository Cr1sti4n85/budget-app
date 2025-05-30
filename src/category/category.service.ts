import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    userId: number,
  ) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('No se encontró esa categoría');
    }

    const existCategory = await this.categoryRepo.findOne({
      where: {
        title: updateCategoryDto.title,
        users: { id: userId },
      },
    });

    if (existCategory) {
      throw new BadRequestException('Esa categoría ya existe.');
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

    try {
      return await this.categoryRepo.remove(category);
    } catch (error) {
      if (error.code === '23503') {
        throw new BadRequestException(
          'No se puede eliminar la categoría porque tiene transacciones asociadas.',
        );
      }
      throw new InternalServerErrorException('Error al eliminar la categoría.');
    }
  }
}
