import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Dish } from "./Dish";

export enum OrderStatus {
  PENDING = "pending",
  READY = "ready",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  amount: number;

  @Column({ type: "text" })
  note: String;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @ManyToOne(type => Dish, dish => dish.orders)
  dish: Dish;

  @ManyToOne(type => Client, client => client.orders)
  client: Client;
}
