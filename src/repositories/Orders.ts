import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Order } from "../entities/Order";

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {}
export default getCustomRepository(OrderRepository);
