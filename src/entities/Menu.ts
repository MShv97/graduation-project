import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  thumpnail: string;

  @OneToMany(() => Category, category => category.menu)
  categories: Category[];
}
