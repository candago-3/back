import { User, UserDailyRef, ProdPrep } from '../models'

interface UserMacros{
    protein:number,
    fat:number,
    carb:number
}

class UserDailyRefController {

    async create(req: any, res: any): Promise<any> {
        const { user_id, prodprep_id, food_weigth } = req.body;
        console.log(user_id);
        console.log(prodprep_id)
        console.log(food_weigth);
        try {
            const doc = new UserDailyRef({ user_id, prodprep_id, food_weigth });
            const result = await doc.save(); //salva um novo documento com o id do usuário e o id da refeição que ele ingeriu
            console.log(result);
            return res.status(201).json({ message: 'Refeição registrada com sucesso!', result });
        }
        catch (error) {
            return res.status(500).json({ message: 'Erro no servidor', error });
        }
    }

    async list(req: any, res: any): Promise<any> {
        const { user_id } = req.query;
        var user_data:UserMacros = { protein: 0, fat: 0, carb: 0 };
        const refs = await UserDailyRef.find({ user_id: user_id }).select("prodprep_id food_weigth"); //retorna todos os ids das prodpreps consumidas por aquele usuário
        try {
            for (var i = 0; i < refs.length; i++) {
                const ref = refs[i].prodprep_id;
                const food_weigth = parseInt(refs[i].food_weigth);
                const prodprep_data = await ProdPrep.findById(ref).select("proteina carboidrato lipidio -_id");
                const proportion_calculator = (a:number, b:number, c:number ) : number => ( c * b ) / a; //regra de 3 pra calcular o valor correto baseado na quantidade consumida
                if(prodprep_data){
                    const protein_calculated = proportion_calculator(100, prodprep_data.proteina, food_weigth);
                    const carb_calculated = proportion_calculator(100, prodprep_data.carboidrato, food_weigth);
                    const fat_calculated = proportion_calculator(100, prodprep_data.lipidio, food_weigth);
                    user_data.protein += protein_calculated;
                    user_data.carb += carb_calculated;
                    user_data.fat += fat_calculated;
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