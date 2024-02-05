import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { ROLES } from 'src/users/shared/users.constants';

export class RegisterDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @IsString()
  @IsIn(Object.keys(ROLES))
  role: string;

  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsStrongPassword()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
