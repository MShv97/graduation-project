import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Dish, DishStatus } from "../entities/Dish";

@EntityRepository(Dish)
class DishRepository extends Repository<Dish> {
  //MM-11
  dishPermission(restaurantId: number, dishId: number) {
    return this.createQueryBuilder("dish")
      .leftJoinAndSelect("dish.images", "images")
      .innerJoin("dish.category", "category")
      .innerJoin("category.menu", "menu")
      .innerJoin("menu.restaurant", "restaurant", "restaurant.id = :restaurantId", { restaurantId: restaurantId })
      .where("dish.id = :dishId", { dishId: dishId })
      .getOneOrFail();
  }
}
export default getCustomRepository(DishRepository);
