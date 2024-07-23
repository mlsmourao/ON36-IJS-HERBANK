import { Test, TestingModule } from '@nestjs/testing';
import { SavingsAccountsController } from './savings-accounts.controller';
import { SavingsAccountsService } from './savings-accounts.service';

describe('SavingsAccountController', () => {
  let controller: SavingsAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingsAccountsController],
      providers: [SavingsAccountsService],
    }).compile();

    controller = module.get<SavingsAccountsController>(SavingsAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
