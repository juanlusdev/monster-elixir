import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';
import { Monster } from '../entities/monster.entity';

export const MONSTERS_REPOSITORY = 'MonstersRepository';

export interface MonstersRepository {
  isValidId(id: string): boolean;
  create(monster: CreateMonsterDto): Promise<Monster>;
  findAll(limit: number, skip: number): Promise<Monster[]>;
  find(id: string): Promise<Monster>;
  update(id: string, monster: UpdateMonsterDto): Promise<Monster>;
  remove(id: string): Promise<void>;
}
