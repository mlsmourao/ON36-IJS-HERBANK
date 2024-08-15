import { IsNumber } from 'class-validator';

export class CreateCheckingAccountDto {

  @IsNumber()
  accountId: number;

  @IsNumber()
  overdraftLimit: number;

}
