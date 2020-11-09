import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";


@Entity()
export class Menu{
    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type: "varchar" ,length: 100, unique: true})
    name: String;
    @Column({type: "text"})
    description: String;
    @Column({type: "text"})
    thumpnail: String;

    @OneToMany(()=>Category ,category =>category.menu)
    category: Category[];
}