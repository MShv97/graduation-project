import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { RestaurantSubscription } from "../entities/RestaurantSubscription";

@EntityRepository(RestaurantSubscription)
class RestaurantSubscriptionRepository extends Repository<RestaurantSubscription> {}
export default getCustomRepository(RestaurantSubscriptionRepository);
