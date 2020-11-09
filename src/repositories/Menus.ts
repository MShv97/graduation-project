import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Menu } from "../entity/Menu";

@EntityRepository(Menu)
class MenuRepository extends Repository<Menu> {


}
export default getCustomRepository(MenuRepository)