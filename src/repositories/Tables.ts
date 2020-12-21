import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Table } from "../entities/Table";

@EntityRepository(Table)
class TableRepository extends Repository<Table> {
  //MM-11
  tablePermission(restaurantId: number, tableId: number) {
    return this.createQueryBuilder("table")
      .innerJoin("table.restaurant", "restaurant", "restaurant.id = :restaurantId", { restaurantId: restaurantId })
      .where("table.id =: tableId", { tableId: tableId })
      .getOneOrFail();
  }
}
export default getCustomRepository(TableRepository);
