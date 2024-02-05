import { IsIn, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ROLES } from '../../shared/users.constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsIn(Object.keys(ROLES))
  role: string;

  @IsStrongPassword()
  password: string;
}
