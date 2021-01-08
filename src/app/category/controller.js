import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../../helpers";
import CategoryServices from "./service";

//MM-7
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { body, file } = req;
    const results = await CategoryServices.create(body, file);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-7
async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const menuId = Number(req.query.menuId);
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 8;
    const q = req.query.q ? String(req.query.q) : "";

    const results = await CategoryServices.read(menuId, page, size, q);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-7
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser, body, file } = req;
    const results = await CategoryServices.update(currUser, body, file);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-7
async function del(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const categoryId = Number(req.params.categoryId);
    const results = await CategoryServices.del(currUser, categoryId);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-10
async function deleteThumpnail(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const categoryId = Number(req.params.categoryId);
    const results = await CategoryServices.deleteThumpnail(currUser, categoryId);
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
  deleteThumpnail,
};
