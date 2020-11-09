import { date } from "joi";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";


@Entity()
export class Bill {
    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type: "date"})
    chekout :Date;

    @OneToOne(()=> Client, client=> client.bill)
    @JoinColumn()
    client: Client;


}