import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bill } from "./Bill";
import { Order } from "./Order";
import { Table } from "./Table";

@Entity()
export class Client {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number

    @Column({ length: 60 })
    name: String

    @Column({ length: 40 })
    phone: string

    @Column({ type: "date" })
    order_date: Date

    @OneToMany(() => Order, order => order.client)
    orders: Order[]

    @ManyToOne(() => Table, table => table.clients)
    table: Table

    @OneToOne(() => Bill, bill => bill.client)
    bill: Bill

}