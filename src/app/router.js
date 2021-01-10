const router = require("express").Router();



router.use("/auth", require("./auth/router"));
router.use("/api/dish", require("./dish/router"));
router.use("/api/menu", require("./menu/router"));
router.use("/api/category", require("./category/router"));


// const RestaurantRouter = require("./restaurant");
// const MenuRouter = require("./menu");
// const CategoryRouter = require("./category");
// const DishRouter = require("./dish");
// const TableRouter = require("./table");
// router.use("/api/restaurant", RestaurantRouter);
// router.use("/api/menu", MenuRouter);
// router.use("/api/category", CategoryRouter);
// router.use("/api/table", TableRouter);

module.exports = router;
