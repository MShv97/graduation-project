"use strict";

process.env.NODE_ENV !== "production" && require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(process.env.DB_URL, { logging: false });

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .map((file) => require(path.join(__dirname, file))(sequelize))
  .map((model) => model.associate(sequelize.models));

module.exports = sequelize;
