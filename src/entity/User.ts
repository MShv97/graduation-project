import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({unsigned: true})
    id: Number;
    @Column({type:"varchar", length: 40})
    firstName: String;
    @Column({type:"varchar", length: 40})
    lastName: String;
    @Column({unique: true})
    email: String;
    @Column({unique: true})
    userName: String;
    @Column()
    password: String;
    @Column({type:"varchar", length: 40})
    role: String;
    @Column()
    birthDate: Date;
    @Column()
    avatar: String;
}