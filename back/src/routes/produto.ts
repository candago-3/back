import { Router } from "express";
import  controller  from "../controllers/ProdutoController";

const router = Router();

router.get("/", controller.list);

export default router