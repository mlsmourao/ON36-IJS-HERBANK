import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateCreditCardDto } from './create-credit-card.dto';

export class UpdateCreditCardDto extends PartialType(CreateCreditCardDto) {
  @IsOptional()
  id?: number;
}
