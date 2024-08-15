import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateCreditCardDto {

    @IsNumber()
    creditId: number;

    @IsNumber()
    cardNumber: number;
    
    @IsString()
    securityCode: number;
    
    @IsString()
    cardExpiration: string;
    
    @IsNumber()
    creditLimit: number;
    
    @IsNumber()
    outstandingBalance: number;
    
    @IsArray()
    transactionsIds: string[];
    
    @IsArray()
    duedates: string[];
    
    @IsArray()
    closingDates: string[];
}

