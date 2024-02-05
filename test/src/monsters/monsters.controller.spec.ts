import { Test, TestingModule } from '@nestjs/testing';
import { MonstersController } from '../../../src/monsters/infrastructure/monsters.controller';
import { MonstersService } from '../../../src/monsters/application/monsters.service';

describe('MonstersController', () => {
  let controller: MonstersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonstersController],
      providers: [MonstersService],
    }).compile();

    controller = module.get<MonstersController>(MonstersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
