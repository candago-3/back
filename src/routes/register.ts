import { Router } from "express";
import { register } from "../controllers/RegisterController";

const router = Router();

router.post("/", register);

export default router