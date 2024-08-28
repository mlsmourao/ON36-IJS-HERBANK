import { Module } from '@nestjs/common';
import { CheckingAccountsService } from 'src/application/services/checking-accounts/checking-accounts.service';
import { CheckingAccountsController } from 'src/interfaces/controllers/checking-accounts/checking-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckingAccount } from 'src/domain/entities/checking-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckingAccount])],
  controllers: [CheckingAccountsController],
  providers: [CheckingAccountsService],
})
export class CheckingAccountsModule {}
