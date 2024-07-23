import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateLoanDto {

    @IsNumber()
    creditId: number;

    @IsNumber()
    amount: number;
    
    @IsNumber()
    interest: number;
    
    @IsString()
    approvalDate: string;
    
    @IsArray()
    dueDates: string[];
    
    @IsNumber()
    installments: number;
    
    @IsString()
    status: string;
    
    @IsArray()
    installmentTransactions: string[];
    
    @IsArray()
    installmentStatus: string[];
}

