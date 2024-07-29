import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("checking-accounts")
export class CheckingAccount {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  overdraftLimit: number;
}
