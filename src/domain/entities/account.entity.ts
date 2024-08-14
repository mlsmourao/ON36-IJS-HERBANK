import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: string;

  @Column()
  balance: number;

  @Column("simple-array") 
  transactions: string[];
}
