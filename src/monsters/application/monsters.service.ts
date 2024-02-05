import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonsterDto } from '../domain/dto/create-monster.dto';
import { UpdateMonsterDto } from '../domain/dto/update-monster.dto';
import { MONSTERS_REPOSITORY } from '../infrastructure/repositories/monsters.repository';
import { Monster } from '../domain/entities/monster.entity';

@Injectable()
export class MonstersService {
  constructor(
    @Inject(MONSTERS_REPOSITORY) private readonly monstersRepository,
  ) {}

  async create(createMonsterDto: CreateMonsterDto): Promise<Monster> {
    return await this.monstersRepository.create(createMonsterDto);
  }

  async findAll(limit = 50, skip = 0): Promise<Monster[]> {
    return await this.monstersRepository.findAll(limit, skip);
  }

  async findOne(id: string): Promise<Monster> {
    // TODO: VALIDATE ID as mongoose.Types.ObjectID
    const monster = await this.monstersRepository.find(id);

    if (!monster) {
      throw new NotFoundException(`Monster with id ${id} not found`);
    }
    return monster;
  }

  async update(
    id: string,
    updateMonsterDto: UpdateMonsterDto,
  ): Promise<Monster> {
    const monsterUpdated = await this.monstersRepository.update(
      id,
      updateMonsterDto,
    );

    if (!monsterUpdated) {
      throw new NotFoundException(`Monster with id ${id} not found`);
    }

    return monsterUpdated;
  }

  remove(id: string) {
    return `This action removes a #${id} monster`;
  }
}
