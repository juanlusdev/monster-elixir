import { Module } from '@nestjs/common';
import { MonstersService } from './monsters.service';
import { MonstersController } from './monsters.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Monster, MonsterSchema } from './entities/monster.entity';
import { MONSTERS_REPOSITORY } from './repositories/monsters.repository';
import { MongoMonstersRepository } from './repositories/mongo-monsters.repository';

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
