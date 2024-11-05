import { User, UserDailyRef, ProdPrep } from '../models'

interface UserMacros{
    protein:number,
    fat:number,
    carb:number
}

class UserDailyRefController {

    async create(req: any, res: any): Promise<any> {
        const { user_id, prodprep_id } = req.body;
        console.log(user_id);
        console.log(prodprep_id)
        try {
            const doc = new UserDailyRef({ user_id, prodprep_id });
            const result = await doc.save(); //salva um novo documento com o id do usuário e o id da refeição que ele ingeriu
            console.log(result);
            return res.status(201).json({ message: 'Refeição registrada com sucesso!', result });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro no servidor', error });
        }
    }

    async list(req: any, res: any): Promise<any> {
        const { user_id } = req.body;
        var user_data:UserMacros = { protein: 0, fat: 0, carb: 0 };
        const refs = await UserDailyRef.find({ user_id: user_id }).select("prodprep_id"); //retorna todos os ids das prodpreps consumidas por aquele usuário
        try {
            for (var i = 0; i < refs.length; i++) {
                const ref = refs[i].prodprep_id;
                const prodprep_data = await ProdPrep.findById(ref).select("proteina carboidrato lipidio -_id");
                console.log(prodprep_data);
                if(prodprep_data){
                    user_data.protein += prodprep_data.proteina;
                    user_data.carb += prodprep_data.carboidrato;
                    user_data.fat += prodprep_data.lipidio;
                }
                else{
                    res.json({message : "Objeto indefinido"})
                }
                console.log('spfc');
            }
            return res.json({ user_data });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro no servidor', error });
        }
    }
}

export default new UserDailyRefController()