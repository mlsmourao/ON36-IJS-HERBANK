import { Module } from '@nestjs/common';
import { AccountsService } from 'src/application/services/accounts.service';
import { AccountsController } from 'src/interfaces/controllers/accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/domain/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
