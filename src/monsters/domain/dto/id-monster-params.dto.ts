import { Inject } from '@nestjs/common';
import { Validate } from 'class-validator';
import { MONSTERS_REPOSITORY } from '../../infrastructure/repositories/monsters.repository';


/*
export class idMonsterParamsDto {
  constructor(
    @Inject(MONSTERS_REPOSITORY) private readonly monstersRepository,
  ) {}
  @Validate((value: string) => this.monstersRepository.isValidId(value))
  id: string;
}
*/