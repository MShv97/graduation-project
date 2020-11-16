import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Accountant } from "../entity/Accountant";

@EntityRepository(Accountant)
class AccountantRepository extends Repository<Accountant> {


}
export default getCustomRepository(AccountantRepository)