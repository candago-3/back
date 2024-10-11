import { Router } from "express";
import { register } from "../controllers/Register/index";

const router = Router();

router.post("/", register);

export default router