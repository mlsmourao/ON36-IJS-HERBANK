import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("checking-accounts")
export class CheckingAccount {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  overdraftLimit: number;
}
