import { AfterRemove, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from "./Dish";
import { Menu } from "./Menu";
import fs from "fs";

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text", nullable: true })
  thumpnail: string;

  @ManyToOne(type => Menu, menu => menu.categories)
  menu: Menu;

  @OneToMany(type => Dish, dish => dish.category)
  dishs: Dish[];
}
