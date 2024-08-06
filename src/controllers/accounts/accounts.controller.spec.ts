import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

describe('Testing AccountsController', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;

  beforeEach(() => {
    accountsService = {
      create: jest.fn(dto => ({
        id: Date.now(),
        ...dto,
      })),
      findAll: jest.fn(() => []),
      findOne: jest.fn(id => ({
        id,
        accountNumber: 123,
        balance: 123,
        transactions: [],
      })),
      update: jest.fn((id, dto) => ({
        id,
        ...dto,
      })),
      remove: jest.fn(id => ({
        id,
      })),
    } as unknown as AccountsService;

    accountsController = new AccountsController(accountsService);
  });

  it('should create an account', async () => {
    const createAccountDto: CreateAccountDto = { accountNumber: '123', balance: 123, transactions: [] };
    const result = await accountsController.create(createAccountDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...createAccountDto,
    });
    expect(accountsService.create).toHaveBeenCalledWith(createAccountDto);
  });

  it('should return a list of accounts', async () => {
    const result = await accountsController.findAll();
    expect(result).toEqual([]);
    expect(accountsService.findAll).toHaveBeenCalled();
  });

  it('should return an account by ID', async () => {
    const result = await accountsController.findOne(1);
    expect(result).toEqual({ id: 1, accountNumber: 123, balance: 123, transactions: [] });
    expect(accountsService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update an account by ID', async () => {
    const updateAccountDto: UpdateAccountDto = { accountNumber:'456', balance: 456, transactions: [] };
    const result = await accountsController.update(1, updateAccountDto);
    expect(result).toEqual({ id: 1, ...updateAccountDto });
    expect(accountsService.update).toHaveBeenCalledWith(1, updateAccountDto);
  });

  it('should remove an account by ID', async () => {
    await accountsController.remove(1);
    expect(accountsService.remove).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if account not found on update', async () => {
    jest.spyOn(accountsService, 'update').mockResolvedValueOnce(null);
    try {
      await accountsController.update(999, { accountNumber: '456', balance: 456, transactions: [] });
    } catch (e) {
      expect(e.message).toBe('Account with ID 999 not found');
    }
  });

  it('should throw NotFoundException if account not found on remove', async () => {
    jest.spyOn(accountsService, 'remove').mockResolvedValueOnce(null);
    try {
      await accountsController.remove(999);
    } catch (e) {
      expect(e.message).toBe('Account with ID 999 not found');
    }
  });
});
