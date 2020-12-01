import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Dish } from "../entities/Dish";

@EntityRepository(Dish)
class DishRepository extends Repository<Dish> {}
export default getCustomRepository(DishRepository);
