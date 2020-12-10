import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RestaurantSubscription } from "./RestaurantSubscription";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: Number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: "float" })
  price: number;

  @Column()
  tables: number;

  @OneToMany(type => RestaurantSubscription, restaurant => restaurant.subscription)
  restaurants: RestaurantSubscription[];
}
