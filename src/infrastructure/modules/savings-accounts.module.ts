import { Module } from '@nestjs/common';
import { SavingsAccountsService } from 'src/application/services/savings-accounts.service';
import { SavingsAccountsController } from 'src/interfaces/controllers/savings-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SavingsAccount } from 'src/domain/entities/savings-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SavingsAccount])],
  controllers: [SavingsAccountsController],
  providers: [SavingsAccountsService],
})
export class SavingsAccountsModule {}
