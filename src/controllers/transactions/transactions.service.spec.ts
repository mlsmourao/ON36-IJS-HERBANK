import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transaction.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { NotFoundException } from '@nestjs/common';

describe('Testing TransactionsService', () => {
  let service: TransactionsService;
  let repository: Repository<Transactions>;

  const mockTransaction = {
    id: '1',
    type: 'TED',
    amount: 1223,
    date: '1997-03-07',
    status: 'Complete',
  };

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(transactions => ({
      id: Date.now(),
      ...transactions,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === '1') {
        return {  id, 
                  type: 'TED',
                  amount: 1223,
                  date: '1997-03-07',
                  status: 'Complete' };
                }
                return null;
              }),
    merge: jest.fn().mockImplementation((loan, dto) => ({
      ...loan,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(transactions => transactions),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(Transactions),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
    repository = module.get<Repository<Transactions>>(getRepositoryToken(Transactions));
  });

  describe('create', () => {
    it('should create a transaction', async () => {
      const createTransactionDto: CreateTransactionDto = {
        type: 'TED',
        amount: 1223,
        date: '1997-03-07',
        status: 'Complete',
      };

      const result = await service.create(createTransactionDto);
      expect(result).toEqual({
        id: expect.any(Number),
        ...createTransactionDto,
      });
      expect(repository.create).toHaveBeenCalledWith(createTransactionDto);
      expect(repository.save).toHaveBeenCalledWith(createTransactionDto);
    });
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
      const result = await service.findAll();
      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a transaction by ID', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual({
        id: '1',
        type: 'TED',
        amount: 1223,
        date: '1997-03-07',
        status: 'Complete'
      });
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

  });

  describe('update', () => {
    it('should update a transaction', async () => {
      const updateLoanDto: UpdateTransactionDto = {
        type: 'TED',
        amount: 123,
        date: '1997-03-07',
        status: 'Complete'
      };
      const result = await service.update('1', updateLoanDto);
  
      const expectedResult = {
        id: '1',
        type: 'TED',
        amount: 1223,
        date: '1997-03-07',
        status: 'Complete'
      }
      expect(result).toEqual(expectedResult);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(repository.save).toHaveBeenCalled();
    });

  });

  describe('remove', () => {
    it('should remove a transaction', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockTransaction);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockTransaction);
    });

  });
});
