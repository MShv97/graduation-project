const argv = require("args-parser")(process.argv);
const db = require("./index");

db.sync({ logging: true, ..._.pick(argv, ["alter", "force"]) });
