process.env.NODE_ENV !== "production" && require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const db = require("./database");
const { httpLogger, Exception } = require("./middlewares");

const start = async () => {
  logger.info("Connecting to DB");
  await db.authenticate();
  logger.info("DB IS READY.");

  const router = require("./app/router");

  const app = express();
  const httpServer = require("http").createServer(app);
  // initialize socket
  require("./socket")(httpServer);

  /***************
   * @Middleware *
   ***************/
  app.use(express.static(__dirname + "/public"));
  //app.use("*", express.static(__dirname + "/public"));

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
  httpServer.listen(process.env.PORT, () => {
    logger.info(`server is running on port ${process.env.PORT} ... `);
  });
};
start().catch((err) => console.log(err));
