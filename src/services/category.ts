import { CustomError } from "../helpers";
import { CategoryRepo } from "../repositories";
import { Like } from "typeorm";

// MM-7
async function create(body: any) {
  try {
    const category = CategoryRepo.create();
    category.name = body.name;
    category.description = body.description;
    console.log(body.menu_id);

    category.menu = body.menu_id;

    await CategoryRepo.save(category);
    return "Ok";
  } catch (err) {
    if (err.code == "ER_NO_REFERENCED_ROW_2") throw new CustomError({ status: 404, message: "Menu was not found." });
    throw err;
  }
}
// MM-7
async function read(menuId: number, page: number, size: number, q: string) {
  try {
    const result = await CategoryRepo.find({
      where: { menu: menuId, name: Like(`%${q}%`) },
      skip: page * size,
      take: size,
    });
    return { categories: result };
  } catch (err) {
    throw err;
  }
}
// MM-7
async function update(body: any) {
  try {
    const category = await CategoryRepo.findOneOrFail(body.category_id);
    delete body.category_id;
    await CategoryRepo.update(category.id, body);
    return "Ok";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Category was not found." });
    if (err.name == "UpdateValuesMissingError")
      throw new CustomError({ status: 400, message: "Cannot perform update query because update values are not defined." });
    throw err;
  }
}
// MM-7
async function del(categoryId: number) {
  try {
    await CategoryRepo.delete(categoryId);
    return "OK";
  } catch (err) {
    throw err;
  }
}

export default { create, read, update, del };
