import { json, Request, Response } from "express";
import { ProdPrep, Produto, Preparacao } from "../models";

class ProdPrepController {

    async list(req: Request, res: Response): Promise<any> {
        try {
            const objects = ProdPrep.find({produto:{$exists: true}, }).sort({ nome: "asc" });
            return res.json(objects);
        } catch (error: any) {
        console.log({ message: error.message });
        }
    }
}

export default new ProdPrepController();