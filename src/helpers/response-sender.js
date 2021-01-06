/**
 * Response sender
 *
 * @param {Response} res
 * @param {number} status
 * @param {Object} response
 *
 * @returns {void}
 */
module.exports = ({ res, status, response }) => {
  res.status(status).send({
    response: response,
  });
};
