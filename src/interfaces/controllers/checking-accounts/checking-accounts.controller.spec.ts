import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CheckingAccountsController } from './checking-accounts.controller';
import { CheckingAccountsService } from 'src/application/services/checking-accounts/checking-accounts.service';
import { CreateCheckingAccountDto } from 'src/interfaces/dto/checking-accounts/create-checking-account.dto';
import { UpdateCheckingAccountDto } from 'src/interfaces/dto/checking-accounts/update-checking-account.dto';

describe('Testing CheckingAccountsController', () => {
  let controller: CheckingAccountsController;
  let service: CheckingAccountsService;

  const mockCheckingAccountsService = {
    create: jest.fn(dto => ({
      id: Date.now(),
      ...dto,
    })),
    findAll: jest.fn(() => []),
    findOne: jest.fn(id => {
      if (id === 1) {
        return { id, accountId: 123, overdraftLimit: 123 };
      }
      return null;
    }),
    update: jest.fn((id, dto) => {
      if (id === 1) {
        return { id, ...dto };
      }
      return null;
    }),
    remove: jest.fn(id => {
      if (id === 1) {
        return { id, accountId: 123, overdraftLimit: 123 };
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckingAccountsController],
      providers: [
        {
          provide: CheckingAccountsService,
          useValue: mockCheckingAccountsService,
        },
      ],
    }).compile();

    controller = module.get<CheckingAccountsController>(CheckingAccountsController);
    service = module.get<CheckingAccountsService>(CheckingAccountsService);
  });


  it('should create a checking account', async () => {
    const createCheckingAccountDto: CreateCheckingAccountDto = { accountId: 123, overdraftLimit: 123 };
    const result = await controller.create(createCheckingAccountDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...createCheckingAccountDto,
    });
    expect(service.create).toHaveBeenCalledWith(createCheckingAccountDto);
  });

  it('should return all checking accounts', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a specific checking account by ID', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({ id: 1, accountId: 123, overdraftLimit: 123 });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if checking account not found', async () => {
    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a specific checking account by ID', async () => {
    const updateCheckingAccountDto: UpdateCheckingAccountDto = { accountId: 456, overdraftLimit: 456 };
    const result = await controller.update(1, updateCheckingAccountDto);
    expect(result).toEqual({ id: 1, ...updateCheckingAccountDto });
    expect(service.update).toHaveBeenCalledWith(1, updateCheckingAccountDto);
  });

  it('should throw NotFoundException if checking account to update not found', async () => {
    await expect(controller.update(999, { accountId: 456, overdraftLimit: 456 })).rejects.toThrow(NotFoundException);
  });

  it('should delete a specific checking account by ID', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if checking account to delete not found', async () => {
    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
  });
});
