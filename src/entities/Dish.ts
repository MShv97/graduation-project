import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Image } from "./Image";
import { Order } from "./Order";

@Entity()
export class Dish {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ length: 40, unique: true })
  code: string;

  @Column({ type: "decimal", precision: 6, scale: 3 })
  price: number;

  @Column({ type: "decimal", precision: 3, scale: 3 })
  discount: number;

  @Column({ length: 40 })
  status: string;

  @ManyToOne(() => Category, category => category.dishs)
  category: Category;

  @OneToMany(() => Image, image => image.dish)
  images: Image[];

  @OneToMany(() => Order, order => order.dish)
  orders: Order[];
}
