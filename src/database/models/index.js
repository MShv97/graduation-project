"use strict";

process.env.NODE_ENV !== "production" && require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const basename = path.basename(__filename);
const sequelizeConfig = require("../config/config")[process.env.NODE_ENV];

const sequelize = new Sequelize(sequelizeConfig.url, { logging: sequelizeConfig.logging });

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .map((file) => require(path.join(__dirname, file))(sequelize))
  .map((model) => model.associate(sequelize.models));

module.exports = sequelize;
