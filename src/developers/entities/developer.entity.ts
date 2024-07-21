import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";

const { nanoid } = require("nanoid")

@Entity("developers")
export class Developer {

    @PrimaryColumn()
    id: string; //dev_09as8da08dsas8a

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    dateOfBirth: string;

    @BeforeInsert()
    generateId() {
        this.id = `dev_${nanoid()}`
    }
}
