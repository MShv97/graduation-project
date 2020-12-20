import { BeforeRemove, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Category } from "./Category";
import { DishImage } from "./DishImage";
import { Order } from "./Order";
import fs from "fs";

export enum DishStatus {
  ACTIVE = "active",
  DISABLED = "disabled",
}
@Unique(["code", "category"])
@Entity()
export class Dish {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ length: 40 })
  code: string;

  @Column({ type: "float" })
  price: number;

  @Column({ type: "float", default: 0 })
  discount: number;

  @Column({ type: "enum", enum: DishStatus, default: DishStatus.ACTIVE })
  status: string;

  @ManyToOne(type => Category, category => category.dishs)
  category: Category;

  @OneToMany(type => DishImage, dishImage => dishImage.dish)
  images: DishImage[];

  @OneToMany(type => Order, order => order.dish)
  orders: Order[];

  //MM-10
  //Listener to delete dish images from local storage before deleting dish
  //Dish images is being deleted with cascade option
  @BeforeRemove()
  DeleteImagesFiles() {
    for (const image of this.images) fs.existsSync(image.path) && fs.unlinkSync(image.path);
  }
}
