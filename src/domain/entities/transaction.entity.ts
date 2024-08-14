import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const { nanoid } = require("nanoid")

@Entity("transactions")
export class Transactions {

    @PrimaryColumn()
    id: string; //t_09as8da08dsas8a

    @Column()
    type: string;
  
    @Column()
    amount: number;
  
    @Column()
    date: string;
  
    @Column()
    status: string;

    @BeforeInsert()
    generateId() {
        this.id = `t_${nanoid()}`
    }
}
