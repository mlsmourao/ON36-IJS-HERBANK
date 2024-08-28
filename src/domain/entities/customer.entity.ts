import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("customers")
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  birthDate: Date;

  @Column()
  cpf: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  complementAddress: string;

  @Column("simple-array")
  phoneNumbers: string[];

  @Column()
  email: string;

  @Column("simple-array")
  creditHistory: string[];

  @Column("simple-array")
  accounts: string[];

  @Column()
  managerId: number;
}
