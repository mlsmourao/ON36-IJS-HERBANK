import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("savings-accounts")
export class SavingsAccount {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  interestRate: number;

  @Column()
  yieldAmount: number;
}
