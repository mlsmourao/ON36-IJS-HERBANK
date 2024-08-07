import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("credits")
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;
}
