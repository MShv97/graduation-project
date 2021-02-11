"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const icons = [
      {
        name: "default",
        url: "http://",
      },
    ];

    await queryInterface.bulkInsert("category_icons", icons);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("category_icons");
  },
};
