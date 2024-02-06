import { Injectable } from '@nestjs/common';
import { CreateMonsterDto } from '../../domain/dto/create-monster.dto';
import { UpdateMonsterDto } from '../../domain/dto/update-monster.dto';
import { Monster } from '../../domain/entities/monster.entity';
import { MonstersRepository } from './monsters.repository';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';
import { MonsterDocument, MonsterModel } from '../schemas/monster.schema';

@Injectable()
export class MongoMonstersRepository
  implements MonstersRepository<MonsterDocument>
{
  constructor(
    @InjectModel(Monster.name) private readonly monsterModel: MonsterModel,
  ) {}

  isValidId(id: string): boolean {
    return isValidObjectId(id);
  }

  async create(monsterDto: CreateMonsterDto): Promise<Monster> {
    const monster = await new this.monsterModel(monsterDto).save();
    return this.mapToMonster(monster);
  }

  async findAll(
    limit: number,
    skip: number,
    showDeleted: boolean,
  ): Promise<Monster[]> {
    const monsters = await this.monsterModel
      .find({ isDeleted: showDeleted }, {}, { limit, skip })
      .lean();
    return monsters.map((monster) => this.mapToMonster(monster));
  }

  async find(id: string): Promise<Monster> {
    const monster = await this.monsterModel.findById(id);
    return this.mapToMonster(monster);
  }

  async update(id: string, monsterDto: UpdateMonsterDto): Promise<Monster> {
    const monster = await this.monsterModel.findOneAndUpdate(
      { _id: id },
      { ...monsterDto, updatedAt: new Date() },
      { new: true },
    );

    return this.mapToMonster(monster);
  }

  async remove(id: string): Promise<void> {
    await this.monsterModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date() },
    );
  }

  mapToMonster(monsterDoc: MonsterDocument): Monster {
    const monster = new Monster();

    monster._id = monsterDoc._id.toString();
    monster.title = monsterDoc.title;
    monster.firstName = monsterDoc.firstName;
    monster.lastName = monsterDoc.lastName;
    monster.gender = monsterDoc.gender;
    monster.description = monsterDoc.description;
    monster.nationality = monsterDoc.nationality;
    monster.image = monsterDoc.image;
    monster.gold = monsterDoc.gold;
    monster.speed = monsterDoc.speed;
    monster.health = monsterDoc.health;
    monster.secretNotes = monsterDoc.secretNotes;
    monster.password = monsterDoc.password;
    monster.createdAt = monsterDoc.createdAt;
    monster.updatedAt = monsterDoc.updatedAt;
    monster.isDeleted = monsterDoc.isDeleted;
    monster.deletedAt = monsterDoc.deletedAt;

    return monster;
  }
}
