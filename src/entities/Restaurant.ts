import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Menu } from "./Menu";
import { Table } from "./Table";
import { RestaurantSubscription } from "./RestaurantSubscription";
import { User } from "./User";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: Number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column()
  address: string;

  @Column({ type: "text", nullable: true })
  logo: string;

  @Column({ type: "text", nullable: true })
  image: string;

  @OneToMany(type => Menu, menu => menu.restaurant)
  menus: Menu[];

  @OneToMany(type => Table, table => table.restaurant)
  tables: Table[];

  @OneToMany(type => RestaurantSubscription, subscription => subscription.restaurant)
  subscriptions: RestaurantSubscription[];

  @OneToMany(type => User, user => user.restaurant)
  users: User[];
}
