import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from "./Dish";

@Entity()
export class Image {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number

    @Column({ type: "text" })
    url: string

    @ManyToOne(() => Dish, dish => dish.images)
    dish: Dish;
}
