const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  //MM-27
  create: async (req, res) => {
    const { body } = req;
    const result = await service.create(body);
    res.status(statusCodes.CREATED).send(result);
  },
  //MM-27
  update: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const result = await service.update(id, body);
    res.status(statusCodes.UPDATED).send(result);
  },
  //MM-27
  updateStatus: async (req, res) => {
    const { id } = req.params;
    const { user, body } = req;
    await service.updateStatus(user, id, body);
    res.sendStatus(statusCodes.UPDATED);
  },
  //MM-27
  getById: async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const result = await service.getById(user, id);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },
  //MM-27
  getAll: async (req, res) => {
    const { user, query } = req;
    query.offset = query.offset || 0;
    query.limit = query.limit || 50;
    query.q = query.q ? query.q : "";
    const result = await service.getAll(user, query);
    res.status(statusCodes.OK).send(result);
  },
};
