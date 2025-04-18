import { Category } from 'src/category/entities/category.entity';
import { Type } from '../../types/transaction.types';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(Type, { message: 'Tipo no válido.' })
  @IsNotEmpty()
  type: Type;

  @IsNotEmpty()
  category: Category;
}
