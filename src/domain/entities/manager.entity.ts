import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("managers")
export class Manager {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column("simple-array") 
  customers: string[];
}
