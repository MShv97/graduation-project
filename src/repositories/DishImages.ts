import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { DishImage } from "../entities/DishImage";

@EntityRepository(DishImage)
class DishImageRepository extends Repository<DishImage> {}
export default getCustomRepository(DishImageRepository);
