import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateManagerDto {
  
  @IsString()
  fullName: string;

  @IsArray()
  customers: string[];

}
