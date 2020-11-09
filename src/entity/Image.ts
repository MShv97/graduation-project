import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from "./Dish";

@Entity()
export class Image {
    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type: "text"})
    url: String

    @ManyToOne(()=> Dish, dish=> dish.image)
    dish: Dish;
}
