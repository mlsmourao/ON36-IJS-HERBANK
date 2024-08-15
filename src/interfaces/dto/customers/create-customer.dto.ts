import { IsString, IsNumber, IsArray, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  fullName: string;

  @IsString()
  birthDate: String;

  @IsString()
  cpf: string;

  @IsString()
  cep: string;

  @IsString()
  address: string;

  @IsString()
  complementAddress: string;

  @IsArray()
  phoneNumbers: string[];

  @IsEmail()
  email: string;

  @IsArray()
  creditHistory: string[];

  @IsArray()
  accounts: string[];

  @IsNumber()
  managerId: number;

}
