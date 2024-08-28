import { Test, TestingModule } from '@nestjs/testing';
import { SavingsAccountsService } from './savings-accounts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingsAccount } from 'src/domain/entities/savings-account.entity';
import { CreateSavingsAccountDto } from 'src/interfaces/dto/savings-accounts/create-savings-account.dto';
import { UpdateSavingsAccountDto } from 'src/interfaces/dto/savings-accounts/update-savings-account.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Testing SavingsAccountsService', () => {
  let service: SavingsAccountsService;
  let repository: Repository<SavingsAccount>;

  const mockSavingsAccount = {
    id: 1,
    accountId: 123,
    interestRate: 123,
    yieldAmount: 123,
  };

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(savingsAccount => ({
      id: Date.now(),
      ...savingsAccount,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return { id, accountId: 123, interestRate: 123, yieldAmount: 123 };
      }
      return null;
    }),
    merge: jest.fn().mockImplementation((savingsAccount, dto) => ({
      ...savingsAccount,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(savingsAccount => savingsAccount),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SavingsAccountsService,
        {
          provide: getRepositoryToken(SavingsAccount),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SavingsAccountsService>(SavingsAccountsService);
    repository = module.get<Repository<SavingsAccount>>(getRepositoryToken(SavingsAccount));
  });

  describe('create', () => {
    it('should create a savings account', async () => {
      const createSavingsAccountDto: CreateSavingsAccountDto = {
        accountId: 123,
        interestRate: 123,
        yieldAmount: 123,
      };

      const result = await service.create(createSavingsAccountDto);
      expect(result).toEqual({
        id: expect.any(Number),
        ...createSavingsAccountDto,
      });
      expect(repository.create).toHaveBeenCalledWith(createSavingsAccountDto);
      expect(repository.save).toHaveBeenCalledWith(createSavingsAccountDto);
    });

    it('should throw BadRequestException on failure', async () => {
      jest.spyOn(mockRepository, 'save').mockRejectedValueOnce(new Error('Some error'));
      const createSavingsAccountDto: CreateSavingsAccountDto = {
        accountId: 123,
        interestRate: 123,
        yieldAmount: 123,
      };

      await expect(service.create(createSavingsAccountDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all savings accounts', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a savings account by ID', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1, accountId: 123, interestRate: 123, yieldAmount: 123 });
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if savings account not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a savings account', async () => {
      const updateSavingsAccountDto: UpdateSavingsAccountDto = { accountId: 123, interestRate: 123, yieldAmount: 123 };
      const result = await service.update(1, updateSavingsAccountDto);
      expect(result).toEqual({ id: 1, ...updateSavingsAccountDto});
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if savings account to update not found', async () => {
      const updateSavingsAccountDto: UpdateSavingsAccountDto = {
        interestRate: 456,
      };

      await expect(service.update(999, updateSavingsAccountDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a savings account', async () => {
      await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith({ id: 1, accountId: 123, interestRate: 123, yieldAmount: 123 });
    });

    it('should throw NotFoundException if savings account to remove not found', async () => {
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
