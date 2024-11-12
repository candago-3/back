import { Router } from "express";
import  controller  from "../controllers/ProdPrepController";

const router = Router();

router.get("/", controller.list);

export default router