import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  //MM-11
  categoryPermission(restaurantId: number, categoryId: number) {
    return this.createQueryBuilder("category")
      .innerJoin("category.menu", "menu")
      .innerJoin("menu.restaurant", "restaurant", "restaurant.id = :restaurantId", { restaurantId: restaurantId })
      .where("category.id = :categoryId", { categoryId: categoryId })
      .getOneOrFail();
  }
}
export default getCustomRepository(CategoryRepository);
