import { Router } from "express";
import login from "../controllers/Login/index";

const router = Router();

router.post("/", login);

export default router