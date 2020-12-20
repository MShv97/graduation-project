import { Request } from "express";
import fs from "fs";

/**
 * model to help with deleting uploaded files to the local storage in case of error
 * if error happend after uploading files, we should delete files.
 */
export default async (req: Request) => {
  if (req.file) fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
  if (req.files) for (const file of <any>req.files) fs.existsSync(file.path) && fs.unlinkSync(file.path);
};
