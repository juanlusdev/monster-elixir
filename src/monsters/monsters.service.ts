import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonsterDto } from './dto/create-monster.dto';
import { UpdateMonsterDto } from './dto/update-monster.dto';
import { MONSTERS_REPOSITORY } from './repositories/monsters.repository';

@Injectable()
export class MonstersService {
  constructor(
    @Inject(MONSTERS_REPOSITORY) private readonly monstersRepository,
  ) {}

  async create(createMonsterDto: CreateMonsterDto) {
    return await this.monstersRepository.create(createMonsterDto);
  }

  async findAll(limit = 50, skip = 0) {
    return await this.monstersRepository.findAll(limit, skip);
  }

  async findOne(id: string) {
    // TODO: VALIDATE ID as mongoose.Types.ObjectID
    const monster = await this.monstersRepository.find(id);

    if (!monster) {
      throw new NotFoundException(`Monster with id ${id} not found`);
    }
    return monster;
  }

  async update(id: string, updateMonsterDto: UpdateMonsterDto) {
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
