import { Test, TestingModule } from '@nestjs/testing';
import { CreditsService } from './credits.service';
import { Repository } from 'typeorm';
import { Credit } from './entities/credit.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('Testing CreditsService', () => {
  let service: CreditsService;
  let repository: Repository<Credit>;

  const mockCredit = { id: 1, accountId: 123 };
  const mockRepository = {
    create: jest.fn(dto => ({ id: Date.now(), ...dto })),
    save: jest.fn(credit => Promise.resolve(credit)),
    find: jest.fn(() => Promise.resolve([mockCredit])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockCredit : null)),
    merge: jest.fn((credit, dto) => Object.assign(credit, dto)),
    remove: jest.fn(credit => Promise.resolve(credit)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditsService,
        {
          provide: getRepositoryToken(Credit),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CreditsService>(CreditsService);
    repository = module.get<Repository<Credit>>(getRepositoryToken(Credit));
  });

  it('should create a credit', async () => {
    const createCreditDto = { accountId: 123 };
    const result = await service.create(createCreditDto);
    expect(result).toEqual({ id: expect.any(Number), ...createCreditDto });
    expect(repository.create).toHaveBeenCalledWith(createCreditDto);
    expect(repository.save).toHaveBeenCalledWith(result);
  });

  it('should find all credits', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockCredit]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should find a credit by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockCredit);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if credit not found by ID', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a credit by ID', async () => {
    const updateCreditDto = { accountId: 456 };
    const result = await service.update(1, updateCreditDto);
    expect(result).toEqual({ id: 1, ...updateCreditDto });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.merge).toHaveBeenCalledWith(mockCredit, updateCreditDto);
    expect(repository.save).toHaveBeenCalledWith(result);
  });

  it('should throw NotFoundException if credit to update not found', async () => {
    const updateCreditDto = { accountId: 456 };
    await expect(service.update(999, updateCreditDto)).rejects.toThrow(NotFoundException);
  });

  it('should remove a credit by ID', async () => {
    await service.remove(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.remove).toHaveBeenCalledWith(mockCredit);
  });

  it('should throw NotFoundException if credit to remove not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
