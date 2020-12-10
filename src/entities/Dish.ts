import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Image } from "./Image";
import { Order } from "./Order";

export enum DishStatus {
  ACTIVE = "active",
  DISABLED = "disabled",
}

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

  @Column({ type: "float" })
  price: number;

  @Column({ type: "float", default: 0 })
  discount: number;

  @Column({ type: "enum", enum: DishStatus, default: DishStatus.ACTIVE })
  status: string;

  @ManyToOne(type => Category, category => category.dishs)
  category: Category;

  @OneToMany(type => Image, image => image.dish)
  images: Image[];

  @OneToMany(type => Order, order => order.dish)
  orders: Order[];
}
