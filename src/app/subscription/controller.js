const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  create: async (req, res) => {
    const { body } = req;
    const result = await service.create(body);
    res.status(statusCodes.CREATED).send(result);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const result = await service.update(body, id);
    res.status(statusCodes.UPDATED).send(result);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await service.delete(id);
    res.sendStatus(statusCodes.DELETED);
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const result = await service.getById(id);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },
  getAll: async (req, res) => {
    const query = req.query;
    query.offset = query.offset || 0;
    query.limit = query.limit || 50;
    const result = await service.getAll(query);
    res.status(statusCodes.OK).send(result);
  },
};
