import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PaymentMethod } from "./PaymentMethod";
import { Restaurant } from "./Restaurant";
import { Subscription } from "./Subscription";

export enum RestaurantSubscriptionStatus {
  PENDING = "pending",
}

@Entity()
export class RestaurantSubscription {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: Number;

  @Column({ type: "enum", enum: RestaurantSubscriptionStatus, default: RestaurantSubscriptionStatus.PENDING })
  status: RestaurantSubscriptionStatus;

  @ManyToOne(type => Subscription, subscription => subscription.restaurants)
  subscription: Subscription;

  @ManyToOne(type => Restaurant, restaurant => restaurant.subscriptions)
  restaurant: Restaurant;

  @ManyToOne(type => PaymentMethod)
  paymentMethod: PaymentMethod;
}
