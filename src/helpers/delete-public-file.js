const fs = require("fs");

/**
 * model to help with deleting uploaded files to the local storage in case of error
 * if error happend after uploading files, we should delete files.
 *
 * @param {Request} req - express request
 *
 * @returns {void}
 */
module.exports = async (req) => {
  if (req.file) fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path);
  if (req.files) for (const file of req.files) fs.existsSync(file.path) && fs.unlinkSync(file.path);
};
