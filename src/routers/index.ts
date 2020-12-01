import { Router } from "express";

const router: Router = Router();

router.use("/api", (req, res) => {
  res.send("Hello world!");
});

export { router };
