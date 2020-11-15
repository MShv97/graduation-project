import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Admin } from "../entity/UserType/Admin";

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> {


}
export default getCustomRepository(AdminRepository)