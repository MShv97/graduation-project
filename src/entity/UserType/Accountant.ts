import { Column, Entity } from "typeorm";
import { User } from "../User";

@Entity()
export class Accountant extends User {
    @Column({ length: 40 })
    role: string
}