import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Dish } from "./Dish";


@Entity()
export class Order {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number

    @Column()
    amount: number

    @Column({ type: "text" })
    note: String

    @Column()
    status: string

    @ManyToOne(() => Dish, dish => dish.orders)
    dish: Dish

    @ManyToOne(() => Client, client => client.orders)
    client: Client

}