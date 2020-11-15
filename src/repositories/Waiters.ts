import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Waiter } from "../entity/UserType/Waiter";

@EntityRepository(Waiter)
class WaiterRepository extends Repository<Waiter> {


}
export default getCustomRepository(WaiterRepository)