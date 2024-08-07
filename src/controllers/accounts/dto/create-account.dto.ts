import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  accountNumber: string;

  @IsNumber()
  balance: number;

  @IsArray()
  transactions: string[];
}
