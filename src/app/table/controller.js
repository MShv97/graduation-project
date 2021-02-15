const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  // MM-29
  getByCode: async (req, res) => {
    const { code } = req.params;
    const { query } = req;
    query.limit = query.limit || 50;
    const result = await service.getByCode(code, query);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },
};
