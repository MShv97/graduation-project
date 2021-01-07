const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  login: async (req, res) => {
    const data = req.body;
    const result = await service.login(data);
    res.status(statusCodes.OK).send(result);
  },

  signup: async (req, res) => {
    const data = req.body;
    await service.signup(data);
    res.sendStatus(statusCodes.CREATED);
  },

  refreshToken: async (req, res) => {
    const data = req.body;
    const result = await service.refreshToken(data);
    res.status(statusCodes.OK).send(result);
  },
};
