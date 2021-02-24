const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  //MM-18
  invite: async (req, res) => {
    const { user, body } = req;
    const result = await service.invite(user, body);
    res.status(statusCodes.OK).send(result);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { user, body } = req;
    const result = await service.update(id, user, body);
    res.status(statusCodes.UPDATED).send(result);
  },
  getAll: async (req, res) => {
    const { user, query } = req;
    query.offset = query.offset || 0;
    query.limit = query.limit || 10;
    query.q = query.q ? query.q : "";
    const result = await service.getAll(user, query);
    res.status(statusCodes.OK).send(result);
  },
  getById: async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    const result = await service.getById(user, id);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },
  getProfile: async (req, res) => {
    const { user } = req;
    const result = await service.getProfile(user);
    result ? res.status(statusCodes.OK).send(result) : res.sendStatus(statusCodes.ITEM_NOT_FOUND);
  },
  updateProfile: async (req, res) => {
    const { user, body, file } = req;
    const result = await service.updateProfile(user, body, file);
    res.status(statusCodes.UPDATED).send(result);
  },
  deleteImage: async (req, res) => {
    const { user } = req;
    await service.deleteImage(user);
    res.sendStatus(statusCodes.DELETED);
  },
};
