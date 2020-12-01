import "reflect-metadata";
import * as express from "express";
import { createConnection } from "typeorm";
import { httpLoggers } from "./helpers";
import { logger } from "./helpers";

const start = async () => {
  logger.info("Connecting to DB");
  await createConnection();
  logger.info("DB IS READY.");

  const { router } = require("./routers");

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(httpLoggers.reqLogger);
  app.use(router);
  app.use(httpLoggers.errorLogger);

  app.listen(process.env.PORT, () => {
    logger.info(`server is running on port ${process.env.PORT} ... `);
  });
};
start().catch(err => console.log(err));
