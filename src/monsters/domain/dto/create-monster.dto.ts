import { Transform } from 'class-transformer';
import {
    IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsStrongPassword,
  Min,
} from 'class-validator';
import { GENDERS } from '../../shared/monsters.constants';

export class CreateMonsterDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsIn(Object.keys(GENDERS))
  gender: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => value.split(','))
  nationality: string[];

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNumberString()
  @Min(0)
  gold: number;

  @IsNumberString()
  @Min(0)
  speed: number;

  @IsNumberString()
  @Min(0)
  health: number;

  secretNotes: string;

  @IsStrongPassword()
  password: string;
}
