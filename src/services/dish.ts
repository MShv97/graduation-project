import { CustomError } from "../helpers";
import { DishImagesRepo, DishRepo } from "../repositories";
import { getRepository, Like } from "typeorm";
import { DishImage } from "../entities/DishImage";
import fs from "fs";

//MM-8
async function create(body: any, files: any) {
  try {
    const dish = DishRepo.create();
    dish.name = body.name;
    dish.description = body.description;
    dish.code = body.code;
    dish.price = body.price;
    dish.discount = body.discount;
    dish.category = body.category_id;
    await DishRepo.save(dish);
    if (files)
      for (const file of files) {
        const img = DishImagesRepo.create({ path: file.path, dish: dish });
        await DishImagesRepo.save(img);
      }

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
      relations: ["images"],
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
async function update(body: any, files: any) {
  try {
    const dish = await DishRepo.findOneOrFail(body.dish_id);
    if (body.name) dish.name = body.name;
    if (body.description) dish.description = body.description;
    if (body.price) dish.price = body.price;
    if (body.discount) dish.discount = body.discount;
    if (body.code) dish.code = body.code;
    await DishRepo.save(dish);
    if (files)
      for (const file of files) {
        const img = DishImagesRepo.create({ path: file.path, dish: dish });
        await DishImagesRepo.save(img);
      }
    return "Ok";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Dish was not found." });
    if (err.name == "UpdateValuesMissingError") throw new CustomError({ status: 400, message: "Cannot perform update query because update values are not defined." });
    if (err.code == "ER_DUP_ENTRY") throw new CustomError({ status: 404, message: "Dish with the same code already exist." });
    if (files) throw err;
  }
}

//MM-8
async function del(dishId: number) {
  try {
    const dish = await DishRepo.findOneOrFail(dishId, { relations: ["images"] });
    await DishRepo.remove(dish);
    return "OK";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Dish was not found." });
    throw err;
  }
}

//MM-10
async function deleteImage(imageId: number) {
  try {
    const dishImage = await DishImagesRepo.findOneOrFail(imageId);
    await DishImagesRepo.remove(dishImage);
    if (fs.existsSync(dishImage.path)) fs.unlinkSync(dishImage.path);
    return "OK";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Dish Image was not found." });
    throw err;
  }
}

export default { create, read, update, del, deleteImage };
