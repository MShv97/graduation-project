const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  //MM-22
  create: async (req, res) => {
    const { user, body } = req;
    const result = await service.create(user, body);
    res.status(statusCodes.CREATED).send(result);
  },
  //MM-22
  menu: async (req, res) => {
    const { query } = req;
    const result = await service.menu(query);
    res.status(statusCodes.OK).send(result);
  },
};
