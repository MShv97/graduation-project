import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createConnection } from "typeorm";
import { httpLoggers } from "./helpers";
import { logger } from "./helpers";

const start = async () => {
  logger.info("Connecting to DB");
  await createConnection();
  logger.info("DB IS READY.");

  const { router } = require("./routers");

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
  app.use(httpLoggers.reqLogger);
  // Main Router
  app.use(router);
  // Request Error Handler
  app.use(httpLoggers.errorLogger);
  /***********
   * @Server *
   ***********/
  // Server Connection
  app.listen(process.env.PORT, () => {
    logger.info(`server is running on port ${process.env.PORT} ... `);
  });
};
start().catch(err => console.log(err));
