import { IsString, IsNumber, IsArray, IsObject } from 'class-validator';
import { Credit } from 'src/domain/entities/credit.entity';

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
