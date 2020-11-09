import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Bill } from "../entity/Bill";

@EntityRepository(Bill)
class BillRepository extends Repository<Bill> {


}
export default getCustomRepository(BillRepository)