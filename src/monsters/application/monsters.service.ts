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
    const monster: CreateMonsterDto & { createdAt: Date } = {
      ...createMonsterDto,
      createdAt: new Date(),
    };
    return await this.monstersRepository.create(monster);
  }

  async findAll(limit = 50, skip = 0, showDeleted = false): Promise<Monster[]> {
    return await this.monstersRepository.findAll(limit, skip, showDeleted);
  }

  async findOne(id: string): Promise<Monster> {
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
    const monster: UpdateMonsterDto & { updatedAt: Date } = {
      ...updateMonsterDto,
      updatedAt: new Date(),
    };
    const monsterUpdated = await this.monstersRepository.update(id, monster);

    if (!monsterUpdated) {
      throw new NotFoundException(`Monster with id ${id} not found`);
    }

    return monsterUpdated;
  }

  async remove(id: string) {
    const monsterRemoved = await this.monstersRepository.update(id, {
      isDeleted: true,
      deletedAt: new Date(),
    });

    if (!monsterRemoved) {
      throw new NotFoundException(`Monster with id ${id} not found`);
    }

    return 'Monster removed';
  }
}
