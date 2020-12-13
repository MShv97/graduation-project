import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Client } from "./Client";
import { Restaurant } from "./Restaurant";

export enum TableStatus {
  BUSY = "busy",
  ACTIVE = "active",
  OFS = "out of service",
}
@Unique(["code", "restaurant"])
@Entity()
export class Table {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  code: string;

  @Column({ type: "text", nullable: true })
  QR: string;

  @Column({ type: "enum", enum: TableStatus, default: TableStatus.ACTIVE })
  status: TableStatus;

  @OneToMany(() => Client, client => client.table)
  clients: Client[];

  @ManyToOne(type => Restaurant, restaurant => restaurant.tables)
  restaurant: Restaurant;
}
