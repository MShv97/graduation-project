import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../helpers";
import category from "../routers/reqValidation/category";
import CategoryService from "../services/category";

//MM-7
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const results = await CategoryService.create(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-7
async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const menuId = Number(req.query.menu_id);
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 8;
    const q = req.query.q ? String(req.query.q) : "";

    const results = await CategoryService.read(menuId, page, size, q);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-7
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const results = await CategoryService.update(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-7
async function del(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryId = Number(req.params.category_id);
    const results = await CategoryService.del(categoryId);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}

export default {
  create,
  read,
  update,
  del,
};
