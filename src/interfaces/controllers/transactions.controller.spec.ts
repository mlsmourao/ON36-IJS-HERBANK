import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from 'src/application/services/transactions.service';
import { CreateTransactionDto } from 'src/interfaces/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/interfaces/dto/update-transaction.dto';
import { NotFoundException } from '@nestjs/common';

describe('Testing TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  const mockTransaction = {
    id: '1',
    type: 'TED',
    amount: 1223,
    date: '1997-03-07',
    status: 'Complete',
  };

  const mockService = {
    create: jest.fn(dto => Promise.resolve({ ...dto, id: '1' })),
    findAll: jest.fn(() => Promise.resolve([mockTransaction])),
    findOne: jest.fn(id => Promise.resolve(id === '1' ? mockTransaction : null)),
    update: jest.fn((id, dto) => Promise.resolve(id === '1' ? { ...mockTransaction, ...dto } : null)),
    remove: jest.fn(id => Promise.resolve(id === '1' ? mockTransaction : null)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  describe('create', () => {
    it('should create a transaction', async () => {
      const createTransactionDto: CreateTransactionDto = {
        type: 'TED',
        amount: 1223,
        date: '1997-03-07',
        status: 'Complete',
      };

      const result = await controller.create(createTransactionDto);
      expect(result).toEqual({ ...createTransactionDto, id: '1' });
      expect(mockService.create).toHaveBeenCalledWith(createTransactionDto);
    });
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockTransaction]);
      expect(mockService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a transaction by ID', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual(mockTransaction);
      expect(mockService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if transaction not found', async () => {
      jest.spyOn(mockService, 'findOne').mockResolvedValueOnce(null);
      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a transaction', async () => {
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'Pending',
      };

      const result = await controller.update('1', updateTransactionDto);
      expect(result).toEqual({ ...mockTransaction, ...updateTransactionDto });
      expect(mockService.update).toHaveBeenCalledWith('1', updateTransactionDto);
    });

    it('should throw NotFoundException if transaction to update not found', async () => {
      jest.spyOn(mockService, 'update').mockResolvedValueOnce(null);
      await expect(controller.update('999', { status: 'Pending' })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a transaction', async () => {
      await controller.remove('1');
      expect(mockService.remove).toHaveBeenCalledWith('1');
    });

    it('should throw NotFoundException if transaction to remove not found', async () => {
      jest.spyOn(mockService, 'remove').mockResolvedValueOnce(null);
      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
