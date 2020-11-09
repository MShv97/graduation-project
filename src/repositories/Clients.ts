import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Client } from "../entity/Client";

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {


}
export default getCustomRepository(ClientRepository)