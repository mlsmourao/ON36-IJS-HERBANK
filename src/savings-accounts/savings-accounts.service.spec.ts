import { Test, TestingModule } from '@nestjs/testing';
import { SavingsAccountsService } from './savings-accounts.service';

describe('SavingsAccountsService', () => {
  let service: SavingsAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavingsAccountsService],
    }).compile();

    service = module.get<SavingsAccountsService>(SavingsAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
