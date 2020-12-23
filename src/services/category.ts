import { CustomError } from "../helpers";
import { CategoryRepo } from "../repositories";
import { Like } from "typeorm";
import fs from "fs";

// MM-7
async function create(body: any, file: any) {
  try {
    const category = CategoryRepo.create();
    category.name = body.name;
    category.description = body.description;
    category.menu = body.menu_id;
    category.thumpnail = file.path;
    await CategoryRepo.save(category);
    return "Success";
  } catch (err) {
    fs.unlinkSync(file.path);
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
async function update(currUser: any, body: any, file: any) {
  try {
    const category = await CategoryRepo.categoryPermission(currUser.restaurantId, body.category_id);
    if (body.name) category.name = body.name;
    if (body.description) category.description = body.description;
    if (file) {
      fs.existsSync(category.thumpnail) && fs.unlinkSync(category.thumpnail);
      category.thumpnail = file.path;
    }
    await CategoryRepo.save(category);
    return "Success";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Category was not found." });
    if (err.name == "UpdateValuesMissingError") throw new CustomError({ status: 400, message: "Cannot perform update query because update values are not defined." });
    throw err;
  }
}
// MM-7
async function del(currUser: any, categoryId: number) {
  try {
    const category = await CategoryRepo.categoryPermission(currUser.restaurantId, categoryId);
    await CategoryRepo.delete(category.id);
    fs.existsSync(category.thumpnail) && fs.unlinkSync(category.thumpnail);
    return "Success";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Category was not found." });
    throw err;
  }
}
//MM-10
async function deleteThumpnail(currUser: any, categoryId: number) {
  try {
    const category = await CategoryRepo.categoryPermission(currUser.restaurantId, categoryId);
    await CategoryRepo.delete(category.id);
    await CategoryRepo.update(categoryId, { thumpnail: null });
    fs.existsSync(category.thumpnail) && fs.unlinkSync(category.thumpnail);
    return "Success";
  } catch (err) {
    if (err.name == "EntityNotFound") throw new CustomError({ status: 404, message: "Category was not found." });
    throw err;
  }
}

export default { create, read, update, del, deleteThumpnail };
