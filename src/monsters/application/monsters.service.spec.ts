import { Test, TestingModule } from '@nestjs/testing';
import { MonstersService } from './monsters.service';
import { Monster } from '../domain/entities/monster.entity';
import { MONSTERS_REPOSITORY } from '../infrastructure/repositories/monsters.repository';

describe('MonstersService', () => {
  let service: MonstersService;
  const mockMonster = {
    _id: '65c1f3c49c1fd2219b0bee01',
    title: 'Mrs',
    firstName: 'Dragon',
    lastName: 'Silver6',
    gender: 'female',
    description: 'One big dragon',
    nationality: ['RU', 'AR'],
    image: 'https://dummyimage.com/600x400/000/fff',
    gold: 10000,
    speed: 1000,
    health: 1500,
    password: '1234NnC@',
    createdAt: '2024-02-06T08:54:28.056Z',
    updatedAt: '2024-02-06T08:54:06.969Z',
    isDeleted: false,
  } as unknown as Monster;

  const mockFunctions = {
    findAll: jest
      .fn()
      .mockResolvedValueOnce([mockMonster])
      .mockResolvedValueOnce([]),
    create: jest.fn().mockResolvedValue(mockMonster),
    findOne: jest.fn().mockResolvedValue(mockMonster),
    update: jest
      .fn()
      .mockResolvedValueOnce(mockMonster)
      .mockResolvedValueOnce(undefined),
    remove: jest.fn().mockResolvedValue('Monster removed'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MonstersService,
        {
          provide: MONSTERS_REPOSITORY,
          useFactory: () => ({
            findAll: mockFunctions.findAll,
            create: mockFunctions.create,
            findOne: mockFunctions.findOne,
            update: mockFunctions.update,
            remove: mockFunctions.remove,
          }),
        },
      ],
    }).compile();

    service = module.get<MonstersService>(MonstersService);
  });

  describe('findAll', () => {
    describe('GIVEN a list of monsters', () => {
      it('THEN should return an array with all the monsters in DB', async () => {
        const result = await service.findAll();

        expect(mockFunctions.findAll).toHaveBeenCalled();
        expect(mockFunctions.findAll).toHaveBeenCalledWith(50, 0, false);
        expect(result).toEqual([mockMonster]);
      });

      it('THEN should return an empty array if no data exists in DB', async () => {
        const result = await service.findAll();

        expect(mockFunctions.findAll).toHaveBeenCalled();
        expect(mockFunctions.findAll).toHaveBeenCalledWith(50, 0, false);
        expect(result).toEqual([]);
      });
    });
  });

  describe('Update', () => {
    describe('GIVEN monster', () => {
      it('THEN should return a monster updated', async () => {
        const result = await service.update(mockMonster._id, mockMonster);

        expect(mockFunctions.update).toHaveBeenCalled();
        expect(mockFunctions.update).toHaveBeenCalledWith(
          mockMonster._id,
          expect.objectContaining({
            firstName: mockMonster.firstName,
          }),
        );
        expect(result._id).toEqual(mockMonster._id);
        expect(result.firstName).toEqual(mockMonster.firstName);
      });

      it('THEN should return error if no monster found', async () => {
        expect(
          async () => await service.update(mockMonster._id, mockMonster),
        ).rejects.toThrow(`Monster with id ${mockMonster._id} not found`);

        expect(mockFunctions.update).toHaveBeenCalled();
      });
    });
  });
});
