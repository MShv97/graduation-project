import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";


@Entity()
export class Table {
    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type: "text", unique: true})
    code:String;
    @Column({type: "text"})
    QR: String;
    
    @OneToMany(()=> Client, client=> client.table)
    client: Client[];
}