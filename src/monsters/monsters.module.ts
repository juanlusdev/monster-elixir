import { Module } from '@nestjs/common';
import { MonstersService } from './application/monsters.service';
import { MonstersController } from './infrastructure/monsters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Monster } from './domain/entities/monster.entity';
import { MONSTERS_REPOSITORY } from './infrastructure/repositories/monsters.repository';
import { MongoMonstersRepository } from './infrastructure/repositories/mongo-monsters.repository';
import { MonsterSchema } from './infrastructure/schemas/monster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Monster.name, schema: MonsterSchema }]),
  ],
  controllers: [MonstersController],
  providers: [
    MonstersService,
    {
      provide: MONSTERS_REPOSITORY,
      useClass: MongoMonstersRepository,
    },
  ],
})
export class MonstersModule {}
