import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
