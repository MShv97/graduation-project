"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const subscriptions = [
      {
        id: 1,
        name: "monthly",
        duration: 30,
        price: 149,
        discount: 0,
        description:
          "Multiple interactive menu, full description of products with pictures, easy and direct updating of menus, order management, the ability to upload and display the restaurant's logo, customer service, and more future services",
        ar_description:
          "قائمة طعام تفاعلية و متعددة ، وصف كامل للمنتجات مع صور ، تحديث سهل ومباشر للقوائم ، إدارة الطلبات ، إمكانية رفع وإظهار لوغو خاص بالمطعم ، خدمة العملاء ، والمزيد من الخدمات المستقبلية",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: "yearly",
        duration: 365,
        price: 1788,
        discount: 360,
        description:
          "Multiple interactive menu, full description of products with pictures, easy and direct updating of menus, order management, the ability to upload and display the restaurant's logo, customer service, and more future services",
        ar_description:
          "قائمة طعام تفاعلية و متعددة ، وصف كامل للمنتجات مع صور ، تحديث سهل ومباشر للقوائم ، إدارة الطلبات ، إمكانية رفع وإظهار لوغو خاص بالمطعم ، خدمة العملاء ، والمزيد من الخدمات المستقبلية",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: "free",
        duration: 14,
        price: 0,
        discount: 0,
        description:
          "Multiple interactive menu, full description of products with pictures, easy and direct updating of menus, order management, the ability to upload and display the restaurant's logo, customer service, and more future services",
        ar_description:
          "قائمة طعام تفاعلية و متعددة ، وصف كامل للمنتجات مع صور ، تحديث سهل ومباشر للقوائم ، إدارة الطلبات ، إمكانية رفع وإظهار لوغو خاص بالمطعم ، خدمة العملاء ، والمزيد من الخدمات المستقبلية",
        created_at: new Date(),
        updated_at: new Date(),
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
