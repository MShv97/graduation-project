import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Admin } from "../entity/Admin";

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> {


}
export default getCustomRepository(AdminRepository)