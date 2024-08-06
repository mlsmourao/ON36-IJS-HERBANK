import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transaction.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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
    create: jest.fn(dto => ({
      ...dto,
      id: '1',
    })),
    save: jest.fn(transaction => Promise.resolve(transaction)),
    find: jest.fn(() => Promise.resolve([mockTransaction])),
    findOneBy: jest.fn(id => Promise.resolve(id === '1' ? mockTransaction : null)),
    merge: jest.fn(),
    remove: jest.fn(transaction => Promise.resolve(transaction)),
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
      expect(result).toEqual({ ...createTransactionDto, id: '1' });
      expect(mockRepository.create).toHaveBeenCalledWith(createTransactionDto);
      expect(mockRepository.save).toHaveBeenCalledWith({ ...createTransactionDto, id: '1' });
    });
  });

  describe('findAll', () => {
    it('should return all transactions', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockTransaction]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a transaction by ID', async () => {
      const result = await service.findOne('1');
      expect(result).toEqual(mockTransaction);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
    });

    it('should return null if transaction not found', async () => {
      const result = await service.findOne('999');
      expect(result).toBeNull();
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '999' });
    });
  });

  describe('update', () => {
    it('should update a transaction', async () => {
      const updateTransactionDto: UpdateTransactionDto = {
        status: 'Pending',
      };

      const result = await service.update('1', updateTransactionDto);
      expect(result).toEqual({ ...mockTransaction, ...updateTransactionDto });
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(mockRepository.merge).toHaveBeenCalledWith(mockTransaction, updateTransactionDto);
      expect(mockRepository.save).toHaveBeenCalledWith({ ...mockTransaction, ...updateTransactionDto });
    });

    it('should return null if transaction to update not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValueOnce(null);
      const result = await service.update('999', { status: 'Pending' });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a transaction', async () => {
      const result = await service.remove('1');
      expect(result).toEqual(mockTransaction);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(mockRepository.remove).toHaveBeenCalledWith(mockTransaction);
    });

    it('should return null if transaction to remove not found', async () => {
      jest.spyOn(mockRepository, 'findOneBy').mockResolvedValueOnce(null);
      const result = await service.remove('999');
      expect(result).toBeNull();
    });
  });
});
