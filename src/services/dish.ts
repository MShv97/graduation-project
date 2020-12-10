import { CustomError } from "../helpers";
import { DishRepo } from "../repositories";
import { Like } from "typeorm";

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
    throw err;
  }
}

export default { read, update };
