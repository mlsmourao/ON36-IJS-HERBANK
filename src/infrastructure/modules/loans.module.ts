import { Module } from '@nestjs/common';
import { LoansService } from 'src/application/services/loans/loans.service';
import { LoansController } from 'src/interfaces/controllers/loans/loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from 'src/domain/entities/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}
