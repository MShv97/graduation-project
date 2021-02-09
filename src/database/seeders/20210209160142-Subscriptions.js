"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subscriptions = [
      {
        name: "basic",
        price: 40,
        tables: 15,
      },
    ];
    await queryInterface.bulkInsert("subscriptions", subscriptions);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subscriptions");
  },
};
