const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  //MM-8
  create: async (req, res) => {
    const { user, body, files } = req;
    const result = await service.create(user, body, files);
    res.status(statusCodes.CREATED).send(result);
  },

  //MM-8
  update: async (req, res) => {
    const { id } = req.params;
    const { user, body, files } = req;
    const result = await service.update(user, id, body, files);
    res.status(statusCodes.UPDATED).send(result);
  },

  //MM-8
  delete: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    await service.delete(user, id);
    res.sendStatus(statusCodes.DELETED);
  },

  //MM-8
  getById: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const result = await service.getById(user, id);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },

  //MM-8
  getAll: async (req, res) => {
    const { user, query } = req;
    const categoryId = query.categoryId;
    const offset = query.offset || 0;
    const limit = query.limit || 50;
    const q = query.q ? query.q : "";
    const result = await service.getAll(user, { categoryId, offset, limit, q });
    res.status(statusCodes.OK).send(result);
  },
};
