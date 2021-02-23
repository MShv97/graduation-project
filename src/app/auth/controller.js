const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  login: async (req, res) => {
    const data = req.body;
    const result = await service.login(data);
    res.status(statusCodes.OK).send(result);
  },

  refreshToken: async (req, res) => {
    const data = req.body;
    const result = await service.refreshToken(data);
    res.status(statusCodes.OK).send(result);
  },

  signup: async (req, res) => {
    const { body } = req;
    const result = await service.signup(body);
    res.status(statusCodes.CREATED).send(result);
  },

  forgetPassword: async (req, res) => {
    const { body } = req;
    await service.forgetPassword(body);
    res.sendStatus(statusCodes.OK);
  },

  resetPassword: async (req, res) => {
    const { body } = req;
    await service.resetPassword(body);
    res.sendStatus(statusCodes.OK);
  },

  verify: async (req, res) => {
    const { body } = req;
    await service.verify(body);
    res.sendStatus(statusCodes.OK);
  },
};
