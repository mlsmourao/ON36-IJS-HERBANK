import { Test, TestingModule } from '@nestjs/testing';
import { CheckingAccountsService } from './checking-accounts.service';
import { CreateCheckingAccountDto } from 'src/interfaces/dto/checking-accounts/create-checking-account.dto';
import { UpdateCheckingAccountDto } from 'src/interfaces/dto/checking-accounts/update-checking-account.dto';
import { Repository } from 'typeorm';
import { CheckingAccount } from 'src/domain/entities/checking-account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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

  it('should return all checking accounts', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should return a specific checking account by ID', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual({ id: 1, accountId: 123, overdraftLimit: 123 });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a specific checking account by ID', async () => {
    const updateCheckingAccountDto: UpdateCheckingAccountDto = { accountId: 456, overdraftLimit: 456 };
    const result = await service.update(1, updateCheckingAccountDto);
    expect(result).toEqual({ id: 1, ...updateCheckingAccountDto});
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should delete a specific checking account by ID', async () => {
    await service.remove(1);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(repository.remove).toHaveBeenCalledWith({ id: 1, accountId: 123, overdraftLimit: 123 });
  });

});
