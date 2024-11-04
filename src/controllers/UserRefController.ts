import { User, UserDailyRef } from '../models'

class UserDailyRefController {

    async create(req: any, res:any) : Promise<any> {
        const { user_id, prodprep_id } = req.body;
        console.log(user_id);
        console.log(prodprep_id)
        try{
            const doc = new UserDailyRef({user_id, prodprep_id});
            const result = await doc.save(); //salva um novo documento com o id do usuário e o id da refeição que ele ingeriu
            console.log(result);
            return res.status(201).json({ message: 'Refeição registrada com sucesso!', result });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro no servidor', error });
        }
    }

    async list(req:any, res:any) : Promise<any> {
        const {user_id} = req.body;
        console.log("user id:")
        console.log(user_id);
        const refs = await UserDailyRef.find({user_id : user_id}).select("prodprep_id"); //retorna todos os ids das prodpreps consumidas por aquele usuário
        try{
            console.log('spfc')
            return res.json({refs});
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro no servidor', error });
        }
    }
}

export default new UserDailyRefController()