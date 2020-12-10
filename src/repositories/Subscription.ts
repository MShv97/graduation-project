import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Subscription } from "../entities/Subscription";

@EntityRepository(Subscription)
class SubscriptionRepository extends Repository<Subscription> {}
export default getCustomRepository(SubscriptionRepository);
