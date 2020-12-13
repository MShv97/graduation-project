import { NextFunction, Request, Response } from "express";
import { ResponseSender } from "../helpers";
import TableServices from "../services/table";

//MM-9
async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const body = req.body;
    const results = await TableServices.create(currUser, body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-9
async function read(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const page = Number(req.query.page) || 0;
    const size = Number(req.query.size) || 8;
    const q = req.query.q ? String(req.query.q) : "";

    const results = await TableServices.read(currUser, page, size, q);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-9
async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const body = req.body;
    const results = await TableServices.update(currUser, body);
    ResponseSender({ res: res, status: 200, response: results });
  } catch (err) {
    next(err);
  }
}
//MM-9
async function del(req: Request, res: Response, next: NextFunction) {
  try {
    const { currUser } = req;
    const tableId = Number(req.params.table_id);
    const results = await TableServices.del(currUser, tableId);
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
