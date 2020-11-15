import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Chief } from "../entity/UserType/Chief";

@EntityRepository(Chief)
class ChiefRepository extends Repository<Chief> {


}
export default getCustomRepository(ChiefRepository)