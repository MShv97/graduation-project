import { Router } from "express";
import AuthRouter from "./auth";
import RestaurantRouter from "./restaurant";
import MenuRouter from "./menu";
import CategoryRouter from "./category";
import DishRouter from "./dish";
import TableRouter from "./table";

const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/api/restaurant", RestaurantRouter);
router.use("/api/menu", MenuRouter);
router.use("/api/category", CategoryRouter);
router.use("/api/dish", DishRouter);
router.use("/api/table", TableRouter);

export { router };
