import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { DishImage } from "../entities/DishImage";

@EntityRepository(DishImage)
class DishImageRepository extends Repository<DishImage> {
  //MM-11
  dishImagePermission(restaurantId: number, imageId: number) {
    return this.createQueryBuilder("dishImage")
      .innerJoin("dishImage.dish", "dish")
      .innerJoin("dish.category", "category")
      .innerJoin("category.menu", "menu")
      .innerJoin("menu.restaurant", "restaurant", "restaurant.id = :restaurantId", { restaurantId: restaurantId })
      .where("dishImage.id = :imageId", { imageId: imageId })
      .getOneOrFail();
  }
}
export default getCustomRepository(DishImageRepository);
