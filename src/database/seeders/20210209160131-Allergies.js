"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allergies = [
      { name: "Alcohol", ar_name: "كحول" },
      { name: "Antioxidant", ar_name: "مضادات الأكسدة" },
      { name: "Barley", ar_name: "شعير" },
      { name: "Peanut Butter", ar_name: "زبدة الفول السوداني" },
    ];

    await queryInterface.bulkInsert("allergies", allergies);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("allergies");
  },
};
