import { json, Request, Response } from "express";
import { ProdPrep } from "../models";

class ProdPrepController {

    async list(res: Response): Promise<any> {
        try {
            const objects = ProdPrep.find().sort({ nome: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new ProdPrepController();