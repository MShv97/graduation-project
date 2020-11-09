import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Table } from "../entity/Table";

@EntityRepository(Table)
class TableRepository extends Repository<Table> {


}
export default getCustomRepository(TableRepository)