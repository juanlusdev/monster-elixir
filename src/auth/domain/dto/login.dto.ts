import { Transform } from 'class-transformer';
import { IsEmail, IsStrongPassword, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @IsStrongPassword()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;
}
