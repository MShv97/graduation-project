import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Restaurant } from "../entities/Restaurant";

@EntityRepository(Restaurant)
class RestaurantRepository extends Repository<Restaurant> {}
export default getCustomRepository(RestaurantRepository);
