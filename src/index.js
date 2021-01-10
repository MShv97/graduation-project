const express = require("express");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const db = require("./datebase");
const { httpLogger } = require("./middlewares");
const Exception = require("./middlewares/exception");

const start = async () => {
  logger.info("Connecting to DB");
  //await db.sync({ alter: true });
  logger.info("DB IS READY.");

  const router = require("./app/router");

  const app = express();

  /***************
   * @Middleware *
   ***************/
  app.use(express.static(__dirname + "/public"));

  app.use(helmet());
  app.use(cors());
  // JSON Parser
  app.use(express.json());
  // urlencoded Parser
  app.use(express.urlencoded({ extended: true }));
  // HTTP Logger
  app.use(httpLogger);
  // Main Router
  app.use(router);
  // Request Error Handler
  app.use(Exception.handler);
  /***********
   * @Server *
   ***********/
  // Server Connection
  app.listen(process.env.PORT, () => {
    logger.info(`server is running on port ${process.env.PORT} ... `);
  });
};
start().catch((err) => console.log(err));
