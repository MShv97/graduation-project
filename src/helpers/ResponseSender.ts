export default ({ res, response, status }) => {
  res.status(status).send({
    response: response,
  });
};
