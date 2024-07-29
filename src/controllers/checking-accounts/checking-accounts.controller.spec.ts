import { Test, TestingModule } from '@nestjs/testing';
import { CheckingAccountsController } from './checking-accounts.controller';
import { CheckingAccountsService } from './checking-accounts.service';

describe('CheckingAccountController', () => {
  let controller: CheckingAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckingAccountsController],
      providers: [CheckingAccountsService],
    }).compile();

    controller = module.get<CheckingAccountsController>(CheckingAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
