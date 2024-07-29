import { Module } from '@nestjs/common';
import { SavingsAccountsService } from './savings-accounts.service';
import { SavingsAccountsController } from './savings-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsAccount } from './entities/savings-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingsAccount])],
  controllers: [SavingsAccountsController],
  providers: [SavingsAccountsService],
})
export class SavingsAccountsModule {}
