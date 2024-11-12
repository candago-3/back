import { Router } from "express";
import  controller  from "../controllers/UserGoals";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.list);
router.put("/", controller.update);

export default router