import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

@Entity()
export class Bill {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: "date" })
  chekout: Date;

  @OneToOne(type => Client, client => client.bill)
  @JoinColumn()
  client: Client;
}
