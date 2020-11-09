import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bill } from "./Bill";
import { Order } from "./Order";
import { Table } from "./Table";

@Entity()
export class Client{
    @PrimaryGeneratedColumn({unsigned: true})
    id:Number;
    @Column({type: "varchar", length: 60})
    name: String;
    @Column({type: "int", width: 20})
    phone: Number;
    @Column({type: "date"})
    order_date: Date;

    @OneToMany(()=> Order, order=> order.client)
    order: Order[];
    @ManyToOne(()=> Table, table=>table.client)
    table: Table;
    @OneToOne(()=> Bill, bill=>bill.client)
    bill: Bill;
}