import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Menu } from "../entities/Menu";

@EntityRepository(Menu)
class MenuRepository extends Repository<Menu> {}
export default getCustomRepository(MenuRepository);
