import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from "./Dish";
import { Menu } from "./Menu";

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  thumpnail: string;

  @ManyToOne(type => Menu, menu => menu.categories)
  menu: Menu;

  @OneToMany(type => Dish, dish => dish.category)
  dishs: Dish[];
}
