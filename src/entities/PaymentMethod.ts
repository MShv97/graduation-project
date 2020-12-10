import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: Number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text" })
  icon: string;
}
