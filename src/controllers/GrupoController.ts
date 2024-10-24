import { json, Request, Response } from "express";
import { Grupo } from "../models";

class GrupoController {

    // create

    public create(grupo:any, res: Response) {
        try {
            //a instância de um modelo é chamada de documento
            var id = grupo.id;
            var gru_descricao = grupo.gru_descricao;
            const document = new Grupo({gru_descricao});
            // ao salvar serão aplicadas as validações do esquema
            const resp = document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error && error.errors["gru_descricao"]) {
                return res.json({ message: error.errors["gru_descricao"].message });
            }
            return res.json({ message: error.message });
        }
    }

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

    public async delete(id:any, res: Response): Promise<Response> {
        var id = id._id  // _id do registro a ser excluído
        try {
            const object = await Grupo.findByIdAndDelete(id);
            if (object) {
                return res.json({ message: "Registro excluído com sucesso!" });
            } else {
                return res.json({ message: "Registro inexistente!" });
            }
        } catch (error: any) {
            return res.json({ message: error.message });
        }
    }

    // update

    public async update(grupo:any, res: Response): Promise<Response> {
        var _id = grupo._id;
        var id = grupo.id;
        var gru_descricao = grupo.gru_descricao;
        try {
            // busca o grupo existente na coleção antes de fazer o update
            const document = await Grupo.findById(id);
            if (!document) {
                return res.json({ message: "Grupo inexistente!" });
            }
            // atualiza os campos
            document.id = id;
            document.gru_descricao = gru_descricao;
            // ao salvar serão aplicadas as validações do esquema
            const resp = await document.save();
            return res.json(resp);
        } catch (error: any) {
            if (error && error.errors["gru_descricao"]) {
                return res.json({ message: error.errors["gru_descricao"].message });
            }
            return res.json({ message: error.message });
        }
    }
}

export default new GrupoController();