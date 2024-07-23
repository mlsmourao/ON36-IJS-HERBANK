import { IsString, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  type: string;

  @IsNumber()
  amount: number;

  @IsString()
  date: string;

  @IsString()
  status: string;
}


