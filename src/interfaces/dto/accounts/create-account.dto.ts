import { IsString, IsNumber, IsArray, IsOptional, IsNumberOptions, ValidateNested, ArrayNotEmpty, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @IsString()
  accountNumber: string;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Balance must be a valid number.' })
  balance: number;

  @IsArray()
  @ArrayNotEmpty({ message: 'Transactions cannot be empty.' })
  @ValidateNested({ each: true })
  @IsNumber({}, { each: true, message: 'Each transaction must be a number.' })
  @Type(() => Number)
  transactions: number[];
}
