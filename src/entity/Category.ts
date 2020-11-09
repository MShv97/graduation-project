import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Dish } from "./Dish";
import { Menu } from "./Menu";


@Entity()
export class Category {

    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type: "varchar" ,length: 100, unique: true})
    name: String;
    @Column({type: "text"})
    description: String;
    @Column({type: "text"})
    thumpnail: String;

    @ManyToOne(()=> Menu , menu=>menu.category)
    menu: Menu;

    @OneToMany(()=> Dish, dish=> dish.category)
    dish:Dish[];
}