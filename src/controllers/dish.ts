import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../helpers";
import DishServices from "../services/dish";

//MM-8
async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const categoryId = Number(req.query.category_id);
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 8;
    const q = req.query.q ? String(req.query.q) : "";

    const results = await DishServices.read(categoryId, page, size, q);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-8
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const results = await DishServices.update(body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
export default { read, update };
