import { IsNumber } from 'class-validator';

export class CreateSavingsAccountDto {

  @IsNumber()
  accountId: number;

  @IsNumber()
  interestRate: number;

  @IsNumber()
  yieldAmount: number;
}
