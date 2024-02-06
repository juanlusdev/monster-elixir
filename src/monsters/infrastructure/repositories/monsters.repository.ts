import { CreateMonsterDto } from '../../domain/dto/create-monster.dto';
import { UpdateMonsterDto } from '../../domain/dto/update-monster.dto';
import { Monster } from '../../domain/entities/monster.entity';

export const MONSTERS_REPOSITORY = 'MonstersRepository';

export interface MonstersRepository<T> {
  isValidId(id: string): boolean;
  create(monster: CreateMonsterDto): Promise<Monster>;
  findAll(
    limit: number,
    skip: number,
    showDeleted: boolean,
  ): Promise<Monster[]>;
  find(id: string): Promise<Monster>;
  update(id: string, monster: UpdateMonsterDto): Promise<Monster>;
  remove(id: string): Promise<void>;
  mapToMonster(monsterDoc: T);
}
