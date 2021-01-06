"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const init = async () => {
  try {
    [
      "../models/bill/model",
      "../models/category/model",
      "../models/client/model",
      "../models/dish/model",
      "../models/dish/images/model",
      "../models/menu/model",
      "../models/order/model",
      "../models/payment_method/model",
      "../models/restaurants/model",
      "../models/restaurants/subscriptions/model",
      "../models/subscription/model",
      "../models/table/model",
      "../models/user/model",
    ].forEach((file) => require(file)(sequelize));

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    await sequelize.sync(/*{ force: true, alter: true }*/);
  } catch (err) {
    throw err;
  }
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.init = init;

module.exports = db;
