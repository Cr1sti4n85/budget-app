import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'El campo no puede estar vacío' })
  title: string;
}
