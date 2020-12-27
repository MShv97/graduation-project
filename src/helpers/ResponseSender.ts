/**
 * Response sender
 *
 * @param {Response} res
 * @param {number} status
 * @param {Object} response
 *
 * @returns {void}
 */
export default ({ res, status, response }) => {
  res.status(status).send({
    response: response,
  });
};
