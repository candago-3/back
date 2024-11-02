import { json, Request, Response } from "express";
import { ProdPrep, Produto, Preparacao } from "../models";

interface ProdPrepDoc{
    produto_named: string;
    preparacao_named: string
}


class ProdPrepController {

    async list(req:Request, res: Response): Promise<any> {
        try {
            const output_named:ProdPrepDoc[] = []; // array para guardar o nome dos elementos referenciando o Id da consulta de prodprep
            const objects = await ProdPrep.find().sort().limit(2).select("produto preparacao"); //retorna todas as variações de prod e prep
            for (var i = 0; i < objects.length; i++){ //itera sobre todos os itens de prodprep
                const prod_id = objects[i].produto.toString() // extrai o id do produto
                const prep_id = objects[i].preparacao.toString();//extrai o id da preparacao
                const produto_named = await Produto.findById(prod_id).select("pro_descricao -_id").limit(1);
                const preparacao_named = await Preparacao.findById(prep_id).select("pre_descricao -_id").limit(1);
                console.log(produto_named);
                console.log(preparacao_named);
                const object = {produto_named, preparacao_named};
                console.log(object)
            }
            return res.json(objects);
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }
}

export default new ProdPrepController();