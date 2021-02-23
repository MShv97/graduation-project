"use strict";

const { hash } = require("bcrypt");
const uuid = require("uuid").v4;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const restaurant = [
      {
        id: 2,
        name: "Alo_Chicken",
        ar_name: "الو تشيكين",
        address: "Hama-Abi_Alfedaa",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // password: AloPassword
    const password = await hash("AloPassword", Number(process.env.BCRYPT_ROUNDS));
    const users = [
      {
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@Alo.com",
        password,
        phone: "+963938061161",
        birthdate: "1997/04/10",
        role: "admin",
        verify_code: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 2,
      },
      {
        first_name: "chef",
        last_name: "chef",
        email: "chef@Alo.com",
        password,
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "chef",
        verify_code: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 2,
      },
      {
        first_name: "manager",
        last_name: "manager",
        email: "manager@Alo.com",
        password,
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "manager",
        verify_code: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 2,
      },
      {
        first_name: "author",
        last_name: "author",
        email: "author@Alo.com",
        password,
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "author",
        verify_code: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 2,
      },
      {
        first_name: "accountant",
        last_name: "accountant",
        email: "accountant@Alo.com",
        password,
        phone: "+963962213470",
        birthdate: "1997/04/10",
        role: "accountant",
        verify_code: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        restaurant_id: 2,
      },
      {
        first_name: "waiter",
        last_name: "waiter",
        email: "waiter@Alo.com",
        password,
        phone: "+963962213470",
        birthdate: "1997/04/10",
        verify_code: uuid(),
        created_at: new Date(),
        updated_at: new Date(),
        role: "waiter",
        restaurant_id: 2,
      },
    ];

    const menus = [
      {
        id: 2,
        title: "Main menu",
        ar_title: "القائمة الرئيسية",
        currency: "SYR",
        restaurant_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const tables = [];
    for (let i = 0; i < 10; i++)
      tables.push({ code: require("uuid").v4(), number: i + 1, restaurant_id: 2, menu_id: 2 });

    const categories = [
      {
        id: 3,
        title: "Sandwiches",
        ar_title: "سادندويتش",
        icon_id: 1,
        menu_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        title: "Meals",
        ar_title: "وجبات",
        icon_id: 1,
        menu_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const dishes = [
      {
        name: "francisco",
        ar_name: "فرانسيسكو",
        description:
          "Grilled chicken pieces with mushrooms, corn and cheese, with lettuce, potatoes and special sauce.",
        ar_description: "قطع دجاج مشوية مع فطر وذرة وجبنة مع الخس والبطاطا والصوص الخاص",
        code: "Alo01",
        price: 3000,
        discount: 0,
        status: "active",
        preparation_time: 15,
        calories: 250,
        restaurant_id: 2,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Zinger",
        ar_name: "زنجر",
        description: "Zinger sandwich has chicken layer ,egg layer and a veggie mayo layer.",
        ar_description: "طبقة دجاج وطبقة بيض وطبقة مايونيز",
        code: "Alo02",
        price: 2500,
        discount: 0,
        status: "active",
        preparation_time: 15,
        calories: 200,
        restaurant_id: 2,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "filadelfia",
        ar_name: "فيلاديلفيا",
        description: "Grilled veal slices with pepper, corn, onion, potato, cheese and special sauce.",
        ar_description: "شرحات لحمة عجل مشوية مع فلفل وذرة وبصل وبطاطا وجبنة وصوص خاص",
        code: "Alo03",
        price: 4500,
        discount: 0,
        status: "active",
        preparation_time: 30,
        calories: 300,
        restaurant_id: 2,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Fajita",
        ar_name: "غراند فاهيتا",
        description: "Grilled meat served as a taco on a flour or corn tortilla.",
        ar_description: "لحم مشوي مثل التاكو",
        code: "Alo04",
        price: 4500,
        discount: 0,
        status: "active",
        preparation_time: 10,
        calories: 100,
        restaurant_id: 2,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    const subscriptions = [{ status: "active", restaurant_id: 2, subscription_id: 1, payment_method_id: 1 }];

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert("restaurants", restaurant, { transaction });
      await queryInterface.bulkInsert("users", users, { transaction });
      await queryInterface.bulkInsert("menus", menus, { transaction });
      await queryInterface.bulkInsert("tables", tables, { transaction });
      await queryInterface.bulkInsert("categories", categories, { transaction });
      await queryInterface.bulkInsert("dishes", dishes, { transaction });
      await queryInterface.bulkInsert("restaurants_subscriptions", subscriptions, { transaction });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("restaurants");
    await queryInterface.bulkDelete("users");
    await queryInterface.bulkDelete("menus");
    await queryInterface.bulkDelete("tables");
    await queryInterface.bulkDelete("categories");
    await queryInterface.bulkDelete("dishes");
    await queryInterface.bulkDelete("restaurants_subscriptions");
  },
};
