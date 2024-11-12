import { Request, Response } from "express";
import { Grupo } from "../models";

class GrupoController {
   async list(req: Request,res: Response): Promise<any> {
    try {
      const objects = await Grupo.find().sort({ nome: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }
}

export default new GrupoController();
