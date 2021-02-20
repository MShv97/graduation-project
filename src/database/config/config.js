process.env.NODE_ENV !== "production" && require("dotenv").config();

const config = {
  url: process.env.DB_URL,
  logging: false,
  migrationStorage: "sequelize",
  seederStorage: "sequelize",
};
module.exports = {
  [process.env.NODE_ENV]: config,
};
