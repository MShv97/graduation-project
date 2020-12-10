import { CustomError } from "../helpers";
import { DishRepo } from "../repositories";
import { Like } from "typeorm";

//MM-8
async function create(body: any) {
  try {
    const dish = DishRepo.create();
    dish.name = body.name;
    dish.description = body.description;
    dish.code = body.code;
    dish.price = body.price;
    dish.discount = body.discount;
    dish.category = body.category_id;
    await DishRepo.save(dish);
    return "OK";
  } catch (err) {
    if (err.code == "ER_NO_REFERENCED_ROW_2") throw new CustomError({ status: 404, message: "Category was not found." });
    if (err.code == "ER_DUP_ENTRY") throw new CustomError({ status: 404, message: "Dish with the same code already exist." });
    throw err;
  }
}

//MM-8
async function read(categoryId: number, page: number, size: number, q: string) {
  try {
    const result = await DishRepo.find({
      where: { category: categoryId, name: Like(`%${q}%`) },
      skip: page * size,
      take: size,
    });
    return { dishs: result };
  } catch (err) {
    throw err;
  }
}
// MM-8
async function update(body: any) {
  try {
    const dish = await DishRepo.findOneOrFail(body.dish_id);
    delete body.dish_id;
    await DishRepo.update(dish.id, body);
    return "Ok";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Dish was not found." });
    if (err.name == "UpdateValuesMissingError")
      throw new CustomError({ status: 400, message: "Cannot perform update query because update values are not defined." });
    if (err.code == "ER_DUP_ENTRY") throw new CustomError({ status: 404, message: "Dish with the same code already exist." });
    throw err;
  }
}

//MM-8
async function del(dishId: number) {
  try {
    await DishRepo.delete(dishId);
    return "OK";
  } catch (err) {
    throw err;
  }
}

export default { create, read, update, del };
