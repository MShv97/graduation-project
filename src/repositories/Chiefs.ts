import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Chief } from "../entity/Chief";

@EntityRepository(Chief)
class ChiefRepository extends Repository<Chief> {


}
export default getCustomRepository(ChiefRepository)