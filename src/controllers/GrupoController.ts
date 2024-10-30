import { Request, Response } from "express";
import { Grupo } from "../models";

export async function list(req: Request,res: Response): Promise<any> {
  try {
    const objects = await Grupo.find().sort({ nome: "asc" });
    return res.json(objects);
  } catch (error: any) {
    return res.json({ message: error.message });
  }
}
