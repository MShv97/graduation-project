import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Restaurant } from "./Restaurant";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text", nullable: true })
  thumpnail: string;

  @OneToMany(type => Category, category => category.menu)
  categories: Category[];

  @ManyToOne(type => Restaurant, restaurant => restaurant.menus)
  restaurant: Restaurant;
}
