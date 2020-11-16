import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: Number

    @Column({ length: 40 })
    firstName: string

    @Column({ length: 40 })
    lastName: string

    @Column({ unique: true })
    email: string

    @Column({ unique: true })
    userName: string

    @Column({ type: "text" })
    password: string

    @Column({ type: "date" })
    birthdate: Date

    @Column({ type: "text" })
    avatar: string

}