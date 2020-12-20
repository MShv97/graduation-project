import { BeforeInsert, BeforeRemove, Column, Entity, getRepository, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomError } from "../helpers";
import { Dish } from "./Dish";
import fs from "fs";

@Entity()
export class DishImage {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: "text" })
  path: string;

  @ManyToOne(type => Dish, dish => dish.images, { onDelete: "CASCADE", nullable: false })
  dish: Dish;

  //MM-10
  //Listener to check number of dish images allowed per dish
  @BeforeInsert()
  async CountDishImages() {
    const count = await getRepository(DishImage).count({ where: { dish: this.dish } });
    if (count >= 4) {
      fs.existsSync(this.path) && fs.unlinkSync(this.path);
      throw new CustomError({ status: 409, message: "It is not allowed to add more than 4 images per dish." });
    }
  }
}
