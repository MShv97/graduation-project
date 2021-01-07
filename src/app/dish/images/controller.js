const service = require("./service");
const { statusCodes } = require("../../../helpers");

module.exports = {
  //MM-10
  delete: async (req, res) => {
    const { id, imageId } = req.params;
    const { user } = req;
    await service.delete(user, id, imageId);
    res.sendStatus(statusCodes.DELETED);
  },
};
