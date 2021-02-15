const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  // MM-30
  getByCode: async (req, res) => {
    const code = req.params;
    const result = await service.getByCode(code);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },
};
