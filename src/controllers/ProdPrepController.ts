import { json, Request, Response } from "express";
import { ProdPrep, Produto, Preparacao } from "../models";

interface ProdPrepDoc{
    prodprep_id:string;
    produto_named: string | undefined;
    preparacao_named: string | undefined
}


class ProdPrepController {

    async list(req:Request, res: Response): Promise<any> { // lista as variações dos produtos e suas preparações
        try {
            const output_named:ProdPrepDoc[] = []; // array para guardar o nome dos elementos referenciando o Id da consulta de prodprep
            const objects = await ProdPrep.find().sort().limit(100).select("produto preparacao"); //retorna todas as variações de prod e prep
            for (var i = 0; i < objects.length; i++){ //itera sobre todos os itens de prodprep
                const prod_id:string = objects[i].produto.toString() // extrai o id do produto
                const prep_id:string = objects[i].preparacao.toString();//extrai o id da preparacao
                const prodprep_id:string = objects[i]._id.toString(); // extrai o id da relação prodprep 
                const produto_query = await Produto.findById(prod_id).select("pro_descricao -_id").limit(1);
                const preparacao_query = await Preparacao.findById(prep_id).select("pre_descricao -_id").limit(1);
                const produto_named:string | undefined = produto_query?.pro_descricao;
                const preparacao_named:string | undefined = preparacao_query?.pre_descricao;
                const object:ProdPrepDoc = {prodprep_id, produto_named, preparacao_named};
                output_named.push(object)
            }
            return res.json(output_named); 
        } catch (error: any) {
        console.log({ message: error.message });
        return res.json(error);
        }
    }
}

export default new ProdPrepController();