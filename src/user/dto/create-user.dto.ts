import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { IsEqualTo } from '../decorators/equal-to.decorator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.',
    },
  )
  password: string;

  @IsString()
  @IsEqualTo('password', {
    message: 'Las contraseñas no coinciden.',
  })
  confirmPassword: string;
}
