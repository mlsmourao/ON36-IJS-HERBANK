import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateCheckingAccountDto } from './create-checking-account.dto';

export class UpdateCheckingAccountDto extends PartialType(CreateCheckingAccountDto) {
  @IsOptional()
  id?: number;
}
