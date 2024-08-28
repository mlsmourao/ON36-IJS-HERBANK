import { Module } from '@nestjs/common';
import { TransactionsService } from 'src/application/services/transactions/transactions.service';
import { TransactionsController } from 'src/interfaces/controllers/transactions/transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/domain/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
