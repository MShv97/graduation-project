import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Waiter } from "../entity/Waiter";

@EntityRepository(Waiter)
class WaiterRepository extends Repository<Waiter> {


}
export default getCustomRepository(WaiterRepository)