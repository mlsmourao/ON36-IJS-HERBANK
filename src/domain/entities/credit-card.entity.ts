import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("credit-cards")
export class CreditCards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creditId: number;

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
