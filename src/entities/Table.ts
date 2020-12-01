import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

@Entity()
export class Table {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ unique: true })
  code: string;

  @Column({ type: "text" })
  QR: string;

  @OneToMany(() => Client, client => client.table)
  clients: Client[];
}
