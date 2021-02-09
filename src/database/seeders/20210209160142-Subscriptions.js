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

    const paymentMethods = [
      {
        id: 1,
        name: "PayPal",
      },
    ];

    await queryInterface.bulkInsert("subscriptions", subscriptions);
    await queryInterface.bulkInsert("payment_methods", paymentMethods);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("subscriptions");
  },
};
