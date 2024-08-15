import { Test, TestingModule } from '@nestjs/testing';
import { CreditsService } from './credits.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Credit } from 'src/domain/entities/credit.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateCreditDto } from 'src/interfaces/dto/credits/create-credit.dto';
import { UpdateCreditDto } from 'src/interfaces/dto/credits/update-credit.dto';

describe('Testing CreditCardsService', () => {
  let service: CreditsService;
  let repository: Repository<Credit>;

  const mockCreditsRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(credit => ({
      id: Date.now(),
      ...credit,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return { id, 
                 accountId : 123 };
                }
                return null;
              }),
    merge: jest.fn().mockImplementation((credit, dto) => ({
      ...credit,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(credit => credit),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditsService,
        {
          provide: getRepositoryToken(Credit),
          useValue: mockCreditsRepository,
        },
      ],
    }).compile();

    service = module.get<CreditsService>(CreditsService);
    repository = module.get<Repository<Credit>>(getRepositoryToken(Credit));
  });

  it('should create a credit', async () => {
    const createCreditDto: CreateCreditDto = {
      accountId : 123
    };
    const result = await service.create(createCreditDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...createCreditDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createCreditDto);
    expect(repository.save).toHaveBeenCalledWith(createCreditDto);
  });

  it('should return all credits', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a specific credit by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({
      id: 1,
      accountId : 123
    });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if credit not found by ID', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a specific credit by ID', async () => {
    const updateCreditDto: UpdateCreditDto = {
      accountId : 123
    };
    const result = await service.update(1, updateCreditDto);

    const expectedResult = {
      id: 1,
      accountId : 123,
      ...updateCreditDto,
    };
  
    expect(result).toEqual(expectedResult);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
  });
  

  it('should throw NotFoundException if credit to update not found', async () => {
    const updateCreditDto: UpdateCreditDto = {
      accountId : 123
    };
    await expect(service.update(999, updateCreditDto)).rejects.toThrow(NotFoundException);
  });

  it('should delete a specific credit by ID', async () => {
    await service.remove(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.remove).toHaveBeenCalledWith({
      id: 1,
      accountId : 123
    });
  });

  it('should throw NotFoundException if credit to delete not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
