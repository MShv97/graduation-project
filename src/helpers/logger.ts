import winston from "winston";
import chalk from "chalk";

const levels = {
  Error: 0,
  Warn: 1,
  Info: 2,
  Debug: 3,
};

const generalLogger = winston.createLogger({
  level: "Debug",
  levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(({ level, message, timestamp, path, trace }) => {
      switch (level) {
        case "Error":
          level = chalk.bold.redBright(level);
          break;
        case "Warn":
          level = chalk.bold.yellowBright(level);
          break;
        case "Info":
          level = chalk.bold.greenBright(level);
          break;
        case "Debug":
          level = chalk.bold.blueBright(level);
          break;
      }
      timestamp = chalk.magenta(timestamp);
      typeof message === "string"
        ? (message = chalk.whiteBright(message))
        : (message = chalk.whiteBright("\n" + JSON.stringify(message, null, 4)) + "\n");
      path = chalk.bold.magentaBright("Path:") + path;
      if (level === "Error") {
        return `${timestamp}  ${level}:  ${path} \n  ${trace}`;
      } else {
        return `${timestamp}  ${level}: ${message}  ${path}`;
      }
    })
  ),
  transports: [new winston.transports.Console()],
});

if (process.env.NODE_ENV === "production") {
  generalLogger.level = "Info";
}

/**
 * Logger
 *
 * @param {String} level One Of ["Error", "Warn", "Info", "Debug"]
 * @param {String} message Message To Log
 * @returns {void}
 *
 */
const logger = (level, message) => {
  let error = new Error(message);
  let stackTrace = <any>error.stack.split("\n");
  stackTrace = stackTrace[Math.min(5, stackTrace.length - 1)];
  //let filePath = stackTrace.split('(')[1];
  //filePath = filePath[Math.min(5, filePath.length - 1)];
  //filePath = filePath.replace(')', '');
  //let functionName = stackTrace.split(' ')[5];
  const path = stackTrace.slice(3);
  generalLogger.log({
    level,
    message,
    path,
    trace: error.stack,
  });
};
/**
 * Use It For Warnings
 *
 * @returns {void}
 * @param messages
 */
//allow logging more than one object
const warn = (...messages) => {
  messages.forEach(message => {
    logger("Warn", message);
  });
};

/**
 * Use It For Errors
 *
 * @returns {void}
 * @param messages
 */
//allow logging more than one object
const error = (...messages) => {
  messages.forEach(message => {
    logger("Error", message);
  });
};
/**
 * Use It For Information
 *
 * @returns {void}
 * @param messages
 */
//allow logging more than one object
const info = (...messages) => {
  messages.forEach(message => {
    logger("Info", message);
  });
};

/**
 * Use It For Debugging
 *
 * @returns {void}
 * @param messages
 */
//allow logging more than one object
const debug = (...messages) => {
  messages.forEach(message => {
    logger("Debug", message);
  });
};

export { warn, error, debug, info };
