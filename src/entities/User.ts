import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserType {
  ADMIN = "admin",
  ACCOUNTANT = "accountant",
  WAITER = "waiter",
  CHIEF = "chief",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: Number;

  @Column({ length: 40 })
  first_name: string;

  @Column({ length: 40 })
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column({ type: "text", nullable: true })
  avatar: string;

  @Column({ type: "enum", enum: UserType })
  type: UserType;
}
