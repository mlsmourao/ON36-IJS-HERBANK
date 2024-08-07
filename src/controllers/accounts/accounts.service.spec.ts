import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

describe('Testing AccountsService', () => {
  let service: AccountsService;
  let repository: Repository<Account>;

  const mockRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(account => {
      return {
        id: 1,
        ...account,
      };
    }),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return { id, accountNumber: 123, balance: 123, transactions: [] };
      }
      return null;
    }),
    merge: jest.fn().mockImplementation((account, dto) => ({
      ...account,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(account => account),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
    repository = module.get<Repository<Account>>(getRepositoryToken(Account));
  });

  it('should create an account', async () => {
    const createAccountDto: CreateAccountDto = { accountNumber: '123', balance: 123, transactions: [] };
    const result = await service.create(createAccountDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...createAccountDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createAccountDto);
    expect(repository.save).toHaveBeenCalledWith(createAccountDto);
  });

  it('should throw BadRequestException if create fails', async () => {
    jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error('Test error'));
    const createAccountDto: CreateAccountDto = { accountNumber: '123', balance: 123, transactions: [] };
    await expect(service.create(createAccountDto)).rejects.toThrow(BadRequestException);
  });

  it('should find all accounts', async () => {
    const accounts = [{ id: 1, accountNumber: '123', balance: 123, transactions: [] }];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(accounts);
    const result = await service.findAll();
    expect(result).toEqual(accounts);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException if no accounts found', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('should find one account by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1, accountNumber: 123, balance: 123, transactions: [] });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if account not found', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update an account', async () => {
    const updateAccountDto: UpdateAccountDto = { accountNumber: '456', balance: 456, transactions: [] };
    const result = await service.update(1, updateAccountDto);
    expect(result).toEqual({ id: 1, ...updateAccountDto });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should throw NotFoundException if account to update not found', async () => {
    await expect(service.update(999, { accountNumber: '456', balance: 456, transactions: [] })).rejects.toThrow(NotFoundException);
  });

  it('should remove an account', async () => {
    const result = await service.remove(1);
    expect(result).toEqual({ id: 1, accountNumber: 123, balance: 123, transactions: [] });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1, accountNumber: 123, balance: 123, transactions: [] });
  });

  it('should throw NotFoundException if account to remove not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
