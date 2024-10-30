import { Router } from "express";
import { list } from "../controllers/GrupoController";

const router = Router();

router.get("/", list);

export default router