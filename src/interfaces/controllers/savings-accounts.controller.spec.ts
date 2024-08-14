import { Test, TestingModule } from '@nestjs/testing';
import { SavingsAccountsController } from './savings-accounts.controller';
import { SavingsAccountsService } from 'src/application/services/savings-accounts.service';
import { CreateSavingsAccountDto } from 'src/interfaces/dto/create-savings-account.dto';
import { UpdateSavingsAccountDto } from 'src/interfaces/dto/update-savings-account.dto';
import { NotFoundException } from '@nestjs/common';

describe('Testing SavingsAccountsController', () => {
  let controller: SavingsAccountsController;
  let service: SavingsAccountsService;

  const mockSavingsAccount = {
    id: 1,
    accountId: 123,
    interestRate: 123,
    yieldAmount: 123,
  };

  const mockService = {
    create: jest.fn(dto => Promise.resolve({ ...dto, id: Date.now() })),
    findAll: jest.fn(() => Promise.resolve([mockSavingsAccount])),
    findOne: jest.fn(id => Promise.resolve(id === 1 ? mockSavingsAccount : null)),
    update: jest.fn((id, dto) => Promise.resolve(id === 1 ? { ...mockSavingsAccount, ...dto } : null)),
    remove: jest.fn(id => Promise.resolve(id === 1 ? mockSavingsAccount : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingsAccountsController],
      providers: [
        {
          provide: SavingsAccountsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<SavingsAccountsController>(SavingsAccountsController);
    service = module.get<SavingsAccountsService>(SavingsAccountsService);
  });

  describe('create', () => {
    it('should create a savings account', async () => {
      const createSavingsAccountDto: CreateSavingsAccountDto = {
        accountId: 123,
        interestRate: 123,
        yieldAmount: 123,
      };

      const result = await controller.create(createSavingsAccountDto);
      expect(result).toEqual({ ...createSavingsAccountDto, id: expect.any(Number) });
      expect(mockService.create).toHaveBeenCalledWith(createSavingsAccountDto);
    });

  });

  describe('findAll', () => {
    it('should return all savings accounts', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockSavingsAccount]);
      expect(mockService.findAll).toHaveBeenCalled();
    });

    it('should throw NotFoundException if checking account not found', async () => {
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOne', () => {
    it('should return a savings account by ID', async () => {
      const result = await controller.findOne(1);
      expect(result).toEqual(mockSavingsAccount);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if savings account not found', async () => {
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a savings account', async () => {
      const updateSavingsAccountDto: UpdateSavingsAccountDto = {
        interestRate: 456,
      };

      const result = await controller.update(1, updateSavingsAccountDto);
      expect(result).toEqual({ ...mockSavingsAccount, ...updateSavingsAccountDto });
      expect(mockService.update).toHaveBeenCalledWith(1, updateSavingsAccountDto);
    });

    it('should throw NotFoundException if savings account to update not found', async () => {
      const updateSavingsAccountDto: UpdateSavingsAccountDto = {
        interestRate: 456,
      };

      await expect(controller.update(999, updateSavingsAccountDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a savings account', async () => {
      await controller.remove(1);
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if savings account to remove not found', async () => {
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
