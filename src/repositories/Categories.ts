import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Category } from "../entities/Category";

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {}
export default getCustomRepository(CategoryRepository);
