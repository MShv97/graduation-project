import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Image } from "./Image";
import { Order } from "./Order";


@Entity()
export class Dish {
    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type: "varchar", length: 100})
    name: String;
    @Column({type: "text"})
    description: String;
    @Column({type: "varchar", length:10 ,unique: true})
    code: String;
    @Column({type: "decimal", precision: 6, scale:3 })
    price: Number;
    @Column({type: "decimal", precision:1, scale: 3})
    discount: Number;
    @Column({type:"boolean"})
    status: boolean;

    @ManyToOne(()=> Category, category=> category.dish)
    category: Category;
    @OneToMany(()=> Image, image=>image.dish)
    image: Image[];
    @OneToMany(()=> Order ,order=>order.dish)
    order: Order[];
}