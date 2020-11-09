import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Order } from "../entity/Order";

@EntityRepository(Order)
class OrderRepository extends Repository<Order> {


}
export default getCustomRepository(OrderRepository)