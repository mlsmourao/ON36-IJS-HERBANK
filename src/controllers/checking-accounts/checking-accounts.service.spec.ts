import { Test, TestingModule } from '@nestjs/testing';
import { CheckingAccountsService } from './checking-accounts.service';
import { CreateCheckingAccountDto } from './dto/create-checking-account.dto';
import { UpdateCheckingAccountDto } from './dto/update-checking-account.dto';
import { Repository } from 'typeorm';
import { CheckingAccount } from './entities/checking-account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('Testing CheckingAccountsService', () => {
  let service: CheckingAccountsService;
  let repository: Repository<CheckingAccount>;

  const mockCheckingAccountRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(checkingAccount => ({
      id: Date.now(),
      ...checkingAccount,
    })),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => {
      if (id === 1) {
        return { id, accountId: 123, overdraftLimit: 123 };
      }
      return null;
    }),
    merge: jest.fn().mockImplementation((checkingAccount, dto) => ({
      ...checkingAccount,
      ...dto,
    })),
    remove: jest.fn().mockImplementation(checkingAccount => checkingAccount),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckingAccountsService,
        {
          provide: getRepositoryToken(CheckingAccount),
          useValue: mockCheckingAccountRepository,
        },
      ],
    }).compile();

    service = module.get<CheckingAccountsService>(CheckingAccountsService);
    repository = module.get<Repository<CheckingAccount>>(getRepositoryToken(CheckingAccount));
  });

  it('should create a checking account', async () => {
    const createCheckingAccountDto: CreateCheckingAccountDto = { accountId: 123, overdraftLimit: 123 };
    const result = await service.create(createCheckingAccountDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...createCheckingAccountDto,
    });
    expect(repository.create).toHaveBeenCalledWith(createCheckingAccountDto);
    expect(repository.save).toHaveBeenCalledWith(createCheckingAccountDto);
  });

  it('should throw BadRequestException when creating a checking account fails', async () => {
    jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());
    const createCheckingAccountDto: CreateCheckingAccountDto = { accountId: 123, overdraftLimit: 123 };
    await expect(service.create(createCheckingAccountDto)).rejects.toThrow(BadRequestException);
  });

  it('should return all checking accounts', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should throw NotFoundException if no checking accounts found', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
    await expect(service.findAll()).rejects.toThrow(NotFoundException);
  });

  it('should return a specific checking account by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1, accountId: 123, overdraftLimit: 123 });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if checking account not found', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a specific checking account by ID', async () => {
    const updateCheckingAccountDto: UpdateCheckingAccountDto = { accountId: 456, overdraftLimit: 456 };
    const result = await service.update(1, updateCheckingAccountDto);
    expect(result).toEqual({ id: 1, accountId: 456, overdraftLimit: 456 });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.merge).toHaveBeenCalledWith({ id: 1, accountId: 123, overdraftLimit: 123 }, updateCheckingAccountDto);
    expect(repository.save).toHaveBeenCalledWith({ id: 1, accountId: 456, overdraftLimit: 456 });
  });

  it('should throw NotFoundException if checking account to update not found', async () => {
    await expect(service.update(999, { accountId: 456, overdraftLimit: 456 })).rejects.toThrow(NotFoundException);
  });

  it('should delete a specific checking account by ID', async () => {
    await service.remove(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1, accountId: 123, overdraftLimit: 123 });
  });

  it('should throw NotFoundException if checking account to delete not found', async () => {
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
