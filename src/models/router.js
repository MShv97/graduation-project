const AuthRouter = require("./auth/router");
// const RestaurantRouter = require("./restaurant");
// const MenuRouter = require("./menu");
// const CategoryRouter = require("./category");
// const DishRouter = require("./dish");
// const TableRouter = require("./table");
const router = require("express").Router();
router.use("/auth", AuthRouter);
// router.use("/api/restaurant", RestaurantRouter);
// router.use("/api/menu", MenuRouter);
// router.use("/api/category", CategoryRouter);
// router.use("/api/dish", DishRouter);
// router.use("/api/table", TableRouter);

module.exports = router;
