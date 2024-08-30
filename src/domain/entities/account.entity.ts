import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CheckingAccount } from "./checking-account.entity";
import { SavingsAccount } from "./savings-account.entity";
import { Credit } from "./credit.entity";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  accountNumber: string;

  @Column('float8')
  balance: number;

  @Column("float", { array: true }) 
  transactions: number[];

  @OneToOne(() => CheckingAccount, checkingAccount => checkingAccount.accountId)
  checkingAccount: CheckingAccount;

  @OneToOne(() => SavingsAccount, savingsAccount => savingsAccount.accountId)
  savingsAccount: SavingsAccount;

  @OneToMany(() => Credit, credit => credit.accountId)
  credits: Credit[];
}
