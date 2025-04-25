import { Category } from 'src/category/entities/category.entity';
import { Type } from '../../types/transaction.types';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  @IsString()
  title: string;

  @IsNumber({}, { message: 'El campo debe ser numérico' })
  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  amount: number;

  @IsEnum(Type, { message: 'Tipo no válido.' })
  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  type: Type;

  @IsNotEmpty()
  category: Category;
}
