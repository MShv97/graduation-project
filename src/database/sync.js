const db = require("./index");

db.sync({ force: true, alter: true });
