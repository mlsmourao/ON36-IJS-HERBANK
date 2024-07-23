import { Test, TestingModule } from '@nestjs/testing';
import { CheckingAccountsService } from './checking-accounts.service';

describe('CheckingAccountsService', () => {
  let service: CheckingAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckingAccountsService],
    }).compile();

    service = module.get<CheckingAccountsService>(CheckingAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
