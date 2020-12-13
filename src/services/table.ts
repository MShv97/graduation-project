import { Like } from "typeorm";
import { CustomError } from "../helpers";
import { TableRepo } from "../repositories";

//MM-9
async function create(currUser: any, body: any) {
  try {
    const table = TableRepo.create();
    table.restaurant = currUser.restaurantId;
    table.code = body.code;

    await TableRepo.save(table);
    return "OK";
  } catch (err) {
    throw err;
  }
}
//MM-9
async function read(currUser: any, page: number, size: number, q: string) {
  try {
    const result = await TableRepo.find({
      where: { restaurant: currUser.restaurantId, code: Like(`%${q}%`) },
      skip: page * size,
      take: size,
    });
    return { tables: result };
  } catch (err) {
    throw err;
  }
}
//MM-9
async function update(currUser: any, body: any) {
  try {
    const table = await TableRepo.findOneOrFail(body.table_id);
    delete body.table_id;
    await TableRepo.update(table.id, body);
    return "OK";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Table was not found." });
    if (err.name == "UpdateValuesMissingError")
      throw new CustomError({ status: 400, message: "Cannot perform update query because update values are not defined." });
    throw err;
  }
}
//MM-9
async function del(currUser: any, tableId: number) {
  try {
    await TableRepo.delete(tableId);
    return "OK";
  } catch (err) {
    throw err;
  }
}

export default { create, read, update, del };
