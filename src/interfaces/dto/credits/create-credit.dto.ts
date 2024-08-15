import { IsNumber } from 'class-validator';

export class CreateCreditDto {
  @IsNumber()
  accountId: number;
}
