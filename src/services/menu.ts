import { Like } from "typeorm";
import { CustomError } from "../helpers";
import { MenuRepo } from "../repositories";

//MM-6
async function create(currUser: any, body: any) {
  try {
    const menu = MenuRepo.create();
    menu.name = body.name;
    menu.description = body.description;
    menu.restaurant = currUser.restaurantId;

    await MenuRepo.save(menu);
    return "OK";
  } catch (err) {
    throw err;
  }
}
//MM-6
async function read(currUser: any, page: number, size: number, q: string) {
  try {
    const result = await MenuRepo.find({
      where: { restaurant: currUser.restaurantId, name: Like(`%${q}%`) },
      skip: page * size,
      take: size,
    });
    return { menus: result };
  } catch (err) {
    throw err;
  }
}
//MM-6
async function update(currUser: any, body: any) {
  try {
    const menu = await MenuRepo.findOneOrFail(body.menu_id);
    delete body.menu_id;
    await MenuRepo.update(menu.id, body);
    return "OK";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Menu was not found." });
    if (err.name == "UpdateValuesMissingError")
      throw new CustomError({ status: 400, message: "Cannot perform update query because update values are not defined." });
    throw err;
  }
}
//MM-6
async function del(currUser: any, menuId: number) {
  try {
    await MenuRepo.delete(menuId);
    return "OK";
  } catch (err) {
    throw err;
  }
}

export default { create, read, update, del };
