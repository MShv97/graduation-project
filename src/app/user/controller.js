const service = require("./service");
const { statusCodes } = require("../../helpers");

module.exports = {
  //MM-18
  invite: async (req, res) => {
    const { user, body } = req;
    const result = await service.invite(user, body);
    res.status(statusCodes.OK).send(result);
  },
};
