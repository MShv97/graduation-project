import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Menu } from "../entities/Menu";

@EntityRepository(Menu)
class MenuRepository extends Repository<Menu> {
  //MM-11
  menuPermission(restaurantId: number, menuId: number) {
    return this.createQueryBuilder("menu")
      .innerJoin("menu.restaurant", "restaurant", "restaurant.id = :restaurantId", { restaurantId: restaurantId })
      .where("menu.id = :menuId", { menuId: menuId })
      .getOneOrFail();
  }
}
export default getCustomRepository(MenuRepository);
