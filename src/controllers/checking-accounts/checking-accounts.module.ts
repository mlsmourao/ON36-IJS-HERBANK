import { Module } from '@nestjs/common';
import { CheckingAccountsService } from './checking-accounts.service';
import { CheckingAccountsController } from './checking-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckingAccount } from './entities/checking-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckingAccount])],
  controllers: [CheckingAccountsController],
  providers: [CheckingAccountsService],
})
export class CheckingAccountsModule {}
