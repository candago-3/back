import { json, Request, Response } from "express";
import { ProdPrep } from "../models";

class ProdPrepController {

    async list(req:Request, res: Response): Promise<any> {
        try {
            const objects = await ProdPrep.find().sort({ nome: "asc" }).limit(10).select("produto preparacao");
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new ProdPrepController();