import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Dish } from "./Dish";


@Entity()
export class Order {
    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type: "int"})
    amount: Number;
    @Column({type: "text"})
    note: String;
    @Column({type: "boolean"})
    status: boolean;

    @ManyToOne(()=> Dish, dish=> dish.order)
    dish: Dish;
    @ManyToOne(()=> Client, client=>client.order)
    client: Client;
}