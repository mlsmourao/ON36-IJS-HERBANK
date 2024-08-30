import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("loan")
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  amount: number;
  
  @Column()
  interest: number;
  
  @Column()
  approvalDate: string;
  
  @Column("simple-array")
  dueDates: string[];
  
  @Column()
  installments: number;
  
  @Column()
  status: string;

  @Column("simple-array")
  installmentTransactions: string[];
  
  @Column("simple-array")
  installmentStatus: string[];
}
