import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../helpers";
import MenuService from "../services/menu";

//MM-6
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const body = req.body;
    const results = await MenuService.create(currUser, body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-6
async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 8;
    const q = req.query.q ? String(req.query.q) : "";

    const results = await MenuService.read(currUser, page, size, q);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-6
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const body = req.body;
    const results = await MenuService.update(currUser, body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-6
async function del(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const menuId = Number(req.params.menu_id);
    const results = await MenuService.del(currUser, menuId);
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
