import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "./loan.entity";
import { CreditCards } from "./credit-card.entity";
import { Account } from "./account.entity";

@Entity("credits")
export class Credit {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  accountId: number;
}
