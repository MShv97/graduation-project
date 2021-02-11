const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  //MM-7
  create: async (req, res) => {
    const { user, body } = req;
    const result = await service.create(user, body);
    res.status(statusCodes.CREATED).send(result);
  },

  //MM-7
  update: async (req, res) => {
    const { id } = req.params;
    const { user, body } = req;
    const result = await service.update(user, id, body);
    res.status(statusCodes.UPDATED).send(result);
  },

  //MM-7
  delete: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    await service.delete(user, id);
    res.sendStatus(statusCodes.DELETED);
  },

  //MM-7
  getById: async (req, res) => {
    const { id } = req.params;
    const { user, query } = req;
    const limit = query.limit || 10;
    const result = await service.getById(user, id, { limit });
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },

  //MM-7
  getAll: async (req, res) => {
    const { user, query } = req;
    query.offset = query.offset || 0;
    query.limit = query.limit || 10;
    query.q = query.q ? query.q : "";
    const result = await service.getAll(user, query);
    res.status(statusCodes.OK).send(result);
  },
};
