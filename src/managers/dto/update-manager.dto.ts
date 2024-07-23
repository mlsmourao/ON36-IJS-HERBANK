import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateManagerDto } from './create-manager.dto';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {
  @IsOptional()
  id?: number;
}
