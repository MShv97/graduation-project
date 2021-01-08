import { Like } from "typeorm";
import { CustomError } from "../../helpers";
import { MenuRepo } from "../repositories";

//MM-6
async function create(currUser: any, body: any) {
  try {
    const menu = MenuRepo.create();
    menu.name = body.name;
    menu.description = body.description;
    menu.restaurant = currUser.restaurantId;

    await MenuRepo.save(menu);
    return "Success";
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
    const menu = await MenuRepo.menuPermission(currUser.restaurantId, body.menuId);
    delete body.menuId;
    await MenuRepo.update(menu.id, body);
    return "Success";
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
    const menu = await MenuRepo.menuPermission(currUser.restaurantId, menuId);
    await MenuRepo.delete(menu.id);
    return "Success";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Menu was not found." });
    throw err;
  }
}

export default { create, read, update, del };
