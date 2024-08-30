import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credit } from "./credit.entity";

@Entity("credit-cards")
export class CreditCards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cardNumber: number;
  
  @Column()
  securityCode: number;
  
  @Column()
  cardExpiration: string;
  
  @Column()
  creditLimit: number;
  
  @Column()
  outstandingBalance: number;
  
  @Column("simple-array")
  transactionsIds: string[];
  
  @Column("simple-array")
  duedates: string[];
  
  @Column("simple-array")
  closingDates: string[];
}
