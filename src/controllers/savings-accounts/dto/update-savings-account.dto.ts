import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateSavingsAccountDto } from './create-savings-account.dto';

export class UpdateSavingsAccountDto extends PartialType(CreateSavingsAccountDto) {
  @IsOptional()
  id?: number;
}
