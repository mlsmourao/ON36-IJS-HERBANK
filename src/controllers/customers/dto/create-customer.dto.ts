import { IsString, IsNumber, IsArray, IsDate, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  fullName: string;

  @IsString()
  birthDate: String;

  @IsString()
  cpf: string;

  @IsString()
  address: string;

  @IsArray()
  phoneNumbers: string[];

  @IsEmail()
  email: string;

  @IsArray()
  accounts: string[];

  @IsNumber()
  managerId: number;

}
