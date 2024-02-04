import { Injectable } from '@nestjs/common';
import { CreateMonsterDto } from '../dto/create-monster.dto';
import { UpdateMonsterDto } from '../dto/update-monster.dto';
import { Monster, MonsterModel } from '../entities/monster.entity';
import { MonstersRepository } from './monsters.repository';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class MongoMonstersRepository implements MonstersRepository {
  constructor(
    @InjectModel(Monster.name) private readonly monsterModel: MonsterModel,
  ) {}

  isValidId(id: string): boolean {
    return isValidObjectId(id);
  }

  async create(monsterDto: CreateMonsterDto): Promise<Monster> {
    return await new this.monsterModel(monsterDto).save();
  }

  async findAll(limit: number, skip: number): Promise<Monster[]> {
    return await this.monsterModel.find({}, {}, { limit, skip });
  }

  async find(id: string): Promise<Monster> {
    return await this.monsterModel.findById(id);
  }

  async update(id: string, monsterDto: UpdateMonsterDto): Promise<Monster> {
    return await this.monsterModel.findOneAndUpdate(
      { _id: id },
      { ...monsterDto, updatedAt: new Date() },
      { new: true },
    );
  }

  async remove(id: string): Promise<void> {
    await this.monsterModel.findOneAndUpdate(
      { _id: id },
      { isDeleted: true, deletedAt: new Date() },
    );
  }
}
