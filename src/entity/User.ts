import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
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

    @Column({ length: 40 })
    role: string

    @Column({ type: "date" })
    birthDate: Date

    @Column({ type: "text" })
    avatar: String

}