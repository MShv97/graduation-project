const service = require("./service");
const { statusCodes } = require("../../../helpers");

module.exports = {
  //MM-29
  getAll: async (req, res) => {
    const query = req.query;
    query.offset = query.offset || 0;
    query.limit = query.limit || 50;
    const result = await service.getAll(query);
    res.status(statusCodes.OK).send(result);
  },
  // MM-29
  getById: async (req, res) => {
    const { id } = req.params;
    const result = await service.getById(id);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },
};
