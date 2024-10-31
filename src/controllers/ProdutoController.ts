import { Request, Response } from "express";
import { Produto } from "../models";

class ProdutoController {
   async list(req: Request,res: Response): Promise<any> {
    try {
      const objects = await Produto.find().sort({ nome: "asc" });
      return res.json(objects);
    } catch (error: any) {
      return res.json({ message: error.message });
    }
  }
}

export default new ProdutoController();
