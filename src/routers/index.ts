import { Router } from "express";
import AuthRouter from "./auth";
import RestaurantRouter from "./restaurant";
import MenuRouter from "./menu";

const router: Router = Router();

router.use("/auth", AuthRouter);
router.use("/api/restaurant", RestaurantRouter);
router.use("/api/menu", MenuRouter);

export { router };
