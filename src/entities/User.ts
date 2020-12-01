import { Column, PrimaryGeneratedColumn } from "typeorm";

export enum UserType {
  ADMIN = "admin",
  ACCOUNTANT = "accountant",
  WAITER = "waiter",
  CHIEF = "chief",
}

export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: Number;

  @Column({ length: 40 })
  firstName: string;

  @Column({ length: 40 })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "date" })
  birthdate: Date;

  @Column({ type: "text" })
  avatar: string;

  @Column({ type: "enum", enum: UserType })
  type: UserType;
}
