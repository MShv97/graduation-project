const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  //MM-19
  signup: async (req, res) => {
    const { body } = req;
    const result = await service.signup(body);
    res.status(statusCodes.CREATED).send(result);
  },
};
