import { Router } from "express";
import { login } from "../controllers/LoginController";

const router = Router();

router.post("/", login);

export default router