import { json, Request, Response } from "express";
import { Grupo, Produto, ProdPrep, Preparacao } from "../models";

class PropPrepController {

    // create

    // list

    public async list(res: Response): Promise<Response> {
        try {
            const objects = Grupo.find().sort({ nome: "asc" });
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // delete

    // update
}

export default new PropPrepController();