import { Test, TestingModule } from '@nestjs/testing';
import { SavingsAccountsService } from './savings-accounts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingsAccount } from './entities/savings-account.entity';
import { CreateSavingsAccountDto } from './dto/create-savings-account.dto';
import { UpdateSavingsAccountDto } from './dto/update-savings-account.dto';
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
    create: jest.fn(dto => ({ ...dto, id: Date.now() })),
    save: jest.fn(account => Promise.resolve(account)),
    find: jest.fn(() => Promise.resolve([mockSavingsAccount])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockSavingsAccount : null)),
    merge: jest.fn((account, dto) => Object.assign(account, dto)),
    remove: jest.fn(account => Promise.resolve(account)),
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
      expect(result).toEqual({ ...createSavingsAccountDto, id: expect.any(Number) });
      expect(mockRepository.create).toHaveBeenCalledWith(createSavingsAccountDto);
      expect(mockRepository.save).toHaveBeenCalledWith({ ...createSavingsAccountDto, id: expect.any(Number) });
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
      expect(result).toEqual([mockSavingsAccount]);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no savings accounts found', async () => {
      jest.spyOn(mockRepository, 'find').mockResolvedValueOnce([]);
      await expect(service.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    // it('should return a savings account by ID', async () => {
    //   const result = await service.findOne(1);
    //   expect(result).toEqual(mockSavingsAccount);
    //   expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    // });

    it('should throw NotFoundException if savings account not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    // it('should update a savings account', async () => {
    //   const updateSavingsAccountDto: UpdateSavingsAccountDto = {
    //     interestRate: 456,
    //   };

    //   const result = await service.update(1, updateSavingsAccountDto);
    //   expect(result).toEqual({ ...mockSavingsAccount, ...updateSavingsAccountDto });
    //   expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    //   expect(mockRepository.merge).toHaveBeenCalledWith(mockSavingsAccount, updateSavingsAccountDto);
    //   expect(mockRepository.save).toHaveBeenCalledWith({ ...mockSavingsAccount, ...updateSavingsAccountDto });
    // });

    it('should throw NotFoundException if savings account to update not found', async () => {
      const updateSavingsAccountDto: UpdateSavingsAccountDto = {
        interestRate: 456,
      };

      await expect(service.update(999, updateSavingsAccountDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    // it('should remove a savings account', async () => {
    //   await service.remove(1);
    //   expect(mockRepository.findOne).toHaveBeenCalledWith(1);
    //   expect(mockRepository.remove).toHaveBeenCalledWith(mockSavingsAccount);
    // });

    it('should throw NotFoundException if savings account to remove not found', async () => {
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
