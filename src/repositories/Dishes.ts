import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Dish } from "../entity/Dish";

@EntityRepository(Dish)
class DishRepository extends Repository<Dish> {


}
export default getCustomRepository(DishRepository)